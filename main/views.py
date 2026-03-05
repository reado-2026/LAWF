from django.shortcuts import render

def home(request):
    return render(request, 'main/index.html')

def gallery(request):
    return render(request, 'main/gallery.html')
