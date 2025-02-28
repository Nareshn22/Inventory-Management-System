from django.contrib import admin
from django.urls import path
from .views import RegisterView,LoginView,LogoutView,UserView

urlpatterns = [
    path('signup',RegisterView.as_view(),name='Register'),
    path('login',LoginView.as_view(),name='login'),
    path('user',UserView.as_view(),name='user'),
    path('logout',LogoutView.as_view(),name='logout')
]
