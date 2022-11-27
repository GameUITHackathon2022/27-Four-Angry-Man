from django.urls import path
from .views import *
from rest_framework.authtoken import views as token_views

urlpatterns = [
    path('sign_up',sign_up),
    path('sign_out',sign_out),
    path('login',token_views.obtain_auth_token),
    path('get_user', get_user)
]
