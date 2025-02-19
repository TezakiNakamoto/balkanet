from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # Extend the default fieldsets to include the is_agent field
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('is_agent',)}),
    )
    # Also add is_agent to list_display if you want to see it in the user list
    list_display = UserAdmin.list_display + ('is_agent',)

admin.site.register(CustomUser, CustomUserAdmin)
