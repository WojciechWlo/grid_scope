from django.urls import path, include
from base.views import key_views as views


urlpatterns = [
    
    path('create/',views.createKey, name="key-create"),
    path('edit/<str:pk>/',views.editKey, name="key-edit"),
    path('delete/<str:pk>/', views.deleteKey, name="key-delete"),
    path('<str:pk>/',views.getKey, name="key"),
    path('', views.getKeys, name="key-list" ),
]
