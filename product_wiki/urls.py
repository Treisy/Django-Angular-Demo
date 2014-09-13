from django.conf.urls import patterns, include, url

from django.contrib import admin

from .views import Index, Logout, FormView, PartialView

from products.forms import ProductForm, ProductImageForm

admin.autodiscover()

partial_patterns = patterns('',
    url(r'^hero.html$', PartialView.as_view(template_name='hero.html'), name='hero'),
    url(r'^list.html$', PartialView.as_view(template_name='list.html'), name='list'),
    url(r'^product.html$', PartialView.as_view(template_name='product.html'), name='product'),
    url(r'^product_form.html$', FormView.as_view(form_class=ProductForm), name='product_form'),
    url(r'^image_form.html$', FormView.as_view(form_class=ProductImageForm), name='image_form'),
)

urlpatterns = patterns('',
    url(r'^$', Index.as_view(), name='index'),
    url(r'^logout/', Logout.as_view(), name='logout'),
    url(r'^products/', include('products.urls'), name='products'),
    url(r'^includes/', include(partial_patterns, namespace='partials')),

    url(r'^admin/', include(admin.site.urls), name='admin'),
)
