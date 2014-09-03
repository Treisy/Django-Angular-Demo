from django.forms import ModelForm

from djangular.forms import NgModelFormMixin, NgFormValidationMixin

from products.models import Product, ProductImage

class ProductForm(NgModelFormMixin, NgFormValidationMixin, ModelForm):
    form_name = 'product_form'
    scope_prefix = 'product'

    class Meta:
        model = Product
        fields = '__all__'

class ProductImageForm(NgModelFormMixin, NgFormValidationMixin, ModelForm):
    form_name = 'image'

    class Meta:
        model = ProductImage
        fields = '__all__'
