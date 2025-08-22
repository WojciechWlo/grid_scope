from django.urls import path, include
import core.views as views


urlpatterns = [
    path('health/',views.health, name="health"),
]
