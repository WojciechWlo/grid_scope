from django.urls import path, include
from rest_framework.routers import DefaultRouter
import spreadsheets.views as views


urlpatterns = [
    path('', views.getSpreadsheets, name="spreadsheet-list" ),
]
