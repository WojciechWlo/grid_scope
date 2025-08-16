from django.urls import path
from base.views import user_views as views

urlpatterns = [
    path('login/', views.LoginView.as_view(), name='login'),
    path('tokens/refresh/', views.TokensRefresh.as_view(), name='tokens-refresh')
]