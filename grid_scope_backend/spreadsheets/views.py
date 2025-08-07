from django.shortcuts import render
from rest_framework import viewsets
from .models import SpreadsheetIn, SpreadsheetOut
from .serializers import SpreadsheetInSerializer, SpreadsheetOutSerializer

# Create your views here.

class SpreadsheetInListViewSet(viewsets.ModelViewSet):
    queryset = SpreadsheetIn.objects.all()
    serializer_class = SpreadsheetInSerializer

    http_method_names = ['get', 'post', 'put', 'delete']

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    
class SpreadsheetOutListViewSet(viewsets.ModelViewSet):
    queryset = SpreadsheetOut.objects.all()
    serializer_class = SpreadsheetOutSerializer

    http_method_names = ['get', 'post', 'put', 'delete']

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)