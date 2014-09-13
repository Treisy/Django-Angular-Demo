from django.shortcuts import render

from django.conf import settings

from django.contrib.auth import login, logout

from django.utils.decorators import method_decorator
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic import View, FormView, TemplateView
from django.views.generic.edit import FormMixin

from djangular.views.mixins import allow_remote_invocation

from products.forms import AuthForm, ProductForm, ProductImageForm
from products.models import Product, ProductImage

from django.http import HttpResponseRedirect

import product_wiki.settings

class Index(FormView):
    template_name = 'index.html'
    form_class = AuthForm

    def form_valid(self, form):
        login(self.request, form.get_user())
        if self.request.session.test_cookie_worked():
            self.request.session.delete_test_cookie()
        return HttpResponseRedirect('/')

    def form_invalid(self, form):
        message='Please check your credentials.'
        return self.render_to_response(self.get_context_data(form=form, message=message))

    @method_decorator(sensitive_post_parameters('password'))
    def dispatch(self, request, *args, **kwargs):
        request.session.set_test_cookie()
        return super(Index, self).dispatch(request, *args, **kwargs)

class Logout(View):
    def get(self, request, *args, **kwargs):
        logout(request)
        return HttpResponseRedirect('/')

class FormView(FormView):
    template_name = 'form.html'

    def get_context_data(self, **kwargs):
        return super(FormView, self).get_context_data(**kwargs)

class PartialView(TemplateView):

    def get_context_data(self, **kwargs):
        return super(PartialView, self).get_context_data(**kwargs)

