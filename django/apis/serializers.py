from rest_framework import serializers
from .models import Book
from .models import Contact

class BookSerializer(serializers.ModelSerializer):
  class Meta:
    model = Book
    fields = ['google_book_id', 'title', 'authors', 'published_date','description', 'thumbnail_url']

class ContactSerializer(serializers.ModelSerializer):
  class Meta:
    model = Contact
    fields = ['name', 'email', 'message']
