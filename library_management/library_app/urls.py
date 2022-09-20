from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import Signup,BookApi, LogoutAndBlacklistRefreshTokenForUserView,Type

urlpatterns = [ 
    path('token/obtain/', jwt_views.TokenObtainPairView.as_view(), name='token_create'), 
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('signup/', Signup.as_view(), name='signup'),
    path('books/', BookApi.as_view(), name='books'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name='blacklist'),
    path('get-type/', Type.as_view(), name='type')
]