from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.views.decorators.http import require_http_methods
from .models import Project, Blog, BlogImage
from .forms import ContactForm, BlogForm, ProjectForm


def home(request):
    projects = Project.objects.order_by('-created')[:5]
    posts = Blog.objects.order_by('-created')[:5]
    return render(request, 'home.html', {'projects': projects, 'posts': posts})


def projects_view(request):
    projects = Project.objects.order_by('-created')
    return render(request, 'projects.html', {'projects': projects})


def blog_list(request):
    posts = Blog.objects.order_by('-created')
    return render(request, 'blog_list.html', {'posts': posts})


def blog_detail(request, slug):
    post = get_object_or_404(Blog, slug=slug)
    return render(request, 'blog_detail.html', {'post': post})


def contact(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('contact')
    else:
        form = ContactForm()
    return render(request, 'contact.html', {'form': form})


# Dashboard Views
@login_required(login_url='login')
def dashboard(request):
    blogs_count = Blog.objects.count()
    projects_count = Project.objects.count()
    recent_blogs = Blog.objects.order_by('-created')[:5]
    recent_projects = Project.objects.order_by('-created')[:5]
    
    context = {
        'blogs_count': blogs_count,
        'projects_count': projects_count,
        'recent_blogs': recent_blogs,
        'recent_projects': recent_projects,
    }
    return render(request, 'dashboard/dashboard.html', context)


# Blog Dashboard Views
@login_required(login_url='login')
def blog_dashboard(request):
    blogs = Blog.objects.order_by('-created')
    context = {'blogs': blogs}
    return render(request, 'dashboard/blog_dashboard.html', context)


@login_required(login_url='login')
def blog_create(request):
    if request.method == 'POST':
        form = BlogForm(request.POST, request.FILES)
        if form.is_valid():
            blog = form.save()
            messages.success(request, f'Blog "{blog.title}" created successfully!')
            return redirect('blog_dashboard')
    else:
        form = BlogForm()
    return render(request, 'dashboard/blog_form.html', {'form': form, 'title': 'Create Blog'})


@login_required(login_url='login')
def blog_edit(request, pk):
    blog = get_object_or_404(Blog, pk=pk)
    if request.method == 'POST':
        form = BlogForm(request.POST, request.FILES, instance=blog)
        if form.is_valid():
            form.save()
            messages.success(request, f'Blog "{blog.title}" updated successfully!')
            return redirect('blog_dashboard')
    else:
        form = BlogForm(instance=blog)
    return render(request, 'dashboard/blog_form.html', {'form': form, 'blog': blog, 'title': 'Edit Blog'})


@login_required(login_url='login')
@require_http_methods(['POST'])
def blog_delete(request, pk):
    blog = get_object_or_404(Blog, pk=pk)
    title = blog.title
    blog.delete()
    messages.success(request, f'Blog "{title}" deleted successfully!')
    return redirect('blog_dashboard')


# Project Dashboard Views
@login_required(login_url='login')
def project_dashboard(request):
    projects = Project.objects.order_by('-created')
    context = {'projects': projects}
    return render(request, 'dashboard/project_dashboard.html', context)


@login_required(login_url='login')
def project_create(request):
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES)
        if form.is_valid():
            project = form.save()
            messages.success(request, f'Project "{project.title}" created successfully!')
            return redirect('project_dashboard')
    else:
        form = ProjectForm()
    return render(request, 'dashboard/project_form.html', {'form': form, 'title': 'Create Project'})


@login_required(login_url='login')
def project_edit(request, pk):
    project = get_object_or_404(Project, pk=pk)
    if request.method == 'POST':
        form = ProjectForm(request.POST, request.FILES, instance=project)
        if form.is_valid():
            form.save()
            messages.success(request, f'Project "{project.title}" updated successfully!')
            return redirect('project_dashboard')
    else:
        form = ProjectForm(instance=project)
    return render(request, 'dashboard/project_form.html', {'form': form, 'project': project, 'title': 'Edit Project'})


@login_required(login_url='login')
@require_http_methods(['POST'])
def project_delete(request, pk):
    project = get_object_or_404(Project, pk=pk)
    title = project.title
    project.delete()
    messages.success(request, f'Project "{title}" deleted successfully!')
    return redirect('project_dashboard')
