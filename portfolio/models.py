from django.db import models
from django.utils.text import slugify


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    link = models.URLField(blank=True)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class Blog(models.Model):
    title = models.CharField(max_length=250)
    slug = models.SlugField(max_length=260, unique=True, blank=True)
    content = models.TextField()
    cover = models.ImageField(upload_to='blogs/', blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)[:250]
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class BlogImage(models.Model):
    blog = models.ForeignKey(Blog, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='blog_images/')

    def __str__(self):
        return f"Image for {self.blog.title}"


class ContactMessage(models.Model):
    name = models.CharField(max_length=120)
    email = models.EmailField()
    message = models.TextField()
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Message from {self.name} <{self.email}>"
