from django.contrib import admin
from spreadsheets.models import Spreadsheet,SpreadsheetIn, SpreadsheetOut, Key

# Register your models here.
admin.site.register(Spreadsheet)
admin.site.register(SpreadsheetIn)
admin.site.register(SpreadsheetOut)
admin.site.register(Key)