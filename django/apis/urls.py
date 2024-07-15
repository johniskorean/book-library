from django.urls import path
from . import views

urlpatterns = [
  path('search/', views.search_books_view, name='search_books'),
  path('book/<str:book_id>/', views.book_details_view, name='book_details'),
  path('save-book/<str:book_id>/', views.save_book_view, name="save_books"),
  path('saved-books/', views.get_saved_books_view, name='get_saved_books'),
  path('delete-book/<str:book_id>/', views.delete_book, name='delete_book'),
  path('contact/submit/', views.submit_contact, name='submit_contact')
]
