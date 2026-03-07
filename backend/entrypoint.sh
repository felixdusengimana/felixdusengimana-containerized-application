#!/bin/bash
set -e

# Ensure the database directory is writable
echo "Setting up database..."
if [ ! -d "$(dirname ./db.sqlite3)" ]; then
    mkdir -p "$(dirname ./db.sqlite3)"
fi

# Ensure we can write to the directory
touch ./db.sqlite3 2>/dev/null || true

echo "Running Django migrations..."
python manage.py migrate

echo "Creating superuser if it doesn't exist..."
python manage.py shell << END
from django.contrib.auth.models import User
from django.conf import settings
import os

username = os.getenv('DJANGO_SUPERUSER_USERNAME', 'admin')
email = os.getenv('DJANGO_SUPERUSER_EMAIL', 'admin@agrimarket.local')
password = os.getenv('DJANGO_SUPERUSER_PASSWORD', 'admin')

if not User.objects.filter(username=username).exists():
    User.objects.create_superuser(username, email, password)
    print(f"Superuser '{username}' created successfully")
else:
    print(f"Superuser '{username}' already exists")
END

echo "Starting Django development server..."
exec python manage.py runserver 0.0.0.0:8000
