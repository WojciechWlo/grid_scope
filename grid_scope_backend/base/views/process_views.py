from rest_framework.response import Response
from base.models import Process, ProcessSpreadsheetIn, ProcessSpreadsheetOut, SpreadsheetIn, SpreadsheetOut
from base.serializers import ProcessSerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db import transaction
import pandas as pd
from openpyxl.utils import range_boundaries
import requests
import io
from django.db import connection
from psycopg2 import sql
from infisical_sdk import InfisicalSDKClient
import os
# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProcesses(request):

    process = Process.objects.all()

    page = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages = 1

    if page > 0:
        paginator = Paginator(process, 10)

        try:
            process = paginator.page(page)
        except PageNotAnInteger:
            process = paginator.page(1)
        except EmptyPage:
            process = paginator.page(paginator.num_pages)


        pages = paginator.num_pages

    serializer = ProcessSerializer(process, many=True)
    return Response({'processes':serializer.data, 'page':page, 'pages':pages})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProcess(request, pk):
    process = Process.objects.get(id = pk)
    process.delete()
    return Response('Process deleted')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProcess(request, pk):
    try:
        process = Process.objects.get(id=pk)
    except Process.DoesNotExist:
        return Response({"detail": "Process not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = ProcessSerializer(process)
    return Response(serializer.data, status=status.HTTP_200_OK)


from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from base.models import Process, SpreadsheetIn, SpreadsheetOut, ProcessSpreadsheetIn, ProcessSpreadsheetOut

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProcess(request):
    user = request.user
    data = request.data

    label = data.get("label")
    query = data.get("query")
    spreadsheet_in_labels = data.get("spreadsheet_in_labels", [])
    spreadsheet_out_labels = data.get("spreadsheet_out_labels", [])

    if not label or not query:
        return Response(
            {"detail": "Process could not be created. Missing label or query."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not spreadsheet_in_labels or any(not l.strip() for l in spreadsheet_in_labels):
        return Response(
            {"detail": "Process could not be created. Missing or empty Input Spreadsheet labels."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not spreadsheet_out_labels or any(not l.strip() for l in spreadsheet_out_labels):
        return Response(
            {"detail": "Process could not be created. Missing or empty Output Spreadsheet labels."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if Process.objects.filter(label=label).exists():
        return Response(
            {"detail": "Process could not be created. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        with transaction.atomic():
            process = Process.objects.create(
                label=label,
                query=query,
                author_user=user,
                updating_user=user,
            )

            for in_label in spreadsheet_in_labels:
                spreadsheet_in = SpreadsheetIn.objects.get(label=in_label)
                ProcessSpreadsheetIn.objects.create(
                    process=process,
                    spreadsheet_in=spreadsheet_in
                )

            for out_label in spreadsheet_out_labels:
                spreadsheet_out = SpreadsheetOut.objects.get(label=out_label)
                ProcessSpreadsheetOut.objects.create(
                    process=process,
                    spreadsheet_out=spreadsheet_out
                )

    except SpreadsheetIn.DoesNotExist:
        return Response(
            {"detail": "Process could not be created. Input Spreadsheet not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
    except SpreadsheetOut.DoesNotExist:
        return Response(
            {"detail": "Process could not be created. Output SpreadsheetOut not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {"detail": f"Process could not be created. Error: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return Response({"detail": "Process has been created"}, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editProcess(request, pk):
    user = request.user
    data = request.data

    label = data.get("label")
    query = data.get("query")
    spreadsheet_in_labels = data.get("spreadsheet_in_labels", [])
    spreadsheet_out_labels = data.get("spreadsheet_out_labels", [])

    try:
        process = Process.objects.get(pk=pk)
    except Process.DoesNotExist:
        return Response(
            {"detail": "Process not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    if not label or not query:
        return Response(
            {"detail": "Process could not be updated. Missing label or query."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not spreadsheet_in_labels or any(not l.strip() for l in spreadsheet_in_labels):
        return Response(
            {"detail": "Process could not be updated. Missing or empty Input Spreadsheet labels."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if not spreadsheet_out_labels or any(not l.strip() for l in spreadsheet_out_labels):
        return Response(
            {"detail": "Process could not be updated. Missing or empty Output Spreadsheet labels."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if Process.objects.exclude(pk=pk).filter(label=label).exists():
        return Response(
            {"detail": "Process could not be updated. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        with transaction.atomic():
            process.label = label
            process.query = query
            process.updating_user = user
            process.save()

            ProcessSpreadsheetIn.objects.filter(process=process).delete()
            ProcessSpreadsheetOut.objects.filter(process=process).delete()

            for in_label in spreadsheet_in_labels:
                spreadsheet_in = SpreadsheetIn.objects.get(label=in_label)
                ProcessSpreadsheetIn.objects.create(
                    process=process,
                    spreadsheet_in=spreadsheet_in
                )

            for out_label in spreadsheet_out_labels:
                spreadsheet_out = SpreadsheetOut.objects.get(label=out_label)
                ProcessSpreadsheetOut.objects.create(
                    process=process,
                    spreadsheet_out=spreadsheet_out
                )

    except SpreadsheetIn.DoesNotExist:
        return Response(
            {"detail": "Process could not be updated. Input Spreadsheet not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
    except SpreadsheetOut.DoesNotExist:
        return Response(
            {"detail": "Process could not be updated. Output Spreadsheet not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
    except Exception as e:
        return Response(
            {"detail": f"Process could not be updated. Error: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )

    return Response({"detail": "Process has been updated"}, status=status.HTTP_200_OK)



def read_google_sheet(sheet_url, cell_range, is_public):
    try:
        spreadsheet_id = sheet_url.split("/d/")[1].split("/")[0]
        gid = sheet_url.split("gid=")[1] if "gid=" in sheet_url else "0"
        print(f"📄 Preparing to read Google Sheet {spreadsheet_id} (gid={gid})")

        if is_public:
            export_url = (
                f"https://docs.google.com/spreadsheets/d/{spreadsheet_id}/export"
                f"?format=xlsx&id={spreadsheet_id}&gid={gid}"
            )
            response = requests.get(export_url)
            response.raise_for_status()

            file_bytes = io.BytesIO(response.content)
            df_full = pd.read_excel(file_bytes, sheet_name=0, header=None)

            min_col, min_row, max_col, max_row = range_boundaries(cell_range)
            df_range = df_full.iloc[min_row-1:max_row, min_col-1:max_col]

            df_range.columns = df_range.iloc[0]
            df_range = df_range[1:].reset_index(drop=True)

            return df_range

        else:
            print("⚠️ Sheet is private. Skipping actual download.")
            return None

    except requests.exceptions.HTTPError as e:
        print(f"❌ HTTP error while downloading sheet: {e}")
        return None
    except Exception as e:
        print(f"❌ Unexpected error while reading Google Sheet: {e}")
        return None


def executeProcess(spreadsheet_in_labels, spreadsheet_out_labels, process_sql):
    results = {"in_sheets": {}, "out_sheets": {}, "sql_output": None}
    errors = []
    try:
        with connection.cursor() as cursor:
            for in_label in spreadsheet_in_labels:
                try:
                    spreadsheet_in = SpreadsheetIn.objects.get(label=in_label)
                    df_range = read_google_sheet(
                        spreadsheet_in.spreadsheet.url,
                        spreadsheet_in.data_cell_range,
                        spreadsheet_in.spreadsheet.is_public
                    )                  
                    if df_range is None or df_range.empty:
                        errors.append(f"Failed to read sheet for label '{in_label}'")
                        continue

                    col_names = list(df_range.columns)
                    table_name = f"{in_label}"

                    create_temp_table_from_dataframe(table_name, col_names, df_range)

                    results["in_sheets"][in_label] = df_range.to_dict(orient="records")

                except SpreadsheetIn.DoesNotExist:
                    errors.append(f"No SpreadsheetIn found for label '{in_label}'")
                except Exception as e:
                    errors.append(f"Unexpected error for label '{in_label}': {str(e)}")
            
            
            if process_sql:
                try:
                    cursor.execute(process_sql)
                    if cursor.description:
                        columns = [col[0] for col in cursor.description]
                        rows = cursor.fetchall()
                        results["sql_output"] = {
                            "columns": columns,
                            "rows": rows
                        }
                    else:
                        results["sql_output"] = None
                except Exception as e:
                    errors.append(f"SQL execution failed: {str(e)}")
            

            for out_label in spreadsheet_out_labels:
                try:
                    spreadsheet_out = SpreadsheetOut.objects.get(label=out_label)
                    results["out_sheets"][out_label] = {
                        "url": spreadsheet_out.spreadsheet.url,
                        "data_cell": spreadsheet_out.data_cell,
                        "is_public": spreadsheet_out.spreadsheet.is_public
                    }
                except SpreadsheetOut.DoesNotExist:
                    errors.append(f"No SpreadsheetOut found for label '{out_label}'")
                except Exception as e:
                    errors.append(f"Unexpected error for label '{out_label}': {str(e)}")

    except Exception as e:
        errors.append(f"DB transaction error: {str(e)}")

    status_code = status.HTTP_200_OK if not errors else status.HTTP_400_BAD_REQUEST
    return Response({"results": results, "details": errors}, status=status_code)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def testProcess(request):
    client = InfisicalSDKClient(host=os.environ.get("SITE_URL"),token=os.environ.get("INFISICAL_CLIENT_TOKEN"))

    data = request.data

    spreadsheet_in_labels = data.get("spreadsheet_in_labels", [])
    spreadsheet_out_labels = data.get("spreadsheet_out_labels", [])
    process_sql = data.get("query")

    return executeProcess(spreadsheet_in_labels, spreadsheet_out_labels, process_sql)


def create_temp_table_from_dataframe(table_name: str, col_names: list, df: pd.DataFrame):
    if df.empty:
        return

    temp_table_name = f"#{table_name}"

    create_sql_str = f"CREATE TABLE {temp_table_name} ({', '.join(c + ' NVARCHAR(MAX)' for c in col_names)});"
    insert_sql_str = f"INSERT INTO {temp_table_name} ({', '.join(col_names)}) VALUES ({', '.join(['%s']*len(col_names))})"

    insert_values = [tuple(x) for x in df[col_names].astype(str).values.tolist()]


    with connection.cursor() as cursor:
        cursor.execute(create_sql_str)
        cursor.executemany(insert_sql_str, [tuple(x) for x in insert_values])
        cursor.commit()