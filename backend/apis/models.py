from django.db import models

class Book(models.Model):
  google_book_id = models.CharField(max_length=255, unique=True)
  title = models.CharField(max_length=255)
  authors = models.JSONField(default=list)
  published_date = models.DateField(null=True, blank=True)
  description = models.TextField(blank=True, null=True)
  thumbnail_url = models.URLField(blank=True)

  def __str__(self):
      return self.title
