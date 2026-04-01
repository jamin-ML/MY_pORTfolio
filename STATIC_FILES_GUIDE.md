# Portfolio Static Files Structure

## CSS Files (`/static/css/`)

### 1. **base.css** 
   - Global styles and color variables
   - Header, navigation, footer
   - Background elements (binary rain, code snippets, left image)
   - Chat modal styles
   - Layout foundations

### 2. **components.css**
   - Reusable components
   - Cards and skill tags
   - Blog cards
   - Contact items
   - Generic element styling

### 3. **home.css**
   - Hero section styles
   - Landing page specific styling
   - Responsive adjustments for home

### 4. **about.css**
   - About section layout
   - Experience and education items
   - Achievements grid
   - About-specific components

### 5. **skills.css**
   - Skills grid and categories
   - Skill tag styling
   - Skills page layout

### 6. **blog.css**
   - Blog grid layout
   - Blog card styling
   - Blog page specific styles

### 7. **contact.css**
   - Contact form styling
   - Contact items layout
   - Form inputs and buttons

### 8. **responsive.css**
   - All media queries (@1024px, @768px, @600px, @400px)
   - Mobile-first responsive adjustments
   - Breakpoint-specific styling

## JavaScript Files (`/static/js/`)

### 1. **script.js**
   - Core functionality
   - Page navigation
   - Chat modal toggle
   - Form validation
   - Scroll to top
   - Keyboard shortcuts
   - Event listeners

### 2. **binary-rain.js**
   - Binary rain animation
   - Canvas drawing
   - Color cycling
   - Resize handling
   - Performance optimization

## Color Variables (CSS)

```
--bg-deep-charcoal:      #0D1117
--text-pale-green:       #B9FFB9
--accent-matrix-green:   #00FF41
--glow-color:            rgba(0, 255, 65, 0.4)
--border-color:          rgba(0, 255, 65, 0.2)
```

## How to Link in HTML

```html
{% load static %}

<!-- CSS Files -->
<link rel="stylesheet" href="{% static 'css/base.css' %}">
<link rel="stylesheet" href="{% static 'css/components.css' %}">
<link rel="stylesheet" href="{% static 'css/home.css' %}">
<link rel="stylesheet" href="{% static 'css/about.css' %}">
<link rel="stylesheet" href="{% static 'css/skills.css' %}">
<link rel="stylesheet" href="{% static 'css/blog.css' %}">
<link rel="stylesheet" href="{% static 'css/contact.css' %}">
<link rel="stylesheet" href="{% static 'css/responsive.css' %}">

<!-- JavaScript Files -->
<script src="{% static 'js/binary-rain.js' %}"></script>
<script src="{% static 'js/script.js' %}"></script>
```

## File Organization Benefits

1. **Separation of Concerns** - Each page/component has its own CSS
2. **Maintainability** - Easy to find and update specific styles
3. **Reusability** - Components.css covers shared elements
4. **Performance** - Can lazy-load page-specific CSS
5. **DRY Principle** - CSS variables reduce duplication
6. **Mobile-First** - Responsive styles centralized in responsive.css
7. **Collaboration** - Multiple developers can work on different pages

## Static Files Checklist

- ✅ base.css (Global styles)
- ✅ components.css (Reusable components)
- ✅ home.css (Home page)
- ✅ about.css (About page)
- ✅ skills.css (Skills page)
- ✅ blog.css (Blog page)
- ✅ contact.css (Contact page)
- ✅ responsive.css (Media queries)
- ✅ script.js (Main functionality)
- ✅ binary-rain.js (Animations)

## Next Steps

1. Update base.html to import static files
2. Remove inline styles from base.html
3. Test all pages for styling consistency
4. Configure Django STATIC_ROOT and STATIC_URL in settings.py
5. Run `python manage.py collectstatic` in production
