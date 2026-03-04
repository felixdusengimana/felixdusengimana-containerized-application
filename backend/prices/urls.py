"""
URL configuration for the prices app.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProductViewSet, PriceViewSet

router = DefaultRouter()
router.register(r"products", ProductViewSet, basename="product")
router.register(r"prices", PriceViewSet, basename="price")

urlpatterns = [
    path("", include(router.urls)),
]
