from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="user_profile")
    ward = models.CharField(max_length=100,null = True, blank=True)
    dictrict = models.CharField(max_length=100,null = True, blank=True)
    city = models.CharField(max_length=100,null = True,blank=True)
    type = models.CharField(max_length=100,default="normal")

    def __unicode__(self):
        return self.user.name