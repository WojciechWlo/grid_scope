"""
URL configuration for grid_scope_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView

from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

api_patterns = [
    path('spreadsheets/', include('base.urls.spreadsheet_urls')),
    path('spreadsheetsin/', include('base.urls.spreadsheet_in_urls')),
    path('spreadsheetsout/', include('base.urls.spreadsheet_out_urls')),
    path('keys/', include('base.urls.key_urls')),
    path('processes/', include('base.urls.process_urls')),
    path('users/', include('base.urls.user_urls')),
    path('token/',TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/',TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns = [
    path("core/", include('core.urls')),
    path('admin/', admin.site.urls),
    path('api/', include(api_patterns)),
]
