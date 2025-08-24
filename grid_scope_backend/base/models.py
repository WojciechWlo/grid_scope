from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import re
from encrypted_model_fields.fields import EncryptedCharField
from django.core.validators import MinValueValidator
# Create your models here.

# Helper function to convert Excel column letters (e.g., 'AB') to a number (e.g., 28)
def excel_column_to_number(col_str):
    col_str = col_str.upper()
    exp = 0
    col_num = 0
    for char in reversed(col_str):
        col_num += (ord(char) - ord('A') + 1) * (26 ** exp)
        exp += 1
    return col_num

# Validator for Excel-like range (e.g., 'A1:XFD1048576')
def validate_excel_range(value):
    pattern = r'^([A-Z]{1,3})([1-9][0-9]*):([A-Z]{1,3})([1-9][0-9]*)$'
    match = re.match(pattern, value)
    
    if not match:
        raise ValidationError("Range must be in format like A1:B10")
    
    col1, row1, col2, row2 = match.groups()
    col1_num = excel_column_to_number(col1)
    col2_num = excel_column_to_number(col2)
    row1_num = int(row1)
    row2_num = int(row2)

    if not (1 <= col1_num <= 16384 and 1 <= col2_num <= 16384):
        raise ValidationError("Column range must be between A and XFD (1–16384)")
    
    if not (1 <= row1_num <= 1048576 and 1 <= row2_num <= 1048576):
        raise ValidationError("Row range must be between 1 and 1048576")

def validate_excel_cell(value):
    pattern = r'^([A-Z]{1,3})([1-9][0-9]*)$'
    match = re.match(pattern, value)

    if not match:
        raise ValidationError("Cell must be in format like A1 or XFD1048576")

    col, row = match.groups()
    col_num = excel_column_to_number(col)
    row_num = int(row)

    if not (1 <= col_num <= 16384):
        raise ValidationError("Column must be between A and XFD (1–16384)")

    if not (1 <= row_num <= 1048576):
        raise ValidationError("Row must be between 1 and 1048576")


class Key(models.Model):
    key = EncryptedCharField(unique=False,max_length=1000, null=False, blank=False)
    label = models.CharField(max_length=100, unique=True, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    author_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="keys_created") 
    updated_at = models.DateTimeField(auto_now=True)
    updating_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="keys_updated") 

    def __str__(self):
        return self.label
    
class Spreadsheet(models.Model):
    key = models.ForeignKey(Key, on_delete=models.CASCADE, null=False, blank=False)
    label = models.CharField(max_length=100, unique=True, null=False, blank=False)
    url = models.URLField(max_length=100,null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    author_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="spreadsheets_created") 
    updated_at = models.DateTimeField(auto_now=True)
    updating_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="spreadsheets_updated") 

    def __str__(self):
        return self.label

class SpreadsheetIn(models.Model):
    label = models.CharField(max_length=100, unique=True, null=False, blank=False)
    spreadsheet = models.ForeignKey(Spreadsheet,on_delete=models.CASCADE, null=False, blank=False)
    data_cell_range = models.CharField(
        max_length=25,
        validators=[validate_excel_range],
        help_text="Enter a valid Excel range, e.g., A1:XFD1048576"
    )
    worksheet_name = models.CharField(max_length=100,null=False, blank=False)    
    created_at = models.DateTimeField(auto_now_add=True)
    author_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="spreadsheetsin_created") 
    updated_at = models.DateTimeField(auto_now=True)
    updating_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False,related_name="spreadsheetsin_updated") 

    def __str__(self):
        return self.label

class SpreadsheetOut(models.Model):
    label = models.CharField(max_length=100, unique=True, null=False, blank=False)    
    spreadsheet = models.ForeignKey(Spreadsheet,on_delete=models.CASCADE, null=False, blank=False)
    data_cell = models.CharField(
        max_length=10,
        validators=[validate_excel_cell],
        help_text="Enter a valid Excel cell, e.g., B12"
    )
    worksheet_name = models.CharField(max_length=100,null=False, blank=False)    
    created_at = models.DateTimeField(auto_now_add=True)
    author_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False,related_name="spreadsheetsout_created") 
    updated_at = models.DateTimeField(auto_now=True)
    updating_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False, related_name="spreadsheetsout_updated") 

    def __str__(self):
        return self.label

class Process(models.Model):
    label = models.CharField(max_length=100, unique=True, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    author_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False,related_name="processes_created") 
    updated_at = models.DateTimeField(auto_now=True)
    updating_user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False,related_name="processes_updated") 
    query = models.TextField(max_length=1000, null=False, blank=False,)

    def __str__(self):
        return self.label
    
class ProcessSpreadsheetIn(models.Model):
    process = models.ForeignKey(
        Process, on_delete=models.CASCADE, null=False, blank=False
    )
    spreadsheet_in = models.ForeignKey(
        SpreadsheetIn, on_delete=models.CASCADE, null=False, blank=False
    )

    class Meta:
        unique_together = ("process", "spreadsheet_in")

    def __str__(self):
        return f"Process {self.process.label} ← SpreadsheetIn {self.spreadsheet_in.label}"


class ProcessSpreadsheetOut(models.Model):
    process = models.ForeignKey(
        Process, on_delete=models.CASCADE, null=False, blank=False
    )
    spreadsheet_out = models.ForeignKey(
        SpreadsheetOut, on_delete=models.CASCADE, null=False, blank=False
    )

    class Meta:
        unique_together = ("process", "spreadsheet_out")

    def __str__(self):
        return f"Process {self.process.label} → SpreadsheetOut {self.spreadsheet_out.label}"