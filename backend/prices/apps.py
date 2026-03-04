"""
App configuration for the prices app.
"""

from django.apps import AppConfig


class PricesConfig(AppConfig):
    """Configuration class for the prices application."""

    default_auto_field = "django.db.models.BigAutoField"
    name = "prices"
    verbose_name = "Agricultural Prices"
