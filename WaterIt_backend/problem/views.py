from rest_framework.response import Response
from .serializer import *
from .models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, JSONParser
from rest_framework.decorators import parser_classes
from PIL import Image
from io import BytesIO
from rest_framework import status
import base64
import uuid

# Create********************************************************************************************************************
@api_view(['POST'])
def create_problem(request):
    try:
        data=request.data
        if "image_url" in data:
            base64_img = data["image_url"]
            im = Image.open(BytesIO(base64.b64decode(base64_img)))
            file_name = f"problem_{uuid.uuid4()}.png"
            im.save(f"mediafiles/problem/{file_name}")
            image_url = f"http://localhost:8000/media/problem/{file_name}"
        else:
            image_url = f"http://localhost:8000/media/default.jpg"
        dataProblem = {
            'title': data['title'], 
            'image_url':image_url, 
            'description': data['description'], 
            'ward': data['ward'],
            'district': data['district'], 
            'city': data['city'],
            'extra_info': data['extra_info'],
            'userOf': request.user.id ,
            "status" : 0
        }
        serializerProblem = ProblemSerializer(data=dataProblem)
        if serializerProblem.is_valid():
            serializerProblem.save()
            return Response({
                        'message': 'Success to create problem',
                        },status=status.HTTP_201_CREATED)
        else:
             return Response({
                'message': 'Fail to create quiz because requese invalid',
            }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
        return Response({
            'message': str(e)
        })    


#UPDATED********************************************************************************************************************************************

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def update_problem(request,id):
    try:
        if not id:
            return Response({"message": "can not find the id"
            },status=status.HTTP_404_NOT_FOUND)
        data = request.data
        if "image_url" in data:
            base64_img = data["image_url"]
            im = Image.open(BytesIO(base64.b64decode(base64_img)))
            file_name = f"problem_{uuid.uuid4()}.png"
            im.save(f"mediafiles/problem/{file_name}")
            image_url = f"http://localhost:8000/media/problem/{file_name}"
        else:
            image_url = f"http://localhost:8000/media/default.jpg"
        dataProblem = {
            'title': data['title'], 
            'image_url':image_url, 
            'description': data['description'], 
            'ward': data['ward'],
            'district': data['district'], 
            'city': data['city'],
            'extra_info': data['extra_info'],
            'userOf': request.user.id 
        }
        objProblem = Problem.objects.get(id=id)
        serializerProblem = ProblemSerializer(objProblem, data=dataProblem, partial=True)
        if serializerProblem.is_valid():
            serializerProblem.save()
            return Response({
                        'message': 'Success to update problem',
                        },status=status.HTTP_200_OK)
        else:
            return Response({
                'message': 'Fail to update problem',
            }, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        print(e)
    return Response({
        'status': "False",
        'message': 'Something went wrong'
    })

#delete**************************************************************************************************************************************************************

#DELETE ONE PROBLEM
@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_one_problem(request, id):
    try:
        data = request.data
        if not id:
            return Response({
                "message": "can not find the id"
            },
                status=status.HTTP_404_NOT_FOUND
            )
        obj = Problem.objects.get(id=id)
        obj.delete()
        return Response(
            {
                "message": 'the problem has alreadly been deleted'
            },
            status=status.HTTP_200_OK
        )
    except Exception as e:
        print(e)
    return Response({
        'status': "False",
        'message': 'Something went wrong'
    })


# DELETE ALL PROBLEMS

@api_view(['DELETE'])
def delete_all_problem(request):
    problem_objs = Problem.objects.all()
    problem_objs.delete()
    return Response(
        {
            "message": "all problems have alreadly been deleted"
        },
        status=status.HTTP_200_OK
    )

#GET ALL PROBLEM

@api_view(['GET'])
def get_multiple_problem(request):
    try:
        ward = request.GET.get("ward")
        district = request.GET.get("district")
        print(ward, district)
        if ward==None and district==None:
            print("a")
            problem_objs = Problem.objects.all()
        else:
            if ward == None:
                problem_objs = Problem.objects.filter(district=district)
            else:
                problem_objs = Problem.objects.filter(ward=ward, district=district)
        serializers = ProblemSerializer(problem_objs, many=True)
        return Response({
            "data" : serializers.data
        })
    except Exception as e:
        print("Error", e)
    return Response({
        'status': "False",
        'message': 'Something went wrong'
    })

#GET ONE PROBLEM

@api_view(['GET'])
def get_one_problem(request,id):
    try:
        if not id:
            return Response({
                'messege': "can not find the id",
            }, status=status.HTTP_404_NOT_FOUND)
        problemObj = Problem.objects.get(id=id)
        return Response({
            'title' : problemObj.id,
            'image_url' : problemObj.image_url,
            'description' : problemObj.description,
            'ward' : problemObj.ward,
            'district' : problemObj.district,
            'city' : problemObj.city,
            'extra_info': problemObj.extra_info
        })
    except Exception as e:
        print("Error", e)
    return Response({
        'status': "False",
        'message': 'Something went wrong'
    })
 
@api_view(['GET'])
def update_status(request, id):
    try:
        if not id:
            return Response({
                'messege': "can not find the id",
            }, status=status.HTTP_404_NOT_FOUND)
        problemObj = Problem.objects.get(id=id)
        status = request.GET.get("status")
        problemObj.status = status
        problemObj.save()
        return Response({
            "message" : "Update successfully"
        })
        
    except Exception as e:
        print(e)
    return Response({
        'status': "False",
        'message': 'Something went wrong'
    })