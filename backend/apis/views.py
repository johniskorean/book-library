import requests
from .models import Book
from django.http import JsonResponse
from .google_books_api import search_books, get_book_details
from django.shortcuts import get_object_or_404
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

def search_books_view(request):
  query = request.GET.get('q', '')
  if not query:
    return JsonResponse({'error': 'No query provided'}, status=400)
  try:
    results = search_books(query)
    return JsonResponse(results)
  except requests.exceptions.RequestException as error:
    return JsonResponse({'error': str(error)}, status=500)

def book_details_view(request, book_id):
  try:
    details = get_book_details(book_id)
    return JsonResponse(details)
  except requests.exceptions.RequestException as error:
    return JsonResponse({'error': str(error)}, status=500)

def save_book_view(request, book_id):
  try:
    details = get_book_details(book_id)
    book_info = details.get('volumeInfo', {})

    book, created = Book.objects.get_or_create(
      google_book_id=book_id,
      defaults={
        'title': book_info.get('title', ''),
        'authors': book_info.get('authors', []),
        'published_date': book_info.get('publishedDate'),
        'description': book_info.get('description', ''),
        'thumbnail_url': book_info.get('imageLinks', {}).get('thumbnail', '')
      }

    )
    return JsonResponse({'status': 'success', 'created': created})
  except requests.exceptions.RequestException as error:
    return JsonResponse({'error': str(error)}, status=500)

def get_saved_books_view(request):
  page_number = request.GET.get('page', 1)
  books = Book.objects.all().order_by('-id')
  paginator = Paginator(books, 10)

  try:
    page_obj = paginator.get_page(page_number)
  except PageNotAnInteger:
    page_obj = paginator.page(1)
  except EmptyPage:
    page_obj = paginator.page(paginator.num_pages)
    
  return JsonResponse({
    'books': list(page_obj.object_list.values()),
    'has_next': page_obj.has_next(),
    'has_previous': page_obj.has_previous(),
    'total_pages': paginator.num_pages
  })

def delete_book(request, book_id):
  try:
    book = Book.objects.get(id=book_id)
    book.delete()
    return JsonResponse({'status': 'success', 'message': 'Book deleted successfully'})
  except Book.DoesNotExist:
    return JsonResponse({'status': 'error', 'message': 'Book not found'})
