from rest_framework.response import Response
from base.models import Key
from base.serializers import KeySerializer
from rest_framework.decorators import api_view, permission_classes
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
# Create your views here.


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getKeys(request):

    keys = Key.objects.all()

    page: str = request.query_params.get('page')

    if page == None:
        page = 1

    page = int(page)
    pages: int = 1

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
    response = Response({'keys':serializer.data, 'page':page, 'pages':pages}) 
    return response


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createKey(request):
    user = request.user       
    data = request.data
    label: str = data.get('label')
    key_value: str = data.get('key')

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
            response = Response({"detail": "Key has been created"}, status=status.HTTP_201_CREATED)
            return response
        
        response = Response({"detail": "Key could not be created. Label and Key needed."}, status=status.HTTP_400_BAD_REQUEST)
        return response
    
    except Exception as e:
        response = Response({"detail": "Key could not be created"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return response

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def editKey(request, pk):
    user = request.user       
    data = request.data
    label: str = data.get('label')
    key_value: str = data.get('key')

    try:
        key_obj = Key.objects.get(id=pk)
    except Key.DoesNotExist:
        return Response({"detail": "Key not found."}, status=status.HTTP_404_NOT_FOUND)

    if label:
        if Key.objects.filter(label=label).exclude(id=pk).exists():
            return Response(
                {"detail": "Key could not be edited. Label already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )


        if key_value:
            key_obj.key = key_value
        key_obj.label = label
        key_obj.updating_user = user
        key_obj.save()

        response = Response({"detail": "Key has been edited"}, status=status.HTTP_200_OK)
        return response

    response = Response({"detail": "Label is required."}, status=status.HTTP_400_BAD_REQUEST)
    return response


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteKey(request, pk):
    key = Key.objects.get(id = pk)
    key.delete()
    response = Response('Key deleted')
    return response


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getKey(request, pk):
    try:
        key = Key.objects.get(id=pk)
    except Key.DoesNotExist:
        response = Response({"detail": "Key not found."}, status=status.HTTP_404_NOT_FOUND)
        return response
    
    serializer = KeySerializer(key)
    response = Response(serializer.data, status=status.HTTP_200_OK)
    return response

