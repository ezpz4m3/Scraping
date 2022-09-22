from django.contrib import admin
from django.urls import path, include
from .views import Planview

urlpatterns = [
    path('scrape/', Planview.as_view()),

]