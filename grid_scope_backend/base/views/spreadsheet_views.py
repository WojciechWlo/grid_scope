from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from base.models import SpreadsheetIn, SpreadsheetOut, Spreadsheet, Key, validate_excel_cell, validate_excel_range
from base.serializers import SpreadsheetInSerializer, SpreadsheetOutSerializer, SpreadsheetSerializer, KeySerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.exceptions import ValidationError
from rest_framework import status
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheets(request):

    spreadsheets = Spreadsheet.objects.all()

    page = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages = 1

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
    return Response({'spreadsheets':serializer.data, 'page':page, 'pages':pages})


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
def createSpreadsheet(request):
    user = request.user
    data = request.data

    label = data.get('label')
    url = data.get('url')
    key_label = data.get('key_label')
    is_public = data.get('is_public')

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
            key_instance = Key.objects.get(label=key_label)

        except Key.DoesNotExist:
            return Response(
                {"detail": "Spreadsheet could not be created. Key not found."},
                status=status.HTTP_400_BAD_REQUEST
            )
    else:
        return Response(
            {"detail": "Spreadsheet could not be created. Key cannot be None."},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    Spreadsheet.objects.create(
        author_user=user,
        updating_user=user,
        label=label,
        url=url,
        key=key_instance,
        is_public=is_public
    )

    return Response({"detail": "Spreadsheet has been created"})

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
    user = request.user       
    data = request.data
    label = data.get('label')
    key_value = data.get('key')

    try:
        if label and key_value:

            if Key.objects.filter(label=label).exists():
                return Response(
                    {"detail": "Key could not be created. Label already exists."},
                    status=status.HTTP_400_BAD_REQUEST
                )

            Key.objects.create(
                key=key_value, 
                label=label,
                author_user=user,
                updating_user=user,
                )
            return Response({"detail": "Spreadsheet has been created"}, status=status.HTTP_201_CREATED)
        
        return Response({"detail": "Spreadsheet could not be created. Label and Key needed."}, status=status.HTTP_400_BAD_REQUEST)
    
    except Exception as e:
        return Response({"detail": "Spreadsheet could not be created"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editKey(request, pk):
    user = request.user       
    data = request.data
    label = data.get('label')
    key_value = data.get('key')

    try:
        key_obj = Key.objects.get(id=pk)
    except Key.DoesNotExist:
        return Response({"detail": "Key not found."}, status=status.HTTP_404_NOT_FOUND)

    if label and key_value:
        if Key.objects.filter(label=label).exclude(id=pk).exists():
            return Response(
                {"detail": "Key could not be edited. Label already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        key_obj.key = key_value
        key_obj.label = label
        key_obj.updating_user = user
        key_obj.save()

        return Response({"detail": "Key has been edited"}, status=status.HTTP_200_OK)

    return Response({"detail": "Label and Key are required."}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editSpreadsheet(request, pk):
    user = request.user
    data = request.data

    label = data.get('label')
    url = data.get('url')
    key_label = data.get('key_label')
    is_public = data.get('is_public')

    try:
        spreadsheet = Spreadsheet.objects.get(pk=pk)
    except Spreadsheet.DoesNotExist:
        return Response(
            {"detail": "Spreadsheet not found."},
            status=status.HTTP_404_NOT_FOUND
        )

    if not label or not url:
        return Response(
            {"detail": "Spreadsheet could not be updated. Missing label or url."},
            status=status.HTTP_400_BAD_REQUEST
        )

    if Spreadsheet.objects.filter(label=label).exclude(pk=pk).exists():
        return Response(
            {"detail": "Spreadsheet could not be updated. Label already exists."},
            status=status.HTTP_400_BAD_REQUEST
        )

    key_instance = None
    if key_label:
        try:
            key_instance = Key.objects.get(label=key_label)
        except Key.DoesNotExist:
            return Response(
                {"detail": "Spreadsheet could not be updated. Key not found."},
                status=status.HTTP_400_BAD_REQUEST
            )
    else:
        return Response(
            {"detail": "Spreadsheet could not be updated. Key cannot be None."},
            status=status.HTTP_400_BAD_REQUEST
        )

    spreadsheet.label = label
    spreadsheet.url = url
    spreadsheet.key = key_instance
    spreadsheet.is_public = is_public
    spreadsheet.updating_user = user
    spreadsheet.save()

    return Response({"detail": "Spreadsheet has been updated"})


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

    # Aktualizacja pól
    spreadsheet_out.label = label
    spreadsheet_out.spreadsheet = spreadsheet_instance
    spreadsheet_out.data_cell = data_cell
    spreadsheet_out.updating_user = user
    spreadsheet_out.save()

    return Response({"detail": "Output Spreadsheet has been updated"})


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteKey(request, pk):
    key = Key.objects.get(id = pk)
    key.delete()
    return Response('Key deleted')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSpreadsheet(request, pk):
    spreadsheet = Spreadsheet.objects.get(id = pk)
    spreadsheet.delete()
    return Response('Spreadsheet deleted')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSpreadsheetIn(request, pk):
    spreadsheetIn = SpreadsheetIn.objects.get(id = pk)
    spreadsheetIn.delete()
    return Response('SpreadsheetIn deleted')

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteSpreadsheetOut(request, pk):
    spreadsheetOut = SpreadsheetOut.objects.get(id=pk)
    spreadsheetOut.delete()
    return Response('SpreadsheetOut deleted')

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getKey(request, pk):
    try:
        key = Key.objects.get(id=pk)
    except Key.DoesNotExist:
        return Response({"detail": "Key not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = KeySerializer(key)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheet(request, pk):
    try:
        spreadsheet = Spreadsheet.objects.get(id=pk)
    except Spreadsheet.DoesNotExist:
        return Response({"detail": "Spreadsheet not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SpreadsheetSerializer(spreadsheet)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheetIn(request, pk):
    try:
        spreadsheetIn = SpreadsheetIn.objects.get(id=pk)
    except SpreadsheetIn.DoesNotExist:
        return Response({"detail": "Input Spreadsheet not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SpreadsheetInSerializer(spreadsheetIn)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getSpreadsheetOut(request, pk):
    try:
        spreadsheetOut = SpreadsheetOut.objects.get(id=pk)
    except SpreadsheetOut.DoesNotExist:
        return Response({"detail": "Output Spreadsheet not found."}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = SpreadsheetOutSerializer(spreadsheetOut)
    return Response(serializer.data, status=status.HTTP_200_OK)