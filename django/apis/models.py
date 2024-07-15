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

class Contact(models.Model):
   name = models.CharField(max_length=100)
   email = models.EmailField()
   message = models.TextField()

   def __str__(self):
      return f"Contact form {self.name}"
