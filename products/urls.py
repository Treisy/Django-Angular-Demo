from django.conf.urls import patterns, url

from .views import ProductCRUDView, ProductImageCRUDView

urlpatterns = patterns('',
    url(r'^$', ProductCRUDView.as_view(), name='product_api'),
    url(r'^img/$', ProductImageCRUDView.as_view(), name='image_api'),
)
