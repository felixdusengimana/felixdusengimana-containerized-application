"""
Admin configuration for the prices app.
"""
from django.contrib import admin
from .models import Product, Price


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """Admin configuration for Product model."""
    list_display = ['name', 'unit', 'created_at']
    search_fields = ['name']
    list_filter = ['unit', 'created_at']
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    """Admin configuration for Price model."""
    list_display = ['product', 'price', 'location', 'currency', 'date_added']
    search_fields = ['product__name', 'location']
    list_filter = ['currency', 'date_added', 'product']
    readonly_fields = ['date_added']
    ordering = ['-date_added']
