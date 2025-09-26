const modal = document.getElementById("sizeChartModal");
const btn = document.querySelector(".chart-btn");
const span = document.querySelector(".close");

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const minusBtn = document.querySelector(".qty-controls .qty-btn:first-child");
  const plusBtn = document.querySelector(".qty-controls .qty-btn:last-child");
  const qtyInput = document.querySelector(".qty-input");

  minusBtn.addEventListener("click", () => {
    let currentValue = parseInt(qtyInput.value, 10);
    if (currentValue > 1) {
      qtyInput.value = currentValue - 1;
    }
  });

  plusBtn.addEventListener("click", () => {
    let currentValue = parseInt(qtyInput.value, 10);
    qtyInput.value = currentValue + 1;
  });

  // Navbar toggle for mobile
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }
});

// Gallery view js -----------------

const gallery = document.getElementById("gallery");
const dots = document.querySelectorAll(".scroll-dot");
let currentSection = 0;

function scrollGallery(direction) {
  const cardWidth = 280 + 24; // card width + gap
  const scrollAmount = cardWidth * 2; // scroll 2 cards at a time

  if (direction === 1) {
    gallery.scrollBy({ left: scrollAmount, behavior: "smooth" });
  } else {
    gallery.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  }
}

function scrollToSection(index) {
  const cardWidth = 280 + 24;
  const scrollAmount = cardWidth * 2.5 * index;

  gallery.scrollTo({ left: scrollAmount, behavior: "smooth" });
  updateDots(index);
}

function updateDots(activeIndex) {
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === activeIndex);
  });
}

// Update dots based on scroll position
gallery.addEventListener("scroll", () => {
  const scrollLeft = gallery.scrollLeft;
  const cardWidth = 280 + 24;
  const section = Math.round(scrollLeft / (cardWidth * 2.5));

  if (section !== currentSection) {
    currentSection = Math.min(section, dots.length - 1);
    updateDots(currentSection);
  }
});

// Touch/swipe support for mobile
let isDown = false;
let startX;
let scrollLeftStart;

gallery.addEventListener("mousedown", (e) => {
  isDown = true;
  startX = e.pageX - gallery.offsetLeft;
  scrollLeftStart = gallery.scrollLeft;
});

gallery.addEventListener("mouseleave", () => {
  isDown = false;
});

gallery.addEventListener("mouseup", () => {
  isDown = false;
});

gallery.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - gallery.offsetLeft;
  const walk = (x - startX) * 2;
  gallery.scrollLeft = scrollLeftStart - walk;
});

// Intersection Observer for animation triggers
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animationDelay = "0s";
        entry.target.classList.add("fade-in");
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll(".product-card").forEach((card) => {
  observer.observe(card);
});
