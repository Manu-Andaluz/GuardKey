from django.urls import path
from . import views

urlpatterns = [
    path("create-master-password/", views.generate_key, name="create_master_password"),
    path("validate/", views.verify_master_password, name="verify_master_password")
]