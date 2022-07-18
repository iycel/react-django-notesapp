from django.urls import path
from api.views import getRoutes, getNotes, getNote

urlpatterns = [
    path('', getRoutes, name='routes'),
    path('notes/', getNotes, name='notes'),
    path('notes/<str:pk>/', getNote, name='note'),
    # path('notes/<str:pk>/update/', updateNote, name='update-note'),
    # path('notes/add/', addNote, name='add-note'),
    # path('notes/<str:pk>/delete/', deleteNote, name='delete-note')
]
