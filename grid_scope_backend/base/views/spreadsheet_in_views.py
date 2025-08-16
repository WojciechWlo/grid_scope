from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from base.models import SpreadsheetIn, Spreadsheet, validate_excel_range
from base.serializers import SpreadsheetInSerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from rest_framework import status
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheetsIn(request):
    spreadsheetsIn = SpreadsheetIn.objects.all()

    page = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages = 1

    if page > 0:
        paginator = Paginator(spreadsheetsIn, 10)

        try:
            spreadsheetsIn = paginator.page(page)
        except PageNotAnInteger:
            spreadsheetsIn = paginator.page(1)
        except EmptyPage:
            spreadsheetsIn = paginator.page(paginator.num_pages)

        pages = paginator.num_pages

    serializer = SpreadsheetInSerializer(spreadsheetsIn, many=True)
    return Response({'spreadsheetsIn': serializer.data, 'page': page, 'pages': pages})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSpreadsheetIn(request):
    user = request.user
    data = request.data

    label = data.get('label')
    spreadsheet_label = data.get('spreadsheet_label')
    data_cell_range = data.get('data_cell_range')


    if not label or not spreadsheet_label or not data_cell_range:
        return Response(
            {"detail": "Input Spreadsheet could not be created. Missing label, spreadsheet label or data cell range."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if SpreadsheetIn.objects.filter(label=label).exists():
        return Response(
            {"detail": "Input Spreadsheet could not be created. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
    

    spreadsheet_instance = None
    if spreadsheet_label:
        try:
            spreadsheet_instance = Spreadsheet.objects.get(label=spreadsheet_label)

        except Spreadsheet.DoesNotExist:
            return Response(
                {"detail": "Spreadsheet could not be created. Spreadsheet not found."},
                status=status.HTTP_400_BAD_REQUEST
            )
    else:
        return Response(
            {"detail": "Input Spreadsheet could not be created. Spreadsheet cannot be None."},
            status=status.HTTP_400_BAD_REQUEST
        )        

    try:
        validate_excel_range(data_cell_range)
    except ValidationError as e:
        return Response(
            {"detail": "Input Spreadsheet could not be created. Wrong data cell range."},
            status=status.HTTP_400_BAD_REQUEST
        )


    SpreadsheetIn.objects.create(
        label=label,
        author_user=user,
        updating_user=user,
        spreadsheet=spreadsheet_instance,
        data_cell_range=data_cell_range,
    )

    return Response({"detail": "Input Spreadsheet has been created"})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editSpreadsheetIn(request, pk):
    user = request.user
    data = request.data

    label = data.get('label')
    spreadsheet_label = data.get('spreadsheet_label')
    data_cell_range = data.get('data_cell_range')

    try:
        spreadsheet_in = SpreadsheetIn.objects.get(pk=pk)
    except SpreadsheetIn.DoesNotExist:
        return Response(
            {"detail": "Input Spreadsheet not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    if not label or not spreadsheet_label or not data_cell_range:
        return Response(
            {"detail": "Input Spreadsheet could not be updated. Missing label, spreadsheet label or data cell range."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if SpreadsheetIn.objects.filter(label=label).exclude(pk=pk).exists():
        return Response(
            {"detail": "Input Spreadsheet could not be updated. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        spreadsheet_instance = Spreadsheet.objects.get(label=spreadsheet_label)
    except Spreadsheet.DoesNotExist:
        return Response(
            {"detail": "Spreadsheet could not be updated. Spreadsheet not found."},
            status=status.HTTP_400_BAD_REQUEST
        )

    try:
        validate_excel_range(data_cell_range)
    except ValidationError:
        return Response(
            {"detail": "Input Spreadsheet could not be updated. Wrong data cell range."},
            status=status.HTTP_400_BAD_REQUEST
        )

    spreadsheet_in.label = label
    spreadsheet_in.spreadsheet = spreadsheet_instance
    spreadsheet_in.data_cell_range = data_cell_range
    spreadsheet_in.updating_user = user
    spreadsheet_in.save()

    return Response({"detail": "Input Spreadsheet has been updated"})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSpreadsheetIn(request, pk):
    spreadsheetIn = SpreadsheetIn.objects.get(id = pk)
    spreadsheetIn.delete()
    return Response('SpreadsheetIn deleted')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheetIn(request, pk):
    try:
        spreadsheetIn = SpreadsheetIn.objects.get(id=pk)
    except SpreadsheetIn.DoesNotExist:
        return Response({"detail": "Input Spreadsheet not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SpreadsheetInSerializer(spreadsheetIn)
    return Response(serializer.data, status=status.HTTP_200_OK)

