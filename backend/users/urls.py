from django.urls import path
from .views import RegisterView, UserListView, AgentPropertiesView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('users/', UserListView.as_view(), name='user-list'),
    # Endpoint to get properties for a given agent (e.g., /api/users/agent/5/properties/)
    path('agent/<int:agent_id>/properties/', AgentPropertiesView.as_view(), name='agent-properties'),
]
