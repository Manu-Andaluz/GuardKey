from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import PasswordManager
from .serializers import PasswordManagerSerializer
from rest_framework.decorators import api_view
import json

@api_view(['POST'])
def generate_key(request):

    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        master_password = body_data.get("master_password")

        password_manager = PasswordManager()

        passwordExist = password_manager.set_master_password(master_password)

        if passwordExist == False:
            return JsonResponse({'message': "There is already an existing master password"})
        else:
            return JsonResponse({'message': "Master password settled"})

    else :
        return JsonResponse({'message': "Not found"})
        

@api_view(['POST'])
def verify_master_password(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        master_password = body_data.get("master_password")

        password_manager = PasswordManager()

        if password_manager.verify_master_password(master_password):
            return JsonResponse({'message': 'Master password verified successfully'})
        else:
            return JsonResponse({'error': 'Invalid master password'})

    else:
        return JsonResponse({'message': "Not found"})
    
    

