from django.contrib import admin
from spreadsheets.models import SpreadsheetIn, SpreadsheetOut

# Register your models here.
admin.site.register(SpreadsheetIn)
admin.site.register(SpreadsheetOut)