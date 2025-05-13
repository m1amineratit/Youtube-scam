from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('download_payload/', views.download_payload),
    path('geo_capture/', views.geo_capture),
]

