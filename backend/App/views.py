from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views import View
from .models import Usuario, Favoritos
from django.contrib.auth.hashers import make_password, check_password
import json


# Registrar un nuevo usuario
@csrf_exempt
def registrar_usuario(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)

            nombre = data.get('nombre')
            usuario = data.get('usuario')
            email = data.get('email')
            contrasena = data.get('contrasena')

            if Usuario.objects.filter(usuario=usuario).exists():
                return JsonResponse({'error': 'El usuario ya existe'}, status=400)

            if Usuario.objects.filter(email=email).exists():
                return JsonResponse({'error': 'El email ya está registrado'}, status=400)
            
            # Hash the password before saving
            hashed_password = make_password(contrasena)

            nuevo_id = (Usuario.objects.order_by('-id').first().id + 1) if Usuario.objects.exists() else 1

            nuevo_usuario = Usuario(
                id=nuevo_id,
                nombre=nombre,
                usuario=usuario,
                email=email,
                contrasena=hashed_password
            )
            nuevo_usuario.save()

            return JsonResponse({'mensaje': 'Usuario registrado exitosamente'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

# Iniciar sesion
@csrf_exempt
def login(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            usuario_input = data.get('usuario')
            contrasena = data.get('contrasena')

            # Buscar por nombre de usuario o correo electrónico
            try:
                user = Usuario.objects.get(usuario=usuario_input)
            except Usuario.DoesNotExist:
                try:
                    user = Usuario.objects.get(email=usuario_input)
                except Usuario.DoesNotExist:
                    return JsonResponse({'error': 'Usuario o correo no encontrado'}, status=401)

            # Validar contraseña manualmente
            if check_password(contrasena, user.contrasena):
                return JsonResponse({
                    'message': 'Login exitoso',
                    'usuario': {
                        'id': user.id,
                        'nombre': user.nombre,
                        'usuario': user.usuario,
                        'email': user.email,
                        'contrasena': user.contrasena}
                })
                
            else:
                return JsonResponse({'error': 'Contraseña incorrecta'}, status=401)

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Datos inválidos'}, status=400)

    return JsonResponse({'error': 'Método no permitido'}, status=405)

@csrf_exempt
def guardar_favorito(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            usuario_id = data.get('usuario')
            video_id = data.get('video_id')
            title = data.get('title')
            thumbnail = data.get('thumbnail')

            if not all([usuario_id, video_id, title, thumbnail]):
                return JsonResponse({'error': 'Datos incompletos'}, status=400)

            usuario = Usuario.objects.get(id=usuario_id)

            favorito, created = Favoritos.objects.get_or_create(
                video_id=video_id,
                user=usuario,
                defaults={'title': title, 'thumbnail': thumbnail}
            )

            if not created:
                return JsonResponse({'message': 'Ya existe'}, status=200)

            return JsonResponse({'message': 'Guardado'}, status=201)
        except Usuario.DoesNotExist:
            return JsonResponse({'error': 'Usuario no encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

@csrf_exempt
def obtener_favoritos(request):
    if request.method == 'GET':
        usuario_id = request.GET.get('usuario')
        if not usuario_id:
            return JsonResponse({'error': 'Falta el ID del usuario'}, status=400)

        favoritos = Favoritos.objects.filter(user_id=usuario_id)
        data = [
            {
                'video_id': fav.video_id,
                'title': fav.title,
                'thumbnail': fav.thumbnail,
            }
            for fav in favoritos
        ]
        return JsonResponse(data, safe=False)

@csrf_exempt
def eliminar_favorito(request):
    if request.method == 'DELETE':
        try:
            data = json.loads(request.body)
            video_id = data.get('video_id')
            usuario_id = data.get('usuario')

            if not all([video_id, usuario_id]):
                return JsonResponse({'error': 'Faltan datos'}, status=400)

            favorito = Favoritos.objects.get(video_id=video_id, user_id=usuario_id)
            favorito.delete()
            return JsonResponse({'message': 'Eliminado'}, status=200)
        except Favoritos.DoesNotExist:
            return JsonResponse({'error': 'No encontrado'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)