from django.contrib.auth import authenticate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User 
from rest_framework_simplejwt.exceptions import TokenError

# Create your views here.
class LoginView(APIView):
    def post(self, request):
        username:str = request.data.get("username")
        password:str = request.data.get("password")

        if not username or not password:
            response = Response({"detail": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)
            return response
        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)

            response = Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                "tokens": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                }
            }, status=status.HTTP_200_OK)
            return response
        else:
            response = Response({"detail": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
            return response

class TokensRefresh(APIView):
    def post(self, request):
        refresh_token:str = request.data.get("refresh")

        if not refresh_token:
            response = Response({"detail": "Refresh token is required."}, status=status.HTTP_400_BAD_REQUEST)
            return response
        try:
            refresh:str = RefreshToken(refresh_token)

            user_id:str = refresh.get("user_id")
            try:
                user = User.objects.get(id=user_id)
            except User.DoesNotExist:
                response = Response({"detail": "User not found."}, status=status.HTTP_404_NOT_FOUND)
                return response
            
            new_refresh = RefreshToken.for_user(user)
            new_access = new_refresh.access_token

            response = Response({
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                    "first_name": user.first_name,
                    "last_name": user.last_name,
                },
                "tokens": {
                    "refresh": str(new_refresh),
                    "access": str(new_access),
                }
            }, status=status.HTTP_200_OK)
            return response
        
        except TokenError:
            response = Response({"detail": "Invalid or expired refresh token."}, status=status.HTTP_401_UNAUTHORIZED)
            return response