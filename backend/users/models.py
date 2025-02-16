# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class CustomUser(AbstractUser):
    is_agent = models.BooleanField(default=False, help_text="Designates whether the user is an agent.")
    phone_number = models.CharField(max_length=15, blank=True, null=True)

    def __str__(self):
        return self.username
