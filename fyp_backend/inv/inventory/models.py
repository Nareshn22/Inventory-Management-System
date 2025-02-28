from django.db import models

class Category(models.Model):

    name=models.CharField(max_length=50,unique=True)
    description=models.TextField(max_length=100 , blank=True,null=True)

    def __str__(self):
        return self.name
    
class Supplier(models.Model):
    name=models.CharField(max_length=50)
    company_name=models.CharField(unique=True,max_length=50)
    phn_no=models.CharField(max_length=15)
    email=models.EmailField(unique=True)
    address=models.TextField()
    notes=models.TextField(blank=True,null=True)


    def __str__(self):
        return self.company_name
    
class Item(models.Model):

    name=models.CharField(max_length=50)
    description=models.TextField()
    categoryId=models.ForeignKey(Category,on_delete=models.CASCADE)
    supplierId=models.ForeignKey(Supplier,on_delete=models.CASCADE)
    quantity=models.PositiveIntegerField()
    price=models.DecimalField(max_digits=10,decimal_places=2)
    revenue=models.DecimalField(max_digits=15,decimal_places=2,default=0.0)
    created_at=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Transaction(models.Model):

    customer_name=models.CharField(max_length=30)
    item_name=models.CharField(max_length=255)
    quantity=models.PositiveBigIntegerField()
    price=models.DecimalField(max_digits=10, decimal_places=2)
    total=models.DecimalField(max_digits=10, decimal_places=2)
    transaction_date=models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f"{self.customer_name} - {self.item_name}  {self.quantity}"
    


