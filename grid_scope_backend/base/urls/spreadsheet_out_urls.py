from django.urls import path, include
from base.views import spreadsheet_out_views as views


urlpatterns = [
    path('', views.getSpreadsheetsOut, name="spreadsheet-out-list"),
    path('create/', views.createSpreadsheetOut, name="spreadsheet-out-create"),
    path('delete/<str:pk>/', views.deleteSpreadsheetOut, name="spreadsheet-out-delete"),
    path('<str:pk>/',views.getSpreadsheetOut, name="spreadsheet-out"),
    path('edit/<str:pk>/',views.editSpreadsheetOut, name="spreadsheet-out-edit"),
]
