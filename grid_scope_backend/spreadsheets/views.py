from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import SpreadsheetIn, SpreadsheetOut, Spreadsheet, Key
from .serializers import SpreadsheetInSerializer, SpreadsheetOutSerializer, SpreadsheetSerializer, KeySerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated, IsAdminUser

from rest_framework import status
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheets(request):

    spreadsheets = Spreadsheet.objects.all()

    page = request.query_params.get('page')
    paginator = Paginator(spreadsheets, 10)

    try:
        spreadsheets = paginator.page(page)
    except PageNotAnInteger:
        spreadsheets = paginator.page(1)
    except EmptyPage:
        spreadsheets = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = SpreadsheetSerializer(spreadsheets, many=True)
    return Response({'spreadsheets':serializer.data, 'page':page, 'pages':paginator.num_pages})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createSpreadsheet(request):
    user = request.user
    data = request.data

    label = data.get('label')
    url = data.get('url')
    key_label = data.get('key_label')

    if not label or not url:
        return Response(
            {"detail": "Spreadsheet could not be created. Missing label or url."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if Spreadsheet.objects.filter(label=label).exists():
        return Response(
            {"detail": "Spreadsheet could not be created. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    key_instance = None
    if key_label:
        try:
            print(key_label)
            key_instance = Key.objects.get(label=key_label)

        except Key.DoesNotExist:
            return Response(
                {"detail": "Spreadsheet could not be created. Key not found."},
                status=status.HTTP_400_BAD_REQUEST
            )

    Spreadsheet.objects.create(
        user=user,
        label=label,
        url=url,
        key=key_instance
    )

    return Response({"detail": "Spreadsheet has been created"})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getKeys(request):

    keys = Key.objects.all()

    page = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages = 1

    if page > 0:
        paginator = Paginator(keys, 10)

        try:
            keys = paginator.page(page)
        except PageNotAnInteger:
            keys = paginator.page(1)
        except EmptyPage:
            keys = paginator.page(paginator.num_pages)


        pages = paginator.num_pages

    serializer = KeySerializer(keys, many=True)
    return Response({'keys':serializer.data, 'page':page, 'pages':pages})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createKey(request):
    data = request.data

    label = data['label']
    key_value = data['key']

    if label and key_value:

        Key.objects.create(key=key_value, label= label)
    
        content = {"detail":"Spreadsheet has been created"}
        return Response(content)

    
    content = {"detail":"Spreadsheet could not be created"}
    return Response(content, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteKey(request, pk):
    key = Key.objects.get(id = pk)
    key.delete()
    return Response('Key deleted')