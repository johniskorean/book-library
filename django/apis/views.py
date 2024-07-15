import requests
from .models import Book
from .google_books_api import search_books, get_book_details
from .serializers import ContactSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.conf import settings
from django.core.mail import send_mail

@api_view(['GET'])
def search_books_view(request):
  query = request.GET.get('q', '')
  max_results = request.GET.get('maxResults', 36)
  if not query:
    return Response({'error': 'No query provided'}, status=status.HTTP_400_BAD_REQUEST)
  try:
    results = search_books(query, max_results)
    return Response(results)
  except requests.exceptions.RequestException as error:
    return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def book_details_view(request, book_id):
  try:
    details = get_book_details(book_id)
    return Response(details)
  except requests.exceptions.RequestException as error:
    return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
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
    return Response({'status': 'success', 'created': created})
  except requests.exceptions.RequestException as error:
    return Response({'error': str(error)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def submit_contact(request):
  serializer = ContactSerializer(data=request.data)
  if serializer.is_valid():
      serializer.save()

      subject = f"New Contact Form Submission from {serializer.validated_data['name']}"
      message = f"Name: {serializer.validated_data['name']}\n" \
                f"Email: {serializer.validated_data['email']}\n" \
                f"Message: {serializer.validated_data['message']}"
      from_email = settings.EMAIL_HOST_USER
      recipient_list = [settings.EMAIL_HOST_USER]

      try:
        send_mail(subject, message, from_email, recipient_list)
      except Exception as error:
        print(f"Failed to send email: {error}")
        return Response({"message": "Contact submitted but email notification failed"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

      return Response({"message": "Contact submission successful"}, status=status.HTTP_201_CREATED)
  else:
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_saved_books_view(request):
  page_number = request.GET.get('page', 1)
  books = Book.objects.all().order_by('-id')
  paginator = Paginator(books, 12)

  try:
    page_obj = paginator.get_page(page_number)
  except PageNotAnInteger:
    page_obj = paginator.page(1)
  except EmptyPage:
    page_obj = paginator.page(paginator.num_pages)

  return Response({
    'books': list(page_obj.object_list.values()),
    'has_next': page_obj.has_next(),
    'has_previous': page_obj.has_previous(),
    'total_pages': paginator.num_pages
  })

@api_view(['DELETE'])
def delete_book(request, book_id):
  try:
    book = Book.objects.get(google_book_id=book_id)
    book.delete()
    return Response({'status': 'success', 'message': 'Book deleted successfully'})
  except Book.DoesNotExist:
    return Response({'status': 'error', 'message': 'Book not found'}, status=status.HTTP_404_NOT_FOUND)
