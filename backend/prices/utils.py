"""
Utility functions for the prices app.
"""
from decimal import Decimal
from django.db.models import Avg, Max, Min, Q
from datetime import timedelta
from django.utils import timezone
from .models import Product, Price


def get_price_statistics(product_id: int) -> dict:
    """
    Calculate price statistics for a product.
    
    Args:
        product_id: The ID of the product
        
    Returns:
        Dictionary containing min, max, average, and standard deviation
    """
    prices = Price.objects.filter(product_id=product_id)
    
    if not prices.exists():
        return {}
    
    stats = prices.aggregate(
        min_price=Min('price'),
        max_price=Max('price'),
        avg_price=Avg('price'),
        count=Count('id')
    )
    
    return stats


def get_price_trend(product_id: int, days: int = 30) -> list:
    """
    Get price trend data for a product over the last N days.
    
    Args:
        product_id: The ID of the product
        days: Number of days to look back (default: 30)
        
    Returns:
        List of price records ordered by date
    """
    cutoff_date = timezone.now() - timedelta(days=days)
    prices = Price.objects.filter(
        product_id=product_id,
        date_added__gte=cutoff_date
    ).order_by('date_added')
    
    return prices


def find_cheapest_location(product_id: int) -> Price:
    """
    Find the location with the cheapest price for a product.
    
    Args:
        product_id: The ID of the product
        
    Returns:
        Price object with the lowest price
    """
    return Price.objects.filter(product_id=product_id).order_by('price').first()


def find_most_expensive_location(product_id: int) -> Price:
    """
    Find the location with the most expensive price for a product.
    
    Args:
        product_id: The ID of the product
        
    Returns:
        Price object with the highest price
    """
    return Price.objects.filter(product_id=product_id).order_by('-price').first()


def get_products_by_location(location: str) -> list:
    """
    Get all products and their prices for a specific location.
    
    Args:
        location: The market location name
        
    Returns:
        List of distinct products with prices at that location
    """
    return Price.objects.filter(location__icontains=location).select_related('product').distinct('product')


from django.db.models import Count
