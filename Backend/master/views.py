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
        print(body_data.get("user_id"))
        password_manager.set_masterkey(user_masterkey, body_data.get("user_id"))
        return JsonResponse({'message': 'Master password added to the database !!'})
    else:
        return JsonResponse({'message': 'Error !!'})

@api_view(['POST'])
def create_entry(request):
    if request.method == 'POST':
        request_body = json.loads(request.body) 
        validate_password = Secrets().validate_master_password(request_body.get("master_password"))

        if validate_password:
            site_name = request_body.get("site_name")
            site_url = request_body.get("site_url")
            site_image = request_body.get("site_image")
            email = request_body.get("email")
            username = request_body.get("username")
            password = request_body.get("password")
            user_id = request_body.get("user_id")
            
            Entries().add_entry(mp=validate_password.masterkey_hash,ds=validate_password.device_secret, sitename=site_name, siteurl=site_url, siteimage=site_image, email=email,username=username,password=password, user_id=user_id)
            return JsonResponse({'message': "Entry added successfully !!"})
        else:
            return JsonResponse({'message': "The master password is incorrect !! Try again !!"})
    else:
        return JsonResponse({'message': 'Error !!'})

@api_view(['POST'])
def extract_entries(request):
    if request.method == 'POST':
        request_body = json.loads(request.body) 
        validate_password = Secrets().validate_master_password(request_body.get("master_password"))

        if validate_password:
            search = request_body.get("search")
            decrypt_password = request_body.get("decrypt_password")
            user_id = request_body.get("user_id")
            result = Entries().retrieve_entries(mp=validate_password.masterkey_hash,ds=validate_password.device_secret, search=search, decrypt_password=decrypt_password, user_id=user_id)

            serialized_result = EntriesSerializer(result, many=True).data

            return JsonResponse({'data': serialized_result})
    
    else:
        return JsonResponse({'message': 'Error !!'})
     
@api_view(['GET'])
def generate_password(request):
    request_body = json.loads(request.body)
    length = request_body.get("password_length")

    if length:
        password = Secrets().generate_random_password(length=length)
        return JsonResponse({'data': password})

    else:
        return JsonResponse({'message': "The length of the password is required !!"})

@api_view(['DELETE'])
def delete_entry(request):
    validate_password = Secrets().validate_master_password(request.headers.get("Master-Password"))

    if validate_password:
        response = Entries().delete_entry(request.GET["search"])
        serialized_result = EntriesSerializer(response).data
        return JsonResponse({'data': serialized_result})

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
    
    

