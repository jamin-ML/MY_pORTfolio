# Django Portfolio Skeleton

This creates a minimal Django portfolio app with models for `Project`, `Blog`, `BlogImage`, and `ContactMessage`.

Quick start:

1. Create a virtualenv and install deps:

```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Run migrations and create superuser:

```bash
python manage.py migrate
python manage.py createsuperuser
```

3. Run dev server:

```bash
python manage.py runserver
```

Uploaded media will be served from `/media/` in DEBUG mode.

Project uploads: create and edit `Project` entries via the Django admin dashboard at `/admin/` (superuser or staff required). Blog posts and images can also be managed in the admin.
# MY_pORTfolio
