from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from .models import Secrets, Entries
from .serializers import SecretsSerializer, EntriesSerializer
from rest_framework.decorators import api_view
import json

@api_view(['POST'])
def create_masterkey(request):
    if request.method == 'POST':
        body_unicode = request.body.decode('utf-8')
        body_data = json.loads(body_unicode)
        user_masterkey = body_data.get("master_password")
        password_manager = Secrets()
        password_manager.set_masterkey(user_masterkey)
        return JsonResponse({'message': 'Added to the database !!'})
    else:
        return JsonResponse({'message': 'ERROR !!'})

@api_view(['POST'])
def create_entry(request):
    if request.method == 'POST':
        request_body = json.loads(request.body) 
        validate_password = Secrets().validate_master_password(request_body.get("master_password"))

        if validate_password:
            site_name = request_body.get("site_name")
            site_url = request_body.get("site_url")
            email = request_body.get("email")
            username = request_body.get("username")
            password = request_body.get("password")
            
            Entries().add_entry(mp=validate_password.masterkey_hash,ds=validate_password.device_secret, sitename=site_name, siteurl=site_url, email=email,username=username,password=password)
            return JsonResponse({'message': "very good"})
        else:
            return JsonResponse({'body': "The master password is incorrect !! Try again !!"})
    else:
        return JsonResponse({'message': 'ERROR !!'})

@api_view(['POST'])
def extract_entries(request):
    if request.method == 'POST':
        request_body = json.loads(request.body) 
        validate_password = Secrets().validate_master_password(request_body.get("master_password"))

        if validate_password:
            search = request_body.get("search")
            decrypt_password = request_body.get("decrypt_password")
            result = Entries().retrieve_entries(mp=validate_password.masterkey_hash,ds=validate_password.device_secret, search=search, decrypt_password=decrypt_password)
            serialized_result = EntriesSerializer(result).data
            return JsonResponse({'message': serialized_result})
    
    else:
        return JsonResponse({'message': 'ERROR !!'})
     
@api_view(['GET'])
def generate_password(request):
    request_body = json.loads(request.body)
    length = request_body.get("password_length")

    if length:
        password = Secrets().generate_random_password(length=length)
        return JsonResponse({'password': password})

    else:
        return JsonResponse({'message': "Enter the length for the password"})
    

#@api_view(['POST'])
#def generate_key(request):

    #if request.method == 'POST':
        #body_unicode = request.body.decode('utf-8')
        #body_data = json.loads(body_unicode)
        #master_password = body_data.get("master_password")

        #password_manager = PasswordManager()

        #passwordExist = password_manager.set_master_password(master_password)

        #if passwordExist == False:
            #return JsonResponse({'message': "There is already an existing master password"})
        #else:
            #return JsonResponse({'message': "Master password settled"})

    #else :
        #return JsonResponse({'message': "Not found"})
        

#@api_view(['POST'])
#def verify_master_password(request):
    #if request.method == 'POST':
        #body_unicode = request.body.decode('utf-8')
        #body_data = json.loads(body_unicode)
        #master_password = body_data.get("master_password")

        #password_manager = PasswordManager()
        #password_manager.add_new_password(None,None)

        #if password_manager.verify_master_password(master_password):
            #return JsonResponse({'message': 'Master password verified successfully'})
        #else:
            #return JsonResponse({'error': 'Invalid master password'})

    #else:
        #return JsonResponse({'message': "Not found"})
    
    

