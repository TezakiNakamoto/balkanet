# Generated by Django 5.1.6 on 2025-02-18 23:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0006_property_main_image'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='property',
            name='main_image',
        ),
    ]
