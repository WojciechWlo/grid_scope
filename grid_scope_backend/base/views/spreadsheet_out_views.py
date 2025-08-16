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

    page = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages = 1

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
    return Response({'spreadsheetsOut': serializer.data, 'page': page, 'pages': pages})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSpreadsheetOut(request):
    user = request.user    
    data = request.data

    label = data.get('label')
    spreadsheet_label = data.get('spreadsheet_label')
    data_cell = data.get('data_cell')

    if not label or not spreadsheet_label or not data_cell:
        return Response(
            {"detail": "Output Spreadsheet could not be created. Missing label, spreadsheet label or data cell."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if SpreadsheetOut.objects.filter(label=label).exists():
        return Response(
            {"detail": "Output Spreadsheet could not be created. Label already exists."},
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
            {"detail": "Output Spreadsheet could not be created. Spreadsheet cannot be None."},
            status=status.HTTP_400_BAD_REQUEST
        )        

    try:
        validate_excel_cell(data_cell)
    except ValidationError as e:
        return Response(
            {"detail": "Output Spreadsheet could not be created. Wrong data cell."},
            status=status.HTTP_400_BAD_REQUEST
        )

    SpreadsheetOut.objects.create(
        label=label,
        author_user=user,
        updating_user=user,        
        spreadsheet=spreadsheet_instance,
        data_cell=data_cell,
    )

    return Response({"detail": "Output Spreadsheet has been created"})


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editSpreadsheetOut(request, pk):
    user = request.user    
    data = request.data

    label = data.get('label')
    spreadsheet_label = data.get('spreadsheet_label')
    data_cell = data.get('data_cell')

    try:
        spreadsheet_out = SpreadsheetOut.objects.get(pk=pk)
    except SpreadsheetOut.DoesNotExist:
        return Response(
            {"detail": "Output Spreadsheet not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    if not label or not spreadsheet_label or not data_cell:
        return Response(
            {"detail": "Output Spreadsheet could not be updated. Missing label, spreadsheet label or data cell."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    if SpreadsheetOut.objects.filter(label=label).exclude(pk=pk).exists():
        return Response(
            {"detail": "Output Spreadsheet could not be updated. Label already exists."},
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
        validate_excel_cell(data_cell)
    except ValidationError:
        return Response(
            {"detail": "Output Spreadsheet could not be updated. Wrong data cell."},
            status=status.HTTP_400_BAD_REQUEST
        )

    spreadsheet_out.label = label
    spreadsheet_out.spreadsheet = spreadsheet_instance
    spreadsheet_out.data_cell = data_cell
    spreadsheet_out.updating_user = user
    spreadsheet_out.save()

    return Response({"detail": "Output Spreadsheet has been updated"})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSpreadsheetOut(request, pk):
    spreadsheetOut = SpreadsheetOut.objects.get(id=pk)
    spreadsheetOut.delete()
    return Response('SpreadsheetOut deleted')


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheetOut(request, pk):
    try:
        spreadsheetOut = SpreadsheetOut.objects.get(id=pk)
    except SpreadsheetOut.DoesNotExist:
        return Response({"detail": "Output Spreadsheet not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SpreadsheetOutSerializer(spreadsheetOut)
    return Response(serializer.data, status=status.HTTP_200_OK)