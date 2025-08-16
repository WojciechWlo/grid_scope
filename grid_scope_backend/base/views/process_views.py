from rest_framework.response import Response
from base.models import Process, ProcessSpreadsheetIn, ProcessSpreadsheetOut, SpreadsheetIn, SpreadsheetOut
from base.serializers import ProcessSerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.db import transaction
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