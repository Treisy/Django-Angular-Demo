from django.forms import ModelForm

from django.contrib.auth.forms import AuthenticationForm

from djangular.forms import NgModelFormMixin, NgFormValidationMixin

from products.models import Product, ProductImage


class AuthForm(AuthenticationForm):
    form_name = 'auth_form'

    def __init__(self, *args, **kwargs):
        super(AuthForm, self).__init__(*args, **kwargs)
        for field_name in self.fields:
            self.fields[field_name].widget.attrs['placeholder'] = self.fields[field_name].label


class ProductForm(NgModelFormMixin, NgFormValidationMixin, ModelForm):
    form_name = 'product_form'
    scope_prefix = 'product'

    class Meta:
        model = Product
        fields = '__all__'


class ProductImageForm(NgModelFormMixin, ModelForm):
    form_name = 'image_form'
    scope_prefix = 'image'

    class Meta:
        model = ProductImage
        fields = 'product' , 'image'

    def __init__(self, *args, **kwargs):
        super(ProductImageForm, self).__init__(*args, **kwargs)
        for field_name in self.fields:
            if field_name == "image":
                self.fields[field_name].widget.attrs['file-model'] = "image.image"

class ProductTagForm(NgModelFormMixin, NgFormValidationMixin, ModelForm):
    form_name = 'tag_form'
    scope_prefix = 'tag'

    class Meta:
        model = Product
        fields = '__all__'

#<button class="pure-button pure-button-primary">Select image
#  <input type="file" style="visibility: hidden; position: absolute;">
#</button>