/* ============================
   PORTFOLIO - MAIN SCRIPT
   Core Functionality
   ============================ */

// ============================
// PAGE NAVIGATION
// ============================

function showPage(id) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show selected page
  const selectedPage = document.getElementById(id);
  if (selectedPage) {
    selectedPage.classList.add('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// ============================
// ABOUT MODAL FUNCTIONALITY
// ============================

function openAboutModal() {
  const modal = document.getElementById('aboutModal');
  if (modal) {
    modal.style.display = 'block';
  }
}

function closeAboutModal() {
  const modal = document.getElementById('aboutModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Close modal when clicking outside of it
document.addEventListener('click', function(event) {
  const modal = document.getElementById('aboutModal');
  if (modal && event.target === modal) {
    modal.style.display = 'none';
  }
});

// ============================
// PROJECT MODAL FUNCTIONALITY
// ============================

function openProjectModal(button) {
  const modal = document.getElementById('projectModal');
  const titleElement = document.getElementById('projectModalTitle');
  const descElement = document.getElementById('projectModalDescription');
  const linkElement = document.getElementById('projectModalLink');
  const title = button?.dataset?.title || 'Project Details';
  const description = button?.dataset?.description || '';
  const link = button?.dataset?.link || '';
  
  if (modal && titleElement && descElement && linkElement) {
    titleElement.textContent = title;
    descElement.textContent = description;
    linkElement.textContent = '';
    
    if (link) {
      const projectLink = document.createElement('a');
      projectLink.href = link;
      projectLink.target = '_blank';
      projectLink.rel = 'noopener noreferrer';
      projectLink.className = 'read-more';
      projectLink.style.display = 'inline-block';
      projectLink.style.color = '#00ff00';
      projectLink.style.textDecoration = 'none';
      projectLink.style.fontWeight = '500';
      projectLink.style.borderBottom = '2px solid #00ff00';
      projectLink.style.paddingBottom = '0.3rem';
      projectLink.textContent = 'View Full Project →';
      linkElement.appendChild(projectLink);
    }
    
    modal.style.display = 'block';
  }
}

function closeProjectModal() {
  const modal = document.getElementById('projectModal');
  if (modal) {
    modal.style.display = 'none';
  }
}

// Close project modal when clicking outside of it
document.addEventListener('click', function(event) {
  const modal = document.getElementById('projectModal');
  if (modal && event.target === modal) {
    modal.style.display = 'none';
  }
});

// ============================
// CHAT MODAL FUNCTIONALITY
// ============================

const N8N_WEBHOOK_URL = 'https://juma.app.n8n.cloud/webhook/portfolio';
const SESSION_ID = 'sess_' + Math.random().toString(36).slice(2, 10);
let visitorNotified = false;

function appendChatMessage(messages, text, options = {}) {
  const message = document.createElement('div');
  message.style.color = options.color || '#00FF41';
  message.style.marginBottom = '10px';
  if (options.textAlign) {
    message.style.textAlign = options.textAlign;
  }
  if (options.textShadow) {
    message.style.textShadow = options.textShadow;
  }
  message.textContent = text;
  messages.appendChild(message);
  messages.scrollTop = messages.scrollHeight;
  return message;
}

async function getChatReply(messageText) {
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event_type: 'chat_message',
        session_id: SESSION_ID,
        message: messageText,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      return 'AI: Sorry, the chat service is temporarily unavailable.';
    }

    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return 'AI: ' + (data.reply || data.message || data.text || 'I received your message, but could not generate a response.');
    }

    const text = await response.text();
    if (!text.trim()) {
      return 'AI: I received your message, but the webhook did not return a response.';
    }

    if (text.startsWith('AI:')) {
      return text;
    }

    return 'AI: ' + text;
  } catch (error) {
    console.error('Chat webhook error:', error);
    return 'AI: Sorry, I could not reach the chat service right now.';
  }
}

function toggleChat() {
  const modal = document.getElementById('chatModal');
  if (modal) {
    const isOpen = modal.style.display === 'block';
    modal.style.display = isOpen ? 'none' : 'block';

    // Fire visitor email only once when chat first opens
    if (!isOpen && !visitorNotified) {
      visitorNotified = true;
      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_type: 'new_visitor',
          session_id: SESSION_ID,
          page: window.location.href,
          timestamp: new Date().toISOString()
        })
      }).catch(() => {});
    }
  }
}

