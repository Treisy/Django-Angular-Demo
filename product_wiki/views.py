from django.shortcuts import render
from django.views.generic import View, FormView, TemplateView

from djangular.views.mixins import allow_remote_invocation

from products.forms import ProductForm, ProductImageForm
from products.models import Product, ProductImage

class Index(View):
    template_name = 'index.html'

    def get(self, request, *args, **kwargs):
        return render(request, self.template_name)

class Form(FormView):
    template_name = 'form.html'

    def get(self, request, *args, **kwargs):
        form = ProductForm(initial=None)
        return render(request, self.template_name, {'form': form})

# all partials use this class view
class PartialView(TemplateView):
    def get_context_data(self, **kwargs):
        context = super(PartialView, self).get_context_data(**kwargs)
        return context

class Auth(FormView):
    template_name = 'form.html'

    def get(self, request, *args, **kwargs):
        form = ProductForm(initial=None)
        return render(request, self.template_name, {'form': form})

