from django.contrib import admin
from .models import *
# Register your models here.
class KeyAdmin(admin.ModelAdmin):
    exclude = ('key',)
    
admin.site.register(Key, KeyAdmin)
admin.site.register(Spreadsheet)
admin.site.register(SpreadsheetIn)
admin.site.register(SpreadsheetOut)
admin.site.register(Process)
admin.site.register(ProcessSpreadsheetIn)
admin.site.register(ProcessSpreadsheetOut)