from django.urls import path, include
from base.views import spreadsheet_views as views


urlpatterns = [
    path('', views.getSpreadsheets, name="spreadsheet-list" ),
    path('create/',views.createSpreadsheet, name="spreadsheet-create"),
    path('<str:pk>/',views.getSpreadsheet, name="spreadsheet"),
    path('edit/<str:pk>/',views.editSpreadsheet, name="spreadsheet-edit"),
    path('delete/<str:pk>/', views.deleteSpreadsheet, name="spreadsheet-delete"),
]
