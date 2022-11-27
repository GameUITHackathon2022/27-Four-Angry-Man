from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from .models import UserProfile

@api_view(["POST"])
def sign_up(request):
    username = request.data.get('email')
    password = request.data.get('password')
    confirm_password = request.data.get('confirm_password')
    ward = request.data.get('ward')
    dictrict = request.data.get('district')
    city = request.data.get('city')
    if password == confirm_password:
        if User.objects.filter(username=username).exists():
            return Response({
                "message" : "Email already exists",
            }, status=status.HTTP_409_CONFLICT)
        else:
            user = User.objects.create_user(username=username, password=password, email=None)
            user.save()
            user_profile = UserProfile.objects.create(user = user,ward = ward ,dictrict = dictrict, city = city)
            user_profile.save()
            return Response({
                "message" : "User created successfully",
            }, status=status.HTTP_201_CREATED)
    else:
        return Response({
                "message" : "Password and confirm password do not match",
            }, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def sign_out(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_200_OK)

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user(request):
    cur_user = request.user
    print(cur_user)
    cur_user_profile = UserProfile.objects.get(user=cur_user)
    print(cur_user_profile)

    return Response({
        "email" : cur_user.username,
        "ward" : cur_user_profile.ward,
        "district" : cur_user_profile.dictrict,
        "city" : cur_user_profile.city,
        "type" :cur_user_profile.type
    })