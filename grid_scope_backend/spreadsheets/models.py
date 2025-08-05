from django.db import models

# Create your models here.

class Spreadsheet(models.Model):
    label = models.CharField(max_length=255, unique=True)
    key = models.CharField(max_length=100)
    url = models.URLField()

    def __str__(self):
        return self.label
