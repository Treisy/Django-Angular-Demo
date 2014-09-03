from rest_framework import serializers

from products.models import Product, ProductImage

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ('name', 'variant', 'size', 'unit', 'description')

class ProductImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductImage
        fields = ('product', 'image')
