from django.urls import path
from . import views

urlpatterns = [
    path("generate-key/", views.generate_key, name="example")
]