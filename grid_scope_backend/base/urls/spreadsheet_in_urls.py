from django.urls import path, include
from base.views import spreadsheet_in_views as views


urlpatterns = [
    path('', views.getSpreadsheetsIn, name="spreadsheet-in-list" ),
    path('create/',views.createSpreadsheetIn, name="spreadsheet-in-create"),
    path('delete/<str:pk>/',views.deleteSpreadsheetIn, name="spreadsheet-in-delete"),
    path('<str:pk>/',views.getSpreadsheetIn, name="spreadsheet-in"),
    path('edit/<str:pk>/',views.editSpreadsheetIn, name="spreadsheet-in-edit"),    
]
