from rest_framework import serializers
from django.contrib.auth.models import User
from spreadsheets.models import SpreadsheetIn, SpreadsheetOut, Spreadsheet, Key
#from rest_framework_simplejwt.tokens import RefreshToken

class SpreadsheetInSerializer(serializers.ModelSerializer):
    spreadsheet = serializers.CharField(source='spreadsheet.label')
    class Meta:
        model = SpreadsheetIn
        fields = '__all__'

class SpreadsheetOutSerializer(serializers.ModelSerializer):
    spreadsheet = serializers.CharField(source='spreadsheet.label')    
    class Meta:
        model = SpreadsheetOut
        fields = '__all__'

class SpreadsheetSerializer(serializers.ModelSerializer):
    key = serializers.CharField(source='key.label')
    class Meta:
        model = Spreadsheet
        fields = '__all__'

class KeySerializer(serializers.ModelSerializer):
    class Meta:
        model = Key
        exclude = ['key']
