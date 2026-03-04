"""
Initial migration for the prices app.
"""

from django.db import migrations, models
import django.core.validators
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Product",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=100, unique=True)),
                (
                    "unit",
                    models.CharField(
                        choices=[
                            ("kg", "Kilogram"),
                            ("bag", "Bag (50kg)"),
                            ("bunch", "Bunch"),
                            ("piece", "Piece"),
                            ("liter", "Liter"),
                        ],
                        default="kg",
                        max_length=10,
                    ),
                ),
                ("description", models.TextField(blank=True, null=True)),
                ("created_at", models.DateTimeField(auto_now_add=True)),
                ("updated_at", models.DateTimeField(auto_now=True)),
            ],
            options={
                "verbose_name_plural": "Products",
                "ordering": ["name"],
            },
        ),
        migrations.CreateModel(
            name="Price",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "price",
                    models.DecimalField(
                        decimal_places=2,
                        max_digits=10,
                        validators=[django.core.validators.MinValueValidator(0)],
                    ),
                ),
                ("location", models.CharField(max_length=100)),
                ("currency", models.CharField(default="RWF", max_length=3)),
                ("date_added", models.DateTimeField(auto_now_add=True)),
                ("source", models.CharField(blank=True, max_length=100, null=True)),
                (
                    "product",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        related_name="prices",
                        to="prices.product",
                    ),
                ),
            ],
            options={
                "verbose_name_plural": "Prices",
                "ordering": ["-date_added"],
            },
        ),
        migrations.AddIndex(
            model_name="price",
            index=models.Index(
                fields=["product", "-date_added"], name="prices_pric_product_date_idx"
            ),
        ),
        migrations.AddIndex(
            model_name="price",
            index=models.Index(fields=["-date_added"], name="prices_pric_date_add_idx"),
        ),
    ]
