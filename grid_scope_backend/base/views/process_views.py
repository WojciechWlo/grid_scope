from rest_framework.response import Response
from base.models import Process, SpreadsheetIn, SpreadsheetOut, ProcessSpreadsheetIn, ProcessSpreadsheetOut
from base.serializers import ProcessSerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db import transaction
import pandas as pd
import requests
import json
from google.oauth2.service_account import Credentials
import gspread
from gspread.utils import a1_to_rowcol, rowcol_to_a1
from django.db import connection, connections


# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProcesses(request):

    process = Process.objects.all().order_by('-id')

    page:str = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages: int = 1

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
    response = Response({'processes':serializer.data, 'page':page, 'pages':pages})
    return response 


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteProcess(request, pk):
    process: int = Process.objects.get(id = pk)
    process.delete()
    response = Response('Process deleted')
    return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProcess(request, pk):
    try:
        process: int = Process.objects.get(id=pk)
    except Process.DoesNotExist:
        response = Response({"detail": "Process not found."}, status=status.HTTP_404_NOT_FOUND)
        return response
    
    serializer = ProcessSerializer(process)

    response = Response(serializer.data, status=status.HTTP_200_OK)
    return response



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProcess(request):
    user = request.user
    data = request.data

    label: str = data.get("label")
    query: str = data.get("query")
    spreadsheet_in_labels = data.get("spreadsheet_in_labels", [])
    spreadsheet_out_labels = data.get("spreadsheet_out_labels", [])

    if not label or not query:
        response = Response(
            {"detail": "Process could not be created. Missing label or query."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response   
    if not spreadsheet_in_labels or any(not l.strip() for l in spreadsheet_in_labels):
        response = Response(
            {"detail": "Process could not be created. Missing or empty Input Spreadsheet labels."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response   
    if not spreadsheet_out_labels or any(not l.strip() for l in spreadsheet_out_labels):
        response = Response(
            {"detail": "Process could not be created. Missing or empty Output Spreadsheet labels."},
            status=status.HTTP_400_BAD_REQUEST
        )
        response = response   
    if Process.objects.filter(label=label).exists():
        response = Response(
            {"detail": "Process could not be created. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response   
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
        response = Response(
            {"detail": "Process could not be created. Input Spreadsheet not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response   
     
    except SpreadsheetOut.DoesNotExist:
        response = Response(
            {"detail": "Process could not be created. Output SpreadsheetOut not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response   
    
    except Exception as e:
        response = Response(
            {"detail": f"Process could not be created. Error: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        return response

    response = Response({"detail": "Process has been created"}, status=status.HTTP_201_CREATED)
    return response

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editProcess(request, pk):
    user = request.user
    data = request.data

    label: str = data.get("label")
    query: str = data.get("query")
    spreadsheet_in_labels: list = data.get("spreadsheet_in_labels", [])
    spreadsheet_out_labels: list = data.get("spreadsheet_out_labels", [])

    try:
        process = Process.objects.get(pk=pk)
    except Process.DoesNotExist:
        response = Response(
            {"detail": "Process not found."},
            status=status.HTTP_404_NOT_FOUND
        )
        return response

    if not label or not query:
        response = Response(
            {"detail": "Process could not be updated. Missing label or query."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response

    if not spreadsheet_in_labels or any(not l.strip() for l in spreadsheet_in_labels):
        response = Response(
            {"detail": "Process could not be updated. Missing or empty Input Spreadsheet labels."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    
    if not spreadsheet_out_labels or any(not l.strip() for l in spreadsheet_out_labels):
        response = Response(
            {"detail": "Process could not be updated. Missing or empty Output Spreadsheet labels."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response

    if Process.objects.exclude(pk=pk).filter(label=label).exists():
        response = Response(
            {"detail": "Process could not be updated. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    
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
        response = Response(
            {"detail": "Process could not be updated. Input Spreadsheet not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    
    except SpreadsheetOut.DoesNotExist:
        response = Response(
            {"detail": "Process could not be updated. Output Spreadsheet not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    
    except Exception as e:
        response = Response(
            {"detail": f"Process could not be updated. Error: {str(e)}"},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )
        return response
    
    response = Response({"detail": "Process has been updated"}, status=status.HTTP_200_OK)
    return response


def read_google_sheet(sheet_url: str, cell_range:str, worksheet_id, key: dict):
    try:
        spreadsheet_id = sheet_url.split("/d/")[1].split("/")[0]
        print(f"📄 Preparing to read Google Sheet {spreadsheet_id}")

        creds_dict = json.loads(key)
        creds = Credentials.from_service_account_info(
            creds_dict,
            scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
        )

        client = gspread.authorize(creds)
        sheet = client.open_by_key(spreadsheet_id)
        worksheet = sheet.get_worksheet(worksheet_id)

        data = worksheet.get(cell_range)

        df = pd.DataFrame(data)
        if not df.empty:
            df.columns = df.iloc[0]
            df = df[1:].reset_index(drop=True)

        return df


    except requests.exceptions.HTTPError as e:
        print(f"❌ HTTP error while downloading sheet: {e}")
        return None
    except Exception as e:
        print(f"❌ Unexpected error while reading Google Sheet: {e}")
        return None


def write_google_sheet(sheet_url: str, data_cell:str, worksheet_id: int, data: list, key: dict):

    try:
        creds_dict: dict = json.loads(key)
        creds = Credentials.from_service_account_info(
            creds_dict,
            scopes=["https://www.googleapis.com/auth/spreadsheets"]
        )
        client = gspread.authorize(creds)

        spreadsheet_id = sheet_url.split("/d/")[1].split("/")[0]
        sheet = client.open_by_key(spreadsheet_id)
        worksheet = sheet.get_worksheet(worksheet_id)

        if isinstance(data, list):
            df = pd.DataFrame(data)
        else:
            df = data.copy()

        values = [list(df.columns)] + df.values.tolist()

        start_row, start_col = a1_to_rowcol(data_cell)
        end_row = start_row + len(values) - 1
        end_col = start_col + len(values[0]) - 1

        range_a1 = f"{rowcol_to_a1(start_row, start_col)}:{rowcol_to_a1(end_row, end_col)}"

        worksheet.update(range_a1, values)

    except Exception as e:
        print(f"❌ Error writing to Google Sheet: {e}")
        raise


def executeProcess(spreadsheet_in_labels: list, spreadsheet_out_labels: list, process_sql: str):
    results = {"in_sheets": {}, "out_sheets": {}, "sql_output": None}
    errors = []
    try:
        for in_label in spreadsheet_in_labels:
            try:
                spreadsheet_in = SpreadsheetIn.objects.get(label=in_label)
                df_range = read_google_sheet(
                    spreadsheet_in.spreadsheet.url,
                    spreadsheet_in.data_cell_range,
                    spreadsheet_in.worksheet_id,
                    spreadsheet_in.spreadsheet.key.key,
                )                  
                if df_range is None or df_range.empty:
                    errors.append(f"Failed to read sheet for label '{in_label}'")
                    continue

                col_names: list = list(df_range.columns)
                table_name: str = f"{in_label}"

                create_temp_table_from_dataframe(table_name, col_names, df_range)

                results["in_sheets"][in_label] = df_range.to_dict(orient="records")

            except SpreadsheetIn.DoesNotExist:
                errors.append(f"No SpreadsheetIn found for label '{in_label}'")
            except Exception as e:
                errors.append(f"Unexpected error for label '{in_label}': {str(e)}")
        
        
        if process_sql:
            try:
                with connections['temp'].cursor() as temp_cursor:
                    temp_cursor.execute(process_sql)
                    if temp_cursor.description:
                        columns: list = [col[0] for col in temp_cursor.description]
                        rows: list = temp_cursor.fetchall()
                        results["sql_output"] = {
                            "columns": columns,
                            "rows": rows
                        }
                    else:
                        results["sql_output"] = None
            except Exception as e:
                errors.append(f"SQL execution failed: {str(e)}")

        if results["sql_output"]:
            sql_data: list = [dict(zip(results["sql_output"]["columns"], row)) for row in results["sql_output"]["rows"]]
        else:
            sql_data: list = []

        for out_label in spreadsheet_out_labels:
            try:
                spreadsheet_out = SpreadsheetOut.objects.get(label=out_label)
                
                write_google_sheet(
                    spreadsheet_out.spreadsheet.url,
                    spreadsheet_out.data_cell,
                    spreadsheet_out.worksheet_id,     
                    sql_data,
                    spreadsheet_out.spreadsheet.key.key,
                )

            except SpreadsheetOut.DoesNotExist:
                errors.append(f"No SpreadsheetOut found for label '{out_label}'")
            except Exception as e:
                errors.append(f"Unexpected error for label '{out_label}': {str(e)}")

    except Exception as e:
        errors.append(f"DB transaction error: {str(e)}")

    status_code = status.HTTP_200_OK if not errors else status.HTTP_400_BAD_REQUEST
    response = Response({"results": results, "details": errors}, status=status_code)
    return response


def create_temp_table_from_dataframe(table_name: str, col_names: list, df: pd.DataFrame):
    if df.empty:
        return

    temp_table_name: str = f"#{table_name}"

    create_sql_str: str = f"CREATE TABLE {temp_table_name} ({', '.join(c + ' NVARCHAR(MAX)' for c in col_names)});"
    insert_sql_str: str = f"INSERT INTO {temp_table_name} ({', '.join(col_names)}) VALUES ({', '.join(['%s']*len(col_names))})"
    insert_values: list = [tuple(x) for x in df[col_names].astype(str).values.tolist()]

    with connections['temp'].cursor() as cursor:
        cursor.execute(create_sql_str)
        cursor.executemany(insert_sql_str, insert_values)
        cursor.connection.commit()


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def testProcess(request):
    data = request.data

    spreadsheet_in_labels: str = data.get("spreadsheet_in_labels", [])
    query: str = data.get("query")

    return executeProcess(spreadsheet_in_labels, [], query)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def runProcess(request, pk):

    process = Process.objects.get(id=pk)
    query: str = process.query
    spreadsheets_in: list = ProcessSpreadsheetIn.objects.filter(process=pk)
    spreadsheets_out: list = ProcessSpreadsheetOut.objects.filter(process=pk)

    spreadsheet_in_labels = [spreadsheet_in.spreadsheet_in.label for spreadsheet_in in spreadsheets_in]
    spreadsheet_out_labels = [spreadsheet_out.spreadsheet_out.label for spreadsheet_out in spreadsheets_out]

    return executeProcess(spreadsheet_in_labels, spreadsheet_out_labels, query)
