from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from base.models import SpreadsheetOut, Spreadsheet, validate_excel_cell, validate_excel_range
from base.serializers import SpreadsheetOutSerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from rest_framework import status
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheetsOut(request):
    spreadsheetsOut = SpreadsheetOut.objects.all()

    page: str = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages: int = 1

    if page > 0:
        paginator = Paginator(spreadsheetsOut, 10)

        try:
            spreadsheetsOut = paginator.page(page)
        except PageNotAnInteger:
            spreadsheetsOut = paginator.page(1)
        except EmptyPage:
            spreadsheetsOut = paginator.page(paginator.num_pages)

        pages = paginator.num_pages

    serializer = SpreadsheetOutSerializer(spreadsheetsOut, many=True)
    response = Response({'spreadsheetsOut': serializer.data, 'page': page, 'pages': pages})
    return response

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSpreadsheetOut(request):
    user = request.user    
    data = request.data

    label: str = data.get('label')
    spreadsheet_label: str = data.get('spreadsheet_label')
    data_cell: str = data.get('data_cell')

    if not label or not spreadsheet_label or not data_cell:
        response = Response(
            {"detail": "Output Spreadsheet could not be created. Missing label, spreadsheet label or data cell."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    if SpreadsheetOut.objects.filter(label=label).exists():
        response = Response(
            {"detail": "Output Spreadsheet could not be created. Label already exists."},
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
            {"detail": "Output Spreadsheet could not be created. Spreadsheet cannot be None."},
            status=status.HTTP_400_BAD_REQUEST
        )        
        return response
 
    try:
        validate_excel_cell(data_cell)
    except ValidationError as e:
        response = Response(
            {"detail": "Output Spreadsheet could not be created. Wrong data cell."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
 
    SpreadsheetOut.objects.create(
        label=label,
        author_user=user,
        updating_user=user,        
        spreadsheet=spreadsheet_instance,
        data_cell=data_cell,
    )

    response = Response({"detail": "Output Spreadsheet has been created"})
    return response
 

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editSpreadsheetOut(request, pk):
    user = request.user    
    data = request.data

    label: str = data.get('label')
    spreadsheet_label: str = data.get('spreadsheet_label')
    data_cell: str = data.get('data_cell')

    try:
        spreadsheet_out = SpreadsheetOut.objects.get(pk=pk)
    except SpreadsheetOut.DoesNotExist:
        response = Response(
            {"detail": "Output Spreadsheet not found."},
            status=status.HTTP_404_NOT_FOUND
        )
        return response
 
    if not label or not spreadsheet_label or not data_cell:
        response = Response(
            {"detail": "Output Spreadsheet could not be updated. Missing label, spreadsheet label or data cell."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
 
    if SpreadsheetOut.objects.filter(label=label).exclude(pk=pk).exists():
        response = Response(
            {"detail": "Output Spreadsheet could not be updated. Label already exists."},
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
        validate_excel_cell(data_cell)
    except ValidationError:
        response = Response(
            {"detail": "Output Spreadsheet could not be updated. Wrong data cell."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
 
    spreadsheet_out.label = label
    spreadsheet_out.spreadsheet = spreadsheet_instance
    spreadsheet_out.data_cell = data_cell
    spreadsheet_out.updating_user = user
    spreadsheet_out.save()

    response = Response({"detail": "Output Spreadsheet has been updated"})
    return response
 

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSpreadsheetOut(request, pk):
    spreadsheetOut = SpreadsheetOut.objects.get(id=pk)
    spreadsheetOut.delete()
    response = Response('SpreadsheetOut deleted')
    return response
 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheetOut(request, pk):
    try:
        spreadsheetOut = SpreadsheetOut.objects.get(id=pk)
    except SpreadsheetOut.DoesNotExist:
        response = Response({"detail": "Output Spreadsheet not found."}, status=status.HTTP_404_NOT_FOUND)
        return response
 
    serializer = SpreadsheetOutSerializer(spreadsheetOut)
    response = Response(serializer.data, status=status.HTTP_200_OK)
    return response
 