from django.urls import path, include
from rest_framework.routers import DefaultRouter
import spreadsheets.views as views


urlpatterns = [
    path('', views.getSpreadsheets, name="spreadsheet-list" ),
    path('/create',views.createSpreadsheet, name="spreadsheet-create"),
    path('/keys', views.getKeys, name="key-list" ),
    path('/keys/create',views.createKey, name="key-create"),    
]
