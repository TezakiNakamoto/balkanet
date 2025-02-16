from django.db import models
from users.models import CustomUser

class Property(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100, blank=True, null=True)
    zip_code = models.CharField(max_length=20, blank=True, null=True)
    rooms = models.IntegerField(default=1, help_text="Number of rooms in the property")
    
    PROPERTY_TYPE_CHOICES = [
        ('AP', 'Apartment'),
        ('HS', 'House'),
        ('CO', 'Condo'),
        ('TH', 'Townhouse'),
        ('OT', 'Other'),
    ]
    property_type = models.CharField(
        max_length=2, 
        choices=PROPERTY_TYPE_CHOICES, 
        default='AP',
        help_text="Type of property"
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    owner = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='properties')
    
    def __str__(self):
        return self.title

class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='property_images/')
    caption = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return f"Image for {self.property.title}"