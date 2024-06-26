from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.signup, name="register"),
    path('login/', views.login, name="login"),
    path('refresh-token/', views.refresh_token, name="refresh-token")
]