from django.conf import settings
from django.conf.urls.static import static
from django.urls import path
from . import views

urlpatterns = [
    path('registrar_usuario/', views.registrar_usuario, name='registrar_usuario'),
    path('login/', views.login, name='login'), 
    path('guardar_favorito/', views.guardar_favorito, name='guardar_favorito'),
    path('obtener_favoritos/', views.obtener_favoritos, name='obtener_favoritos'),
    path('eliminar_favorito/', views.eliminar_favorito, name='eliminar_favorito'),
    path('recuperar_contrasena/', views.recuperar_contrasena, name='recuperar_contrasena'),
]