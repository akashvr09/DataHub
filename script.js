// Custom Cursor
const cursor = document.querySelector(".custom-cursor")
const cursorGlow = document.querySelector(".cursor-glow")

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px"
  cursor.style.top = e.clientY + "px"
  cursorGlow.style.left = e.clientX - 20 + "px"
  cursorGlow.style.top = e.clientY - 20 + "px"
})

// Cursor hover effects
document.querySelectorAll("a, button, .content-card").forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(1.5)"
    cursor.style.borderColor = "#8b5cf6"
  })

  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)"
    cursor.style.borderColor = "#3b82f6"
  })
})

// Import GSAP and ScrollTrigger
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger)

// Developer Welcome Popup
const welcomePopup = document.getElementById("welcomePopup")
const closePopup = document.getElementById("closePopup")
const countdownElement = document.getElementById("countdown")

// Check if popup has been shown before
const hasSeenPopup = localStorage.getItem("hasSeenWelcomePopup")

if (!hasSeenPopup) {
  // Show popup after a short delay
  setTimeout(() => {
    welcomePopup.classList.add("active")
  }, 500)

  // Countdown timer
  let timeLeft = 10
  const countdownInterval = setInterval(() => {
    timeLeft--
    countdownElement.textContent = timeLeft

    if (timeLeft <= 0) {
      clearInterval(countdownInterval)
      closeWelcomePopup()
    }
  }, 1000)

  // Close popup function
  function closeWelcomePopup() {
    welcomePopup.classList.remove("active")
    localStorage.setItem("hasSeenWelcomePopup", "true")
  }

  // Close button click
  closePopup.addEventListener("click", () => {
    clearInterval(countdownInterval)
    closeWelcomePopup()
  })

  // Close on overlay click
  welcomePopup.addEventListener("click", (e) => {
    if (e.target === welcomePopup) {
      clearInterval(countdownInterval)
      closeWelcomePopup()
    }
  })
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const offset = 90
      const targetPosition = target.offsetTop - offset
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Navbar hide/show on scroll
let lastScroll = 0
const navbar = document.querySelector(".navbar")

window.addEventListener("scroll", () => {
  const currentScroll = window.pageYOffset

  if (currentScroll <= 0) {
    navbar.style.transform = "translateY(0)"
    return
  }

  if (currentScroll > lastScroll && currentScroll > 100) {
    navbar.style.transform = "translateY(-100%)"
  } else {
    navbar.style.transform = "translateY(0)"
  }

  lastScroll = currentScroll
})

// Developer name sparkle effect
const developerName = document.getElementById("developerName")

if (developerName) {
  developerName.addEventListener("click", function (e) {
    e.preventDefault()

    // Create sparkles
    for (let i = 0; i < 12; i++) {
      const sparkle = document.createElement("div")
      sparkle.className = "sparkle"

      const rect = this.getBoundingClientRect()
      const x = rect.left + rect.width / 2
      const y = rect.top + rect.height / 2

      sparkle.style.left = x + "px"
      sparkle.style.top = y + "px"

      const angle = (Math.PI * 2 * i) / 12
      const distance = 50
      const tx = Math.cos(angle) * distance
      const ty = Math.sin(angle) * distance

      sparkle.style.setProperty("--tx", tx + "px")
      sparkle.style.setProperty("--ty", ty + "px")

      document.body.appendChild(sparkle)

      setTimeout(() => sparkle.remove(), 800)
    }

    // Open portfolio link
    setTimeout(() => {
      window.open(this.href, "_blank")
    }, 300)
  })
}

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all content sections
document.querySelectorAll(".content-section").forEach((section) => {
  section.style.opacity = "0"
  section.style.transform = "translateY(30px)"
  section.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  observer.observe(section)
})

// Card stagger animation
document.querySelectorAll(".content-grid").forEach((grid) => {
  const cards = grid.querySelectorAll(".content-card")
  cards.forEach((card, index) => {
    card.style.opacity = "0"
    card.style.transform = "translateY(20px)"
    card.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`

    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    cardObserver.observe(card)
  })
})

console.log("[v0] ETL Testing Study Resource initialized with all features")
