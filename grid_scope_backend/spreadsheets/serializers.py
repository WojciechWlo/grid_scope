from rest_framework import serializers
from django.contrib.auth.models import User
from spreadsheets.models import SpreadsheetIn, SpreadsheetOut, Spreadsheet, Key
#from rest_framework_simplejwt.tokens import RefreshToken

class SpreadsheetInSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpreadsheetIn
        fields = '__all__'

class SpreadsheetOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = SpreadsheetOut
        fields = '__all__'

class SpreadsheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Spreadsheet
        fields = '__all__'

class KeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Key
        exclude = ['key']
