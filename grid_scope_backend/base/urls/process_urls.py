from django.urls import path, include
from base.views import process_views as views


urlpatterns = [
    path('create/',views.createProcess, name="process-create"),
    path('', views.getProcesses, name="process-list" ),
    path('delete/<str:pk>/', views.deleteProcess, name="process-delete"),   
    path('<str:pk>/',views.getProcess, name="process"), 
    path('edit/<str:pk>/',views.editProcess, name="process-edit"),     
]
