from rest_framework import serializers
from django.contrib.auth.models import User
from spreadsheets.models import SpreadsheetIn, SpreadsheetOut, Spreadsheet, Key, Process, ProcessSpreadsheetIn, ProcessSpreadsheetOut
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

class ProcessSerializer(serializers.ModelSerializer):  
    class Meta:
        model = Process
        fields = '__all__'

class ProcessSpreadsheetInSerializer(serializers.ModelSerializer):
    process = serializers.CharField(source='process.label')
    spreadsheet_in = serializers.CharField(source='spreadsheet_in.label')
    class Meta:
        model = ProcessSpreadsheetIn
        fields = '__all__'

class ProcessSpreadsheetOutSerializer(serializers.ModelSerializer):
    process = serializers.CharField(source='process.label')
    spreadsheet_out = serializers.CharField(source='spreadsheet_out.label')    
    class Meta:
        model = ProcessSpreadsheetOut
        fields = '__all__'
