from django.contrib import admin
from .models import Project, Blog, BlogImage, ContactMessage


class BlogImageInline(admin.TabularInline):
    model = BlogImage
    extra = 1


@admin.register(Blog)
class BlogAdmin(admin.ModelAdmin):
    list_display = ('title', 'created')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [BlogImageInline]


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'created')


@admin.register(ContactMessage)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created')
