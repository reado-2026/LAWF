from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('gallery/', views.gallery, name='gallery'),
    path('she/', views.she, name='she'),
    path('register/', views.register, name='register'),
]
