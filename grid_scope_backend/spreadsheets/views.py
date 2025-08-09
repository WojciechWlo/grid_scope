from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from .models import SpreadsheetIn, SpreadsheetOut, Spreadsheet
from .serializers import SpreadsheetInSerializer, SpreadsheetOutSerializer, SpreadsheetSerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated, IsAdminUser
# Create your views here.

    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheets(request):

    spreadsheets = Spreadsheet.objects.all()

    page = request.query_params.get('page')
    paginator = Paginator(spreadsheets, 2)

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
