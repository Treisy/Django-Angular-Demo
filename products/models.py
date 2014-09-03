from django.db import models

from product_wiki.settings import MEDIA_ROOT

class Product(models.Model):
    name = models.CharField(max_length=50)
    variant = models.CharField(max_length=25)
    size = models.FloatField(max_length=15)
    unit = models.CharField(max_length=5)
    description = models.CharField(max_length=255)
    created = models.DateTimeField(auto_now=False, auto_now_add=True)
    last_modified = models.DateTimeField(auto_now=True, auto_now_add=False)

    def __str__(self):
    	return self.name

class ProductImage(models.Model):
	product = models.ForeignKey(Product)
	image = models.ImageField(upload_to=MEDIA_ROOT)
