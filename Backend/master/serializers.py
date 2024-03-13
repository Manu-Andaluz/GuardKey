from rest_framework.serializers import CharField, Serializer
from .models import PasswordManager

class PasswordManagerSerializer(Serializer):
    class Meta: 
        model = PasswordManager
        fields = '__all__'
 