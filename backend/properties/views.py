from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Property, PropertyImage
from .serializers import PropertySerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        # Remove the owner field if it exists (so it's not sent as an array or otherwise)
        data.pop('owner', None)
        
        # Handle multiple images
        images = request.FILES.getlist('images')
        
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        property_instance = serializer.save(owner=request.user)
        
        for img in images:
            PropertyImage.objects.create(property=property_instance, image=img)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
