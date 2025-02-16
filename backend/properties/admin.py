from django.contrib import admin
from .models import Property, PropertyImage

class PropertyImageInline(admin.TabularInline):
    model = PropertyImage
    extra = 1

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    inlines = [PropertyImageInline]
    list_display = ('title', 'city', 'price', 'rooms', 'property_type', 'owner', 'created_at')
    search_fields = ('title', 'city', 'owner__username')
