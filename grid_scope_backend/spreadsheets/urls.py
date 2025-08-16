from django.urls import path, include
import spreadsheets.views as views


urlpatterns = [
    path('', views.getSpreadsheets, name="spreadsheet-list" ),
    path('create',views.createSpreadsheet, name="spreadsheet-create"),    
    path('in', views.getSpreadsheetsIn, name="spreadsheet-in-list" ),
    path('in/create',views.createSpreadsheetIn, name="spreadsheet-in-create"),
    path('in/delete/<str:pk>',views.deleteSpreadsheetIn, name="spreadsheet-in-delete"),
    path('in/<str:pk>',views.getSpreadsheetIn, name="spreadsheet-in"),
    path('in/edit/<str:pk>',views.editSpreadsheetIn, name="spreadsheet-in-edit"),
    path('out', views.getSpreadsheetsOut, name="spreadsheet-out-list"),
    path('out/create', views.createSpreadsheetOut, name="spreadsheet-out-create"),
    path('out/delete/<str:pk>', views.deleteSpreadsheetOut, name="spreadsheet-out-delete"),
    path('out/<str:pk>',views.getSpreadsheetOut, name="spreadsheet-out"),
    path('out/edit/<str:pk>',views.editSpreadsheetOut, name="spreadsheet-out-edit"),
    path('keys', views.getKeys, name="key-list" ),
    path('keys/create',views.createKey, name="key-create"),
    path('keys/edit/<str:pk>',views.editKey, name="key-edit"),
    path('keys/delete/<str:pk>', views.deleteKey, name="key-delete"),
    path('keys/<str:pk>',views.getKey, name="key"),
    path('<str:pk>',views.getSpreadsheet, name="spreadsheet"),
    path('edit/<str:pk>',views.editSpreadsheet, name="spreadsheet-edit"),
    path('delete/<str:pk>', views.deleteSpreadsheet, name="spreadsheet-delete"),
    path('in/delete/<str:pk>', views.deleteKey, name="spreadsheet-in-delete"),    
]
