from rest_framework import generics,status
from  .models  import Item,Category,Supplier,Transaction
from .serializers import ItemSerializer,CategorySerializer,SupplierSerializer,TransactionSerializer
from  rest_framework.response import Response

class ListCategoryView(generics.ListAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer

class CreateCategoryView(generics.CreateAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer

class DeleteCategoryView(generics.DestroyAPIView):
    queryset=Category.objects.all()
    serializer_class=CategorySerializer

class ListSupplierView(generics.ListAPIView):
    queryset=Supplier.objects.all()
    serializer_class=SupplierSerializer

class CreateSupplierView(generics.CreateAPIView):
    queryset=Supplier.objects.all()
    serializer_class=SupplierSerializer

class DeleteSupplierView(generics.DestroyAPIView):
    queryset=Supplier.objects.all()
    serializer_class=SupplierSerializer


class CreateItemView(generics.CreateAPIView):
    queryset=Item.objects.all()
    serializer_class=ItemSerializer

class ListItemView(generics.ListAPIView):
    queryset=Item.objects.all()
    serializer_class=ItemSerializer

class UpdateItemView(generics.UpdateAPIView):
    def patch(self,request,pk):
        try:
            item=Item.objects.get(pk=pk)
            sold_quantity=request.data.get('quantity_sold',0)

            if sold_quantity > item.quantity:
                return Response({'error':'inefficient Stocks!!'},status=status.HTTP_400_BAD_REQUEST)
            
            item.quantity-=sold_quantity
            item.revenue=sold_quantity*item.price
            item.save()

            return Response({'message': 'Item updated successfully', 'updated_data': {
                'quantity': item.quantity,
                'revenue': item.revenue
            }}, status=status.HTTP_200_OK)
        except item.DoesNotExist:
            return Response({'error':'Item Does Not Exist!!'},status=status.HTTP_404_NOT_FOUND)

class DeleteItemView(generics.DestroyAPIView):
    queryset=Item.objects.all()
    serializer_class=ItemSerializer

class  ListCreateTransactionView(generics.ListCreateAPIView):
    queryset=Transaction.objects.all()
    serializer_class=TransactionSerializer
