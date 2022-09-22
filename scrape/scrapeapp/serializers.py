from rest_framework import serializers
from .models import Plans

class plan_serializer(serializers.ModelSerializer):
    class Meta():
        model=Plans
        fields=("plan_name","plan_benefits")
