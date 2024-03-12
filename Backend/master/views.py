from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def example(request):
    print(request)
    return {
    "master": "123klasjf0-12i"
    }