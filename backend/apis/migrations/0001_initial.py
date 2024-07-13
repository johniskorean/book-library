# Generated by Django 5.0.7 on 2024-07-13 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Book',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('google_book_id', models.CharField(max_length=255, unique=True)),
                ('title', models.CharField(max_length=255)),
                ('authors', models.CharField(default=list, max_length=255)),
                ('published_date', models.DateField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('thumbnail_url', models.URLField(blank=True)),
            ],
        ),
    ]
