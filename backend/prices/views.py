"""
Views for the prices app.
API endpoints for retrieving and managing agricultural prices.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.filters import SearchFilter, OrderingFilter
from django.shortcuts import get_object_or_404
from django.db.models import Avg, Max, Min
from .models import Product, Price
from .serializers import ProductListSerializer, ProductDetailSerializer, PriceSerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    """
    ViewSet for viewing products and their prices.

    Endpoints:
        GET /api/products/ - List all products with latest prices
        GET /api/products/{id}/ - Get detailed product info with price history
        GET /api/products/{id}/price-stats/ - Get price statistics for a product
        POST /api/products/{id}/add-price/ - Add a new price for a product
    """

    queryset = Product.objects.all()
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["name"]
    ordering_fields = ["name", "created_at"]
    ordering = ["name"]

    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == "retrieve":
            return ProductDetailSerializer
        return ProductListSerializer

    @action(detail=True, methods=["get"])
    def price_stats(self, request, pk=None):
        """Get price statistics for a product."""
        product = self.get_object()
        prices = product.prices.all()

        if not prices.exists():
            return Response(
                {"error": "No price data available for this product"},
                status=status.HTTP_404_NOT_FOUND,
            )

        stats = {
            "product_id": product.id,
            "product_name": product.name,
            "average_price": prices.aggregate(Avg("price"))["price__avg"],
            "highest_price": prices.aggregate(Max("price"))["price__max"],
            "lowest_price": prices.aggregate(Min("price"))["price__min"],
            "total_records": prices.count(),
            "currency": prices.first().currency,
        }

        return Response(stats)

    @action(detail=True, methods=["post"])
    def add_price(self, request, pk=None):
        """Add a new price record for a product."""
        product = self.get_object()
        serializer = PriceSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(product=product)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["get"])
    def summary(self, request):
        """Get summary statistics for all products."""
        total_products = Product.objects.count()
        total_prices = Price.objects.count()

        return Response(
            {
                "total_products": total_products,
                "total_price_records": total_prices,
            }
        )


class PriceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing price records.

    Endpoints:
        GET /api/prices/ - List all prices
        POST /api/prices/ - Add a new price
        GET /api/prices/{id}/ - Get a specific price record
    """

    queryset = Price.objects.all()
    serializer_class = PriceSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ["product__name", "location"]
    ordering_fields = ["date_added", "price"]
    ordering = ["-date_added"]

    def get_queryset(self):
        """Filter prices by product if specified in query params."""
        queryset = Price.objects.all()
        product_id = self.request.query_params.get("product_id")

        if product_id:
            queryset = queryset.filter(product_id=product_id)

        return queryset
