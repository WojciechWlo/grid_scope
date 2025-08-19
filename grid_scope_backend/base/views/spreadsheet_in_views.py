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

    page: str = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages: int = 1

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
    response = Response({'spreadsheetsIn': serializer.data, 'page': page, 'pages': pages})
    return response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSpreadsheetIn(request):
    user = request.user
    data = request.data

    label: str = data.get('label')
    spreadsheet_label: str = data.get('spreadsheet_label')
    data_cell_range: str = data.get('data_cell_range')

    if not label or not spreadsheet_label or not data_cell_range:
        response = Response(
            {"detail": "Input Spreadsheet could not be created. Missing label, spreadsheet label or data cell range."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    
    if SpreadsheetIn.objects.filter(label=label).exists():
        response = Response(
            {"detail": "Input Spreadsheet could not be created. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response    

    spreadsheet_instance = None
    if spreadsheet_label:
        try:
            spreadsheet_instance = Spreadsheet.objects.get(label=spreadsheet_label)

        except Spreadsheet.DoesNotExist:
            response = Response(
                {"detail": "Spreadsheet could not be created. Spreadsheet not found."},
                status=status.HTTP_400_BAD_REQUEST
            )
            return response        
    else:
        response = Response(
            {"detail": "Input Spreadsheet could not be created. Spreadsheet cannot be None."},
            status=status.HTTP_400_BAD_REQUEST
        )        
        return response
    try:
        validate_excel_range(data_cell_range)
    except ValidationError as e:
        response = Response(
            {"detail": "Input Spreadsheet could not be created. Wrong data cell range."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response

    SpreadsheetIn.objects.create(
        label=label,
        author_user=user,
        updating_user=user,
        spreadsheet=spreadsheet_instance,
        data_cell_range=data_cell_range,
    )

    response = Response({"detail": "Input Spreadsheet has been created"})
    return response


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editSpreadsheetIn(request, pk):
    user = request.user
    data = request.data

    label: str = data.get('label')
    spreadsheet_label: str = data.get('spreadsheet_label')
    data_cell_range: str = data.get('data_cell_range')

    try:
        spreadsheet_in = SpreadsheetIn.objects.get(pk=pk)
    except SpreadsheetIn.DoesNotExist:
        response = Response(
            {"detail": "Input Spreadsheet not found."},
            status=status.HTTP_404_NOT_FOUND
        )
        return response
    if not label or not spreadsheet_label or not data_cell_range:
        response = Response(
            {"detail": "Input Spreadsheet could not be updated. Missing label, spreadsheet label or data cell range."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    if SpreadsheetIn.objects.filter(label=label).exclude(pk=pk).exists():
        response = Response(
            {"detail": "Input Spreadsheet could not be updated. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    try:
        spreadsheet_instance = Spreadsheet.objects.get(label=spreadsheet_label)
    except Spreadsheet.DoesNotExist:
        response = Response(
            {"detail": "Spreadsheet could not be updated. Spreadsheet not found."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    try:
        validate_excel_range(data_cell_range)
    except ValidationError:
        response = Response(
            {"detail": "Input Spreadsheet could not be updated. Wrong data cell range."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    spreadsheet_in.label = label
    spreadsheet_in.spreadsheet = spreadsheet_instance
    spreadsheet_in.data_cell_range = data_cell_range
    spreadsheet_in.updating_user = user
    spreadsheet_in.save()

    response = Response({"detail": "Input Spreadsheet has been updated"})
    return response

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSpreadsheetIn(request, pk):
    spreadsheetIn = SpreadsheetIn.objects.get(id = pk)
    spreadsheetIn.delete()
    response = Response('SpreadsheetIn deleted')
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheetIn(request, pk):
    try:
        spreadsheetIn = SpreadsheetIn.objects.get(id=pk)
    except SpreadsheetIn.DoesNotExist:
        response = Response({"detail": "Input Spreadsheet not found."}, status=status.HTTP_404_NOT_FOUND)
        return response
    serializer = SpreadsheetInSerializer(spreadsheetIn)
    response = Response(serializer.data, status=status.HTTP_200_OK)
    return response
