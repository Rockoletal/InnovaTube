from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views import View
from .models import Usuario
import json

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

            nuevo_id = (Usuario.objects.order_by('-id').first().id + 1) if Usuario.objects.exists() else 1

            nuevo_usuario = Usuario(
                id=nuevo_id,
                nombre=nombre,
                usuario=usuario,
                email=email,
                contrasena=contrasena
            )
            nuevo_usuario.save()

            return JsonResponse({'mensaje': 'Usuario registrado exitosamente'}, status=201)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    return JsonResponse({'error': 'Método no permitido'}, status=405)
