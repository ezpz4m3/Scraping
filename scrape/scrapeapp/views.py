from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import plan_serializer
from rest_framework.response import Response
from rest_framework import status
from . import scrape
from .models import Plans
from scrapeapp import serializers
# Create your views here.

class Planview(APIView):
    def get(self,request):
        d1=scrape.main()
        return Response({"message":d1,"success":"true"},200)

    def post(self,request):
        serializer=plan_serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message":serializer.data,"success":"true"},200)
        return Response({"message":serializer.errors,"success":"false"},400)
