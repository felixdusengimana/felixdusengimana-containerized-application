"""
Management command to load sample agricultural price data.
Usage: python manage.py load_sample_data
"""
from django.core.management.base import BaseCommand
from django.utils import timezone
from decimal import Decimal
from prices.models import Product, Price


class Command(BaseCommand):
    """Load sample data for testing and development."""
    
    help = 'Load sample agricultural products and prices into the database'
    
    def handle(self, *args, **options):
        """Execute the command."""
        self.stdout.write(self.style.SUCCESS('Loading sample data...'))
        
        # Sample products
        sample_products = [
            {'name': 'Maize', 'unit': 'kg', 'description': 'Corn/maize grain'},
            {'name': 'Rice', 'unit': 'kg', 'description': 'White or brown rice'},
            {'name': 'Beans', 'unit': 'kg', 'description': 'Dry beans (various types)'},
            {'name': 'Cassava', 'unit': 'kg', 'description': 'Cassava root tuber'},
            {'name': 'Tomatoes', 'unit': 'kg', 'description': 'Fresh tomatoes'},
            {'name': 'Potatoes', 'unit': 'kg', 'description': 'Irish potatoes'},
            {'name': 'Bananas', 'unit': 'kg', 'description': 'Fresh bananas'},
            {'name': 'Onions', 'unit': 'kg', 'description': 'Red or yellow onions'},
        ]
        
        # Sample prices data
        sample_prices = [
            {'product': 'Maize', 'price': 150.0, 'location': 'Kigali Market'},
            {'product': 'Maize', 'price': 155.0, 'location': 'Musanze Market'},
            {'product': 'Rice', 'price': 250.0, 'location': 'Kigali Market'},
            {'product': 'Rice', 'price': 245.0, 'location': 'Gitarama Market'},
            {'product': 'Beans', 'price': 200.0, 'location': 'Kigali Market'},
            {'product': 'Beans', 'price': 195.0, 'location': 'Butare Market'},
            {'product': 'Cassava', 'price': 100.0, 'location': 'Kigali Market'},
            {'product': 'Cassava', 'price': 105.0, 'location': 'Musanze Market'},
            {'product': 'Tomatoes', 'price': 300.0, 'location': 'Kigali Market'},
            {'product': 'Tomatoes', 'price': 320.0, 'location': 'Gitarama Market'},
            {'product': 'Potatoes', 'price': 180.0, 'location': 'Kigali Market'},
            {'product': 'Potatoes', 'price': 175.0, 'location': 'Huye Market'},
            {'product': 'Bananas', 'price': 80.0, 'location': 'Kigali Market'},
            {'product': 'Bananas', 'price': 75.0, 'location': 'Musanze Market'},
            {'product': 'Onions', 'price': 220.0, 'location': 'Kigali Market'},
            {'product': 'Onions', 'price': 210.0, 'location': 'Gitarama Market'},
        ]
        
        # Create products
        created_count = 0
        for product_data in sample_products:
            product, created = Product.objects.get_or_create(
                name=product_data['name'],
                defaults={
                    'unit': product_data['unit'],
                    'description': product_data['description']
                }
            )
            if created:
                created_count += 1
        
        self.stdout.write(
            self.style.SUCCESS(f'Created {created_count} products')
        )
        
        # Create prices
        price_count = 0
        for price_data in sample_prices:
            product = Product.objects.get(name=price_data['product'])
            price, created = Price.objects.get_or_create(
                product=product,
                location=price_data['location'],
                price=Decimal(str(price_data['price'])),
                defaults={'currency': 'RWF'}
            )
            if created:
                price_count += 1
        
        self.stdout.write(
            self.style.SUCCESS(f'Created {price_count} price records')
        )
        
        self.stdout.write(
            self.style.SUCCESS('Sample data loaded successfully!')
        )
