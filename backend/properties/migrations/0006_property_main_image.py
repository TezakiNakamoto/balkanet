# Generated by Django 5.1.6 on 2025-02-18 23:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('properties', '0005_property_property_type_property_rooms'),
    ]

    operations = [
        migrations.AddField(
            model_name='property',
            name='main_image',
            field=models.ImageField(blank=True, null=True, upload_to='property_main_images/'),
        ),
    ]
