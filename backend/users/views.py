from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import CustomUser
from .serializers import RegisterSerializer, UserSerializer

class RegisterView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class UserListView(generics.ListAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer

# Optionally, add a view to get details of an agent and their properties
from rest_framework.views import APIView
from rest_framework.response import Response
from properties.serializers import PropertySerializer  # we will create this in the properties app
from properties.models import Property

class AgentPropertiesView(APIView):
    """
    Get all properties managed by a specific agent.
    """
    def get(self, request, agent_id, format=None):
        properties = Property.objects.filter(owner__id=agent_id)
        serializer = PropertySerializer(properties, many=True)
        return Response(serializer.data)
