from rest_framework.serializers import CharField, Serializer
from .models import PasswordManager

class PasswordManagerSerializer(Serializer):
    key = CharField()

    def create(self, validated_data):
        return PasswordManager(**validated_data)
 