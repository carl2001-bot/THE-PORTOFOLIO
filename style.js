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
        greetingElement.textContent = greeting;
    }

    // 🌓 Dark Mode Toggle
    const toggleThemeButton = document.getElementById("toggle-theme");
    toggleThemeButton.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        toggleThemeButton.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
    });

    // Navigation and Smooth Section Switching
    const navLinks = document.querySelectorAll("nav a[data-target]");
    const sections = document.querySelectorAll(".section");

    function showSection(targetId) {
        sections.forEach(section => section.classList.remove("active"));
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add("active");
        }
    }

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = link.getAttribute("data-target");
            showSection(targetId);
            history.pushState(null, "", #${targetId});
        });
    });

    // ⏪ Handle browser back/forward navigation
    window.addEventListener("popstate", function () {
        const targetId = location.hash.substring(1) || "home";
        showSection(targetId);
    });

    // Show home by default on page load
    const initialSection = location.hash.substring(1) || "home";
    showSection(initialSection);
});

// Show/hide sections manually based on hash
function showSection(sectionId) {
    const sections = document.querySelectorAll("section");
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? "block" : "none";
    });
}

// Hide home when viewing blog/contact
window.addEventListener("hashchange", function () {
    const hash = window.location.hash;
    const homeSection = document.getElementById("home");

    if (hash === "#blog" || hash === "#contact") {
        homeSection.style.display = "none";
    } else {
        homeSection.style.display = "block";
    }
});
