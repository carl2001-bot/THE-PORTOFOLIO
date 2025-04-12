document.addEventListener("DOMContentLoaded", function () {
  // Dynamic Greeting Based on Time of Day
  const greetingElement = document.getElementById("greeting");
  const now = new Date();
  const hour = now.getHours();
  let greeting = "Hello";

  if (hour < 12) {
    greeting = "Good morning";
  } else if (hour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  if (greetingElement) {
    greetingElement.textContent = greeting + ", I'm Carleen";
  }

  // Theme Toggle
  const toggleThemeButton = document.getElementById("toggle-theme");
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

  // Check for saved theme preference or use preferred color scheme
  const currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark" || (!currentTheme && prefersDarkScheme.matches)) {
    document.body.classList.add("dark-mode");
    toggleThemeButton.textContent = "Light Mode";
  }

  toggleThemeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    const theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("theme", theme);
    toggleThemeButton.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
  });

  // Navigation and Section Switching
  const navLinks = document.querySelectorAll("nav a[data-target]");
  const sections = document.querySelectorAll(".section");

  function showSection(targetId) {
    sections.forEach(section => {
      section.classList.remove("active");
    });
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.classList.add("active");
      // Update URL without page reload
      history.pushState(null, "", `#${targetId}`);
    }
  }

  navLinks.forEach(link => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("data-target");
      showSection(targetId);
    });
  });

  // Handle initial load based on hash
  const initialHash = window.location.hash.substring(1);
  const validSections = Array.from(sections).map(section => section.id);
  const initialSection = validSections.includes(initialHash) ? initialHash : "home";
  showSection(initialSection);

  // Handle browser back/forward navigation
  window.addEventListener("popstate", function () {
    const hash = window.location.hash.substring(1);
    const validSections = Array.from(sections).map(section => section.id);
    const targetSection = validSections.includes(hash) ? hash : "home";
    showSection(targetSection);
  });

  // Project Filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");
      
      const filter = button.getAttribute("data-filter");
      
      projects.forEach(project => {
        const category = project.getAttribute("data-category");
        
        if (filter === "all" || category === filter) {
          project.style.display = "block";
        } else {
          project.style.display = "none";
        }
      });
    });
  });

  // Blog Posts
  const blogPosts = [
    {
      title: "Optimizing Website Load Times",
      content: "Practical tips for improving website performance including image optimization, caching strategies, and code minification.",
      date: "May 15, 2024",
      tags: ["performance", "web"]
    },
    {
      title: "CSS Grid vs Flexbox",
      content: "When to use CSS Grid and when to use Flexbox for your layout needs with practical examples.",
      date: "June 2, 2024",
      tags: ["css", "layout"]
    },
    {
      title: "Getting Started with JavaScript",
      content: "A beginner's guide to JavaScript fundamentals including variables, functions, and DOM manipulation.",
      date: "April 10, 2024",
      tags: ["javascript", "beginner"]
    }
  ];

  const blogContainer = document.getElementById("blog-list");
  const searchInput = document.getElementById("search");

  function renderBlogPosts(posts) {
    blogContainer.innerHTML = "";
    
    posts.forEach(post => {
      const blogPost = document.createElement("div");
      blogPost.className = "blog-post";
      blogPost.innerHTML = `
        <h3>${post.title}</h3>
        <small>${post.date}</small>
        <p>${post.content}</p>
        <div class="tags">${post.tags.map(tag => `<span class="tag">${tag}</span>`).join("")}</div>
      `;
      blogContainer.appendChild(blogPost);
    });
  }

  // Initial render
  renderBlogPosts(blogPosts);

  // Search functionality
  searchInput.addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredPosts = blogPosts.filter(post => 
      post.title.toLowerCase().includes(searchTerm) || 
      post.content.toLowerCase().includes(searchTerm) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
    renderBlogPosts(filteredPosts);
  });

  // Contact Form Validation
  const contactForm = document.getElementById("contact-form");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const nameError = document.getElementById("name-error");
  const emailError = document.getElementById("email-error");
  const messageError = document.getElementById("message-error");
  const formSuccess = document.getElementById("form-success");

  function validateName() {
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required";
      nameError.style.display = "block";
      return false;
    } else if (nameInput.value.trim().length < 2) {
      nameError.textContent = "Name must be at least 2 characters";
      nameError.style.display = "block";
      return false;
    } else {
      nameError.style.display = "none";
      return true;
    }
  }

  function validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailInput.value.trim() === "") {
      emailError.textContent = "Email is required";
      emailError.style.display = "block";
      return false;
    } else if (!emailRegex.test(emailInput.value)) {
      emailError.textContent = "Please enter a valid email";
      emailError.style.display = "block";
      return false;
    } else {
      emailError.style.display = "none";
      return true;
    }
  }

  function validateMessage() {
    if (messageInput.value.trim() === "") {
      messageError.textContent = "Message is required";
      messageError.style.display = "block";
      return false;
    } else if (messageInput.value.trim().length < 10) {
      messageError.textContent = "Message must be at least 10 characters";
      messageError.style.display = "block";
      return false;
    } else {
      messageError.style.display = "none";
      return true;
    }
  }

  // Real-time validation
  nameInput.addEventListener("input", validateName);
  emailInput.addEventListener("input", validateEmail);
  messageInput.addEventListener("input", validateMessage);

  // Form submission
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault();
    
    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isMessageValid = validateMessage();
    
    if (isNameValid && isEmailValid && isMessageValid) {
      // In a real application, you would send the form data to a server here
      formSuccess.textContent = "Thank you for your message! I'll get back to you soon.";
      formSuccess.style.display = "block";
      contactForm.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        formSuccess.style.display = "none";
      }, 5000);
    }
  });
});
      

    
