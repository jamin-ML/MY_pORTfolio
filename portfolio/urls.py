from django.urls import path
from django.contrib.auth import views as auth_views
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
    path('projects/', views.projects_view, name='projects'),
    path('blog/', views.blog_list, name='blog_list'),
    path('blog/<slug:slug>/', views.blog_detail, name='blog_detail'),
    path('contact/', views.contact, name='contact'),
    
    # Dashboard URLs
    path('dashboard/', views.dashboard, name='dashboard'),
    
    # Blog Dashboard
    path('dashboard/blogs/', views.blog_dashboard, name='blog_dashboard'),
    path('dashboard/blogs/create/', views.blog_create, name='blog_create'),
    path('dashboard/blogs/<int:pk>/edit/', views.blog_edit, name='blog_edit'),
    path('dashboard/blogs/<int:pk>/delete/', views.blog_delete, name='blog_delete'),
    
    # Project Dashboard
    path('dashboard/projects/', views.project_dashboard, name='project_dashboard'),
    path('dashboard/projects/create/', views.project_create, name='project_create'),
    path('dashboard/projects/<int:pk>/edit/', views.project_edit, name='project_edit'),
    path('dashboard/projects/<int:pk>/delete/', views.project_delete, name='project_delete'),
]
