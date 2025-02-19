from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAgentOrReadOnly(BasePermission):
    """
    Custom permission to only allow agents to create or modify properties.
    Unauthenticated users can only read (GET, HEAD, OPTIONS).
    """
    def has_permission(self, request, view):
        # Read-only methods are allowed for any user.
        if request.method in SAFE_METHODS:
            return True
        
        # Write methods require authentication and is_agent to be True.
        return bool(request.user and request.user.is_authenticated and request.user.is_agent)
