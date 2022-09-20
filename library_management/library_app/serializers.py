from dataclasses import fields
from rest_framework import serializers
from .models import Users, Books



class Userserializer(serializers.ModelSerializer):
    class Meta():
        model=Users
        fields=("username","email","password")

    def validate(self, attrs):
        email=attrs.get('email',' ')
        username=attrs.get('username',' ')
        password=attrs.get('password',' ')
        return attrs

    def create(self, validated_data):
        return Users.objects.create_user(**validated_data)


class Bookserializer(serializers.ModelSerializer):
    class Meta():
        model=Books
        fields=("book_name","book_content","book_author_email","book_price")

