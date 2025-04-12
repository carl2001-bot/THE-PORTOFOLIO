// Dynamic greeting based on time of day
const greeting = document.getElementById("greeting");
const hour = new Date().getHours();
if (hour < 12) {
  greeting.textContent = "Good Morning 🌞";
} else if (hour < 18) {
  greeting.textContent = "Good Afternoon ☀️";
} else {
  greeting.textContent = "Good Evening 🌙";
}

// Theme toggle
document.getElementById('themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
});

// Load saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  document.body.classList.add('dark-mode');
}

// Form validation
document.getElementById('contactForm').addEventListener('submit', function (e) {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email.includes('@') || !message) {
    alert('Please fill all fields correctly.');
    e.preventDefault();
  } else {
    alert('Message sent successfully!');
  }
});





   
   
  
