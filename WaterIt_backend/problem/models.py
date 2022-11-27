from django.db import models
from django.contrib.auth.models import User

class Problem(models.Model):
    title = models.CharField(max_length=100, default = "defautTitle")
    image_url = models.CharField(max_length=100, null = True)
    description = models.TextField(null = True, blank = True)
    ward=models.CharField(max_length=100, null = True, blank = True)
    district=models.CharField(max_length=100, null = True, blank = True)
    city = models.CharField(max_length=100, null= True, blank=True)
    extra_info = models.TextField(null = True, blank = True)
    userOf = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    status = models.IntegerField(null=True,default=0)

# Create your models here.
