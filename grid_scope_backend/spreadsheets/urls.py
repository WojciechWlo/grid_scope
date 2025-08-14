from django.urls import path, include
from rest_framework.routers import DefaultRouter
import spreadsheets.views as views


urlpatterns = [
    path('', views.getSpreadsheets, name="spreadsheet-list" ),
    path('create',views.createSpreadsheet, name="spreadsheet-create"),    
    path('in', views.getSpreadsheetsIn, name="spreadsheet-in-list" ),
    path('in/create',views.createSpreadsheetIn, name="spreadsheet-in-create"),
    path('in/delete/<str:pk>',views.deleteSpreadsheetIn, name="spreadsheet-in-delete"),
    path('out', views.getSpreadsheetsOut, name="spreadsheet-out-list"),
    path('out/create', views.createSpreadsheetOut, name="spreadsheet-out-create"),
    path('out/delete/<str:pk>', views.deleteSpreadsheetOut, name="spreadsheet-out-delete"),
    path('keys', views.getKeys, name="key-list" ),
    path('keys/create',views.createKey, name="key-create"),
    path('keys/delete/<str:pk>', views.deleteKey, name="key-delete"),
    path('delete/<str:pk>', views.deleteSpreadsheet, name="spreadsheet-delete"),
    path('in/delete/<str:pk>', views.deleteKey, name="spreadsheet-in-delete"),    
]
