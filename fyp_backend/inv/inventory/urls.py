from django.contrib import admin
from django.urls import path
from .views import*

urlpatterns = [
    path('category/list',ListCategoryView.as_view(),name='ListCategory'),
    path('category/new',CreateCategoryView.as_view(),name='Createcategory'),
    path('category/delete/<int:pk>',DeleteCategoryView.as_view(),name='DeleteCategory'),
    path('supplier/new',CreateSupplierView.as_view(),name='CreateSupplier'),
    path('supplier/list',ListSupplierView.as_view(),name='ListSupplier'),
    path('item/new',CreateItemView.as_view(),name='CreateItem'),
    path('item/list',ListItemView.as_view(),name='ListItem'),
    path('item/remove/<int:pk>',DeleteItemView.as_view(),name='DeleteItem'),
    path('item/update/<int:pk>',UpdateItemView.as_view(),name='UpdateItem'),
    path('transactions',ListCreateTransactionView.as_view(),name='Transaction')

]