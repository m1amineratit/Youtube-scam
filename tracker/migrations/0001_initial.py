# Generated by Django 5.2.1 on 2025-05-13 21:24

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='DeviceInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_agent', models.TextField()),
                ('platform', models.CharField(max_length=100)),
                ('language', models.CharField(max_length=50)),
                ('screen_width', models.IntegerField()),
                ('screen_height', models.IntegerField()),
                ('timezone', models.CharField(max_length=100)),
                ('online', models.BooleanField()),
                ('cookies_enabled', models.BooleanField()),
                ('touch_support', models.BooleanField()),
                ('ip_address', models.GenericIPAddressField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('img', models.ImageField(upload_to='media1/')),
                ('created_at', models.DateTimeField(auto_now_add=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.CharField(max_length=100)),
                ('longitude', models.CharField(max_length=100)),
                ('ip_address', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Screenshot',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='screenshots/')),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='UploadedFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.FileField(upload_to='uploads/')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='VisitorInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fingerprint', models.CharField(max_length=255, unique=True)),
                ('device_type', models.CharField(max_length=50)),
                ('screen_width', models.IntegerField()),
                ('screen_height', models.IntegerField()),
                ('color_depth', models.IntegerField()),
                ('timezone_offset', models.IntegerField()),
                ('referrer', models.URLField(blank=True, null=True)),
                ('language', models.CharField(max_length=50)),
                ('is_new_visitor', models.BooleanField(default=False)),
                ('cookies_enabled', models.BooleanField(default=False)),
                ('operating_system', models.CharField(max_length=100)),
                ('latitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
            ],
        ),
    ]
