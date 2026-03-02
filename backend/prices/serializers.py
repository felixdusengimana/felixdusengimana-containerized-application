"""
Serializers for the prices app.
Convert Product and Price models to JSON.
"""
from rest_framework import serializers
from .models import Product, Price


class PriceSerializer(serializers.ModelSerializer):
    """Serializer for Price model."""
    class Meta:
        model = Price
        fields = ['id', 'price', 'location', 'currency', 'date_added', 'source']
        read_only_fields = ['id', 'date_added']


class ProductListSerializer(serializers.ModelSerializer):
    """Minimal serializer for listing products."""
    latest_price = serializers.SerializerMethodField()
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'unit', 'image_url', 'latest_price']
    
    def get_latest_price(self, obj):
        """Get the latest price for the product."""
        latest = obj.get_latest_price()
        if latest:
            return PriceSerializer(latest).data
        return None


class ProductDetailSerializer(serializers.ModelSerializer):
    """Detailed serializer for single product with price history."""
    prices = PriceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Product
        fields = ['id', 'name', 'unit', 'description', 'prices', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
