const navbar = document.getElementById("mainNavbar");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileOverlay = document.getElementById("mobileOverlay");
const loginBtn = document.getElementById("loginBtn");
const logo = document.getElementById("logo");
const menuItems = document.querySelectorAll(".menu-item");
const mobileCta = document.getElementById("mobileCta");

let isMenuOpen = false;

// --- INITIAL ENTRANCE ---
window.addEventListener("load", () => {
  const tl = gsap.timeline();
  tl.to(logo, { opacity: 1, x: 0, duration: 1, ease: "expo.out" })
    .to(
      menuItems,
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    )
    .to(
      loginBtn,
      { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
      "-=0.4"
    );
});

// --- SCROLL HANDLING ---
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// --- CORE MENU TOGGLE ---
function toggleMenu() {
  if (!isMenuOpen) {
    openMenu();
  } else {
    closeMenu();
  }
}

function openMenu() {
  isMenuOpen = true;
  document.body.classList.add("no-scroll");

  const burgerLines = {
    top: document.querySelector(".line-top"),
    mid: document.querySelector(".line-mid"),
    bot: document.querySelector(".line-bot"),
  };

  const tl = gsap.timeline();

  // 1. Icon Animation
  tl.to(
    burgerLines.top,
    {
      attr: { d: "M 30,30 L 70,70" },
      duration: 0.4,
      ease: "power2.inOut",
    },
    0
  );
  tl.to(burgerLines.mid, { opacity: 0, duration: 0.2 }, 0);
  tl.to(
    burgerLines.bot,
    {
      attr: { d: "M 30,70 L 70,30" },
      duration: 0.4,
      ease: "power2.inOut",
    },
    0
  );

  // 2. Overlay Animation
  gsap.set(mobileOverlay, { visibility: "visible" });
  tl.to(mobileOverlay, { y: 0, duration: 0.8, ease: "expo.inOut" }, 0);
  tl.to(
    ".mobile-item",
    {
      opacity: 1,
      y: 0,
      stagger: 0.08,
      duration: 0.6,
      ease: "power3.out",
    },
    0.4
  );
  tl.to(
    mobileCta,
    { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    0.8
  );
}

function closeMenu() {
  if (!isMenuOpen) return;
  isMenuOpen = false;
  document.body.classList.remove("no-scroll");

  const burgerLines = {
    top: document.querySelector(".line-top"),
    mid: document.querySelector(".line-mid"),
    bot: document.querySelector(".line-bot"),
  };

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.set(mobileOverlay, { visibility: "hidden" });
    },
  });

  // 1. Icon Reset
  tl.to(
    burgerLines.top,
    { attr: { d: "M 20,30 H 80" }, duration: 0.4, ease: "power2.inOut" },
    0
  );
  tl.to(burgerLines.mid, { opacity: 1, duration: 0.4 }, 0);
  tl.to(
    burgerLines.bot,
    { attr: { d: "M 20,70 H 80" }, duration: 0.4, ease: "power2.inOut" },
    0
  );

  // 2. Overlay Reset
  tl.to(mobileCta, { opacity: 0, y: 20, duration: 0.3 }, 0);
  tl.to(
    ".mobile-item",
    { opacity: 0, y: 20, duration: 0.3, ease: "power2.in" },
    0
  );
  tl.to(mobileOverlay, { y: "-100%", duration: 0.8, ease: "expo.inOut" }, 0.1);

  // Reset dropdowns
  document
    .querySelectorAll(".mobile-dropdown")
    .forEach((d) => (d.style.height = "0px"));
  document
    .querySelectorAll(".mobile-link")
    .forEach((l) => l.classList.remove("active"));
}

// --- EVENT LISTENERS ---
hamburgerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  toggleMenu();
});

// Mobile Dropdown Accordion
document.querySelectorAll(".toggle-mobile-dropdown").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const dropdown = item.nextElementSibling;
    const isOpen = item.classList.contains("active");

    if (isOpen) {
      item.classList.remove("active");
      dropdown.style.height = "0px";
    } else {
      item.classList.add("active");
      dropdown.style.height = dropdown.scrollHeight + "px";
    }
  });
});

// Links click closes menu
document
  .querySelectorAll(
    ".mobile-link:not(.toggle-mobile-dropdown), .mobile-dropdown a"
  )
  .forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

// ESC Key
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});

// Close on Resize
window.addEventListener("resize", () => {
  if (window.innerWidth >= 1024 && isMenuOpen) closeMenu();
});
