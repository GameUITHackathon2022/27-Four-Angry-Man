
from django.urls import path
from .views import *


urlpatterns = [
    path('api/create_problem',create_problem,name="create_problem"),
    path('api/delete_one_problem/<int:id>',delete_one_problem),
    path('api/delete_all_problem',delete_all_problem),
    path('api/get_multiple_problem',get_multiple_problem),
    path('api/update_status/<int:id>', update_status)
]
