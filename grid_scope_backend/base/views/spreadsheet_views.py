from django.shortcuts import render
from rest_framework.response import Response
from base.models import SpreadsheetIn, SpreadsheetOut, Spreadsheet, Key, validate_excel_cell, validate_excel_range
from base.serializers import SpreadsheetInSerializer, SpreadsheetOutSerializer, SpreadsheetSerializer, KeySerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ValidationError
from rest_framework import status
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheets(request):

    spreadsheets = Spreadsheet.objects.all()

    page: str = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages: int = 1

    if page > 0:
        paginator = Paginator(spreadsheets, 10)

        try:
            spreadsheets = paginator.page(page)
        except PageNotAnInteger:
            spreadsheets = paginator.page(1)
        except EmptyPage:
            spreadsheets = paginator.page(paginator.num_pages)

        pages = paginator.num_pages


    serializer = SpreadsheetSerializer(spreadsheets, many=True)
    response = Response({'spreadsheets':serializer.data, 'page':page, 'pages':pages})
    return response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSpreadsheet(request):
    user = request.user
    data = request.data

    label: str = data.get('label')
    url: str = data.get('url')
    key_label: str = data.get('key_label')

    if not label or not url:
        response = Response(
            {"detail": "Spreadsheet could not be created. Missing label or url."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    if Spreadsheet.objects.filter(label=label).exists():
        response = Response(
            {"detail": "Spreadsheet could not be created. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    
    key_instance = None
    if key_label:
        try:
            key_instance = Key.objects.get(label=key_label)

        except Key.DoesNotExist:
            response = Response(
                {"detail": "Spreadsheet could not be created. Key not found."},
                status=status.HTTP_400_BAD_REQUEST
            )
            return response
    else:
        response = Response(
            {"detail": "Spreadsheet could not be created. Key cannot be None."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    Spreadsheet.objects.create(
        author_user=user,
        updating_user=user,
        label=label,
        url=url,
        key=key_instance,
    )

    response = Response({"detail": "Spreadsheet has been created"})
    return response


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editSpreadsheet(request, pk):
    user = request.user
    data = request.data

    label: str = data.get('label')
    url: str = data.get('url')
    key_label: str = data.get('key_label')

    try:
        spreadsheet = Spreadsheet.objects.get(pk=pk)
    except Spreadsheet.DoesNotExist:
        response = Response(
            {"detail": "Spreadsheet not found."},
            status=status.HTTP_404_NOT_FOUND
        )
        return response
    if not label or not url:
        response = Response(
            {"detail": "Spreadsheet could not be updated. Missing label or url."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    if Spreadsheet.objects.filter(label=label).exclude(pk=pk).exists():
        response = Response(
            {"detail": "Spreadsheet could not be updated. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    key_instance = None
    if key_label:
        try:
            key_instance = Key.objects.get(label=key_label)
        except Key.DoesNotExist:
            response = Response(
                {"detail": "Spreadsheet could not be updated. Key not found."},
                status=status.HTTP_400_BAD_REQUEST
            )
            return response
    else:
        response = Response(
            {"detail": "Spreadsheet could not be updated. Key cannot be None."},
            status=status.HTTP_400_BAD_REQUEST
        )
        return response
    spreadsheet.label = label
    spreadsheet.url = url
    spreadsheet.key = key_instance
    spreadsheet.updating_user = user
    spreadsheet.save()

    response = Response({"detail": "Spreadsheet has been updated"})
    return response


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSpreadsheet(request, pk):
    spreadsheet = Spreadsheet.objects.get(id = pk)
    spreadsheet.delete()
    response = Response('Spreadsheet deleted')
    return response

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheet(request, pk):
    try:
        spreadsheet = Spreadsheet.objects.get(id=pk)
    except Spreadsheet.DoesNotExist:
        response = Response({"detail": "Spreadsheet not found."}, status=status.HTTP_404_NOT_FOUND)
        return response
    
    serializer = SpreadsheetSerializer(spreadsheet)
    response = Response(serializer.data, status=status.HTTP_200_OK)
    return response