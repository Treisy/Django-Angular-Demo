from django.conf.urls import patterns, include, url

from django.contrib import admin

from .views import Index, Form, PartialView

admin.autodiscover()

# partials use only one view class
# template_name overrides done in here for each
partial_patterns = patterns('',
    url(r'^hero.html$', PartialView.as_view(template_name='hero.html'), name='hero'),
    url(r'^list.html$', PartialView.as_view(template_name='list.html'), name='list'),
    url(r'^product.html$', PartialView.as_view(template_name='product.html'), name='product'),
    url(r'^form.html$', Form.as_view(), name='form'),
)

urlpatterns = patterns('',
    url(r'^$', Index.as_view(), name='index'),
    url(r'^products/', include('products.urls'), name='products'),
    url(r'^includes/', include(partial_patterns, namespace='partials')),

    url(r'^admin/', include(admin.site.urls), name='admin'),
)
