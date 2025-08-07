from django.urls import path, include
from rest_framework.routers import DefaultRouter
import spreadsheets.views as views

router = DefaultRouter()
router.register(r'spreadsheetInList/', views.SpreadsheetInListViewSet)
router.register(r'spreadsheetOutList/', views.SpreadsheetOutListViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
