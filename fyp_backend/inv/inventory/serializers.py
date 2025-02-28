from .models import Item,Supplier,Category,Transaction
from rest_framework import serializers

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=Category
        fields='__all__'

class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model=Supplier
        fields='__all__'

class ItemSerializer(serializers.ModelSerializer):

    class Meta:
        model=Item
        fields='__all__'

class TransactionSerializer(serializers.ModelSerializer):

    class Meta:
        model=Transaction
        fields='__all__'
        