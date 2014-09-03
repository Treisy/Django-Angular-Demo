from django.contrib import admin

from products.models import Product, ProductImage
# Register your models here.

class ProductImageInline(admin.StackedInline):
    model = ProductImage
    fk_name = 'product'
    extra = 1

class ProductAdmin(admin.ModelAdmin):
	list_display = ('name', 'variant', 'size', 'unit', 'description')
	inlines = [
	    ProductImageInline,
	]

admin.site.register(Product, ProductAdmin)
