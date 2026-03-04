"""
Models for the prices app.
Tracks agricultural products and their market prices.
"""

from django.db import models
from django.core.validators import MinValueValidator


class Product(models.Model):
    """Agricultural product model."""

    UNIT_CHOICES = [
        ("kg", "Kilogram"),
        ("bag", "Bag (50kg)"),
        ("bunch", "Bunch"),
        ("piece", "Piece"),
        ("liter", "Liter"),
    ]

    name = models.CharField(max_length=100, unique=True)
    unit = models.CharField(max_length=10, choices=UNIT_CHOICES, default="kg")
    description = models.TextField(blank=True, null=True)
    image_url = models.CharField(max_length=255, blank=True, null=True, default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "Products"

    def __str__(self):
        return self.name

    def get_latest_price(self):
        """Get the most recent price for this product."""
        return self.prices.first()


class Price(models.Model):
    """Price model for tracking agricultural product prices."""

    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name="prices"
    )
    price = models.DecimalField(
        max_digits=10, decimal_places=2, validators=[MinValueValidator(0)]
    )
    location = models.CharField(max_length=100)
    currency = models.CharField(max_length=3, default="RWF")
    date_added = models.DateTimeField(auto_now_add=True)
    source = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        ordering = ["-date_added"]
        verbose_name_plural = "Prices"
        indexes = [
            models.Index(fields=["product", "-date_added"]),
            models.Index(fields=["-date_added"]),
        ]

    def __str__(self):
        return f"{self.product.name} - {self.price} {self.currency}"