async function sendMessage() {
  const input = document.getElementById('chatInput');
  const messages = document.getElementById('chatMessages');

  if (!input || !messages) return;

  const messageText = input.value.trim();
  if (messageText) {
    appendChatMessage(messages, 'You: ' + messageText, { 
      color: '#ffffff',
      textAlign: 'right' 
    });
    input.value = '';

    const typingMsg = appendChatMessage(messages, 'AI: Thinking...', {
      textShadow: '0 0 10px rgba(0, 255, 65, 0.4)',
    });

    typingMsg.textContent = await getChatReply(messageText);
  }
}

// Allow sending message with Enter key
document.addEventListener('DOMContentLoaded', function() {
  const chatInput = document.getElementById('chatInput');
  if (chatInput) {
    chatInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
        sendMessage();
      }
    });
  }
});

// ============================
// SCROLL TO TOP BUTTON
// ============================

const scrollTopBtn = document.querySelector('.scroll-top');

globalThis.addEventListener('scroll', () => {
  if (globalThis.scrollY > 300) {
    if (scrollTopBtn) scrollTopBtn.style.display = 'block';
    return;
  }

  if (scrollTopBtn) {
    scrollTopBtn.style.display = 'none';
  }
});

function scrollToTop() {
  globalThis.scrollTo({ top: 0, behavior: 'smooth' });
}

// ============================
// MOBILE MENU TOGGLE (if needed)
// ============================

function toggleMobileMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  if (navLinks) {
    navLinks.classList.toggle('active');
    if (menuToggle) {
      const isOpen = navLinks.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  }
}

// ============================
// SMOOTH SCROLL FOR ANCHORS
// ============================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// ============================
// LAZY LOAD IMAGES
// ============================

if ('IntersectionObserver' in globalThis) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// ============================
// FORM VALIDATION
// ============================

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

function handleFormSubmit(formElement) {
  if (!formElement) return;
  
  formElement.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = formElement.querySelector('input[name="name"]')?.value?.trim();
    const email = formElement.querySelector('input[name="email"]')?.value?.trim();
    const message = formElement.querySelector('textarea[name="message"]')?.value?.trim();
    
    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all fields');
      return;
    }
    
    if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // If form has Django CSRF token, submit normally
    // Otherwise, you can handle it with AJAX
    if (formElement.querySelector('[name="csrfmiddlewaretoken"]')) {
      formElement.submit();
    }
  });
}

// ============================
// INITIALIZE ON PAGE LOAD
// ============================

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');

  if (menuToggle && navLinks) {
    navItems.forEach(link => {
      link.addEventListener('click', () => {
        if (globalThis.innerWidth <= 768) {
          navLinks.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // Initialize tooltips if Bootstrap is available
  if (typeof bootstrap !== 'undefined') {
    const tooltipTriggerList = Array.prototype.slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.map(
      tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }
  
  // Mark current page as active in navigation
  const currentPage = globalThis.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });
});

// ============================
// DARK MODE TOGGLE (Optional)
// ============================

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
}

// Load dark mode preference from storage
document.addEventListener('DOMContentLoaded', function() {
  const darkMode = localStorage.getItem('darkMode');
  if (darkMode === 'true') {
    document.body.classList.add('dark-mode');
  }
});

// ============================
// KEYBOARD SHORTCUTS
// ============================

document.addEventListener('keydown', function(event) {
  // Ctrl/Cmd + K to open chat
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    toggleChat();
  }
  
  // Escape to close chat
  if (event.key === 'Escape') {
    const modal = document.getElementById('chatModal');
    if (modal?.style.display === 'block') {
      modal.style.display = 'none';
    }
  }
});

// ============================
// PERFORMANCE & DEBUG
// ============================

console.log('%c Portfolio Loaded Successfully! 🚀', 'color: #00FF41; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px rgba(0, 255, 65, 0.4);');
