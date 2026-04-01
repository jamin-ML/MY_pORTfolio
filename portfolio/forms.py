from django import forms
from .models import ContactMessage, Blog, Project


class ContactForm(forms.ModelForm):
    class Meta:
        model = ContactMessage
        fields = ('name', 'email', 'message')
        widgets = {
            'message': forms.Textarea(attrs={'rows':4}),
        }


class BlogForm(forms.ModelForm):
    # Rich text editor for content with code snippet support
    content = forms.CharField(
        widget=forms.Textarea(attrs={
            'rows': 15,
            'class': 'tinymce-editor',
            'placeholder': 'Write your blog content here... You can use formatting, code blocks, etc.',
        }),
        help_text='Supports formatting, code snippets, links, and more through the editor toolbar.'
    )
    
    class Meta:
        model = Blog
        fields = ('title', 'content', 'cover')
        widgets = {
            'title': forms.TextInput(attrs={
                'placeholder': 'Blog post title',
                'class': 'form-control',
            }),
        }


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = ('title', 'description', 'image', 'link')
