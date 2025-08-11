from django.urls import path
import users.views as views

urlpatterns = [
    path('login', views.LoginView.as_view(), name='login'),
    path('tokens/refresh', views.TokensRefresh.as_view(), name='tokens-refresh')
]