import requests
from requests.exceptions import HTTPError
from django.conf import settings

BASE_URL = 'https://www.googleapis.com/books/v1/volumes'

def search_books(query, max_results=10):
  params = {
    'q': query,
    'key': settings.GOOGLE_BOOKS_API_KEY,
    'maxResults': max_results
  }
  try:
    response = requests.get(BASE_URL, params=params)
    response.raise_for_status()
    return response.json()
  except HTTPError as http_err:
    print(f"HTTP error: {http_err}")
    raise
  except Exception as err:
    print(f"An error: {err}")
    raise

def get_book_details(book_id):
  url = f'{BASE_URL}/{book_id}'
  params = {'key': settings.GOOGLE_BOOKS_API_KEY}
  try:
    response = requests.get(url, params=params)
    response.raise_for_status()
    return response.json()
  except HTTPError as http_err:
    print(f"HTTP error: {http_err}")
    raise
  except Exception as err:
    print(f"An error: {err}")
    raise
