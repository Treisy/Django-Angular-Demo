from djangular.views.crud import NgCRUDView

from products.models import Product, ProductImage

class ProductCRUDView(NgCRUDView):
    model = Product

class ProductImageCRUDView(NgCRUDView):
    model = ProductImage
