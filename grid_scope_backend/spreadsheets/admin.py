from django.contrib import admin
from spreadsheets.models import Spreadsheet,SpreadsheetIn, SpreadsheetOut, Key, Process, ProcessSpreadsheetIn, ProcessSpreadsheetOut

# Register your models here.
admin.site.register(Spreadsheet)
admin.site.register(SpreadsheetIn)
admin.site.register(SpreadsheetOut)
admin.site.register(Key)
admin.site.register(Process)
admin.site.register(ProcessSpreadsheetIn)
admin.site.register(ProcessSpreadsheetOut)