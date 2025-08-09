from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
import re
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

    # Check if columns are within Excel's limit (1 to 16384 → A to XFD)
    if not (1 <= col1_num <= 16384 and 1 <= col2_num <= 16384):
        raise ValidationError("Column range must be between A and XFD (1–16384)")
    
    # Check if rows are within Excel's limit (1 to 1048576)
    if not (1 <= row1_num <= 1048576 and 1 <= row2_num <= 1048576):
        raise ValidationError("Row range must be between 1 and 1048576")


class Key(models.Model):
    key = models.CharField(max_length=100, null=False, blank=False)


class Spreadsheet(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=False, blank=False) 
    key = models.ForeignKey(Key, on_delete=models.CASCADE, null=False, blank=False)
    label = models.CharField(max_length=100, unique=True, null=False, blank=False)
    url = models.URLField(max_length=100,null=False, blank=False)


class SpreadsheetIn(models.Model):
    label = models.CharField(max_length=100, unique=True, null=False, blank=False)
    Spreadsheet = models.ForeignKey(Spreadsheet,on_delete=models.CASCADE, null=False, blank=False)

    col_header_cell_range = models.CharField(
        max_length=25,
        validators=[validate_excel_range],
        help_text="Enter a valid Excel range, e.g., A1:XFD1048576"
    )
    data_cell_range = models.CharField(
        max_length=25,
        validators=[validate_excel_range],
        help_text="Enter a valid Excel range, e.g., A1:XFD1048576"
    )

    def __str__(self):
        return self.label

class SpreadsheetOut(models.Model):
    label = models.CharField(max_length=100, unique=True, null=False, blank=False)    
    Spreadsheet = models.ForeignKey(Spreadsheet,on_delete=models.CASCADE, null=False, blank=False)
    
    def __str__(self):
        return self.label
