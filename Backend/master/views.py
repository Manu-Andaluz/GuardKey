from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import PasswordManager
from .serializers import PasswordManagerSerializer

def generate_key(request):
    password_manager = PasswordManager() 
    key = password_manager.create_key("mykey.key")
    serializer = PasswordManagerSerializer({'key': key})
    return JsonResponse(serializer.data)