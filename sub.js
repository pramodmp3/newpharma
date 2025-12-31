document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const navLinks = document.querySelectorAll(".nav-link");

  /* --- MOBILE MENU TOGGLE (Hamburger) --- */
  hamburger.addEventListener("click", () => {
    // Toggle 'active' class on hamburger and main menu
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");

    // Close all submenus when the main mobile menu is toggled closed
    if (!navMenu.classList.contains("active")) {
      dropdownToggles.forEach((toggle) => {
        const submenu = toggle.closest(".nav-item").querySelector(".submenu");
        toggle.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
        if (submenu) {
          submenu.classList.remove("active");
        }
      });
    }
  });

  /* --- DROPDOWN TOGGLE (Desktop & Mobile) --- */
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent the click from bubbling up

      const parentItem = toggle.closest(".nav-item");
      const currentSubmenu = parentItem.querySelector(".submenu");
      const isActive = toggle.classList.contains("active");

      // Close all *other* currently open submenus
      dropdownToggles.forEach((otherToggle) => {
        const otherSubmenu = otherToggle
          .closest(".nav-item")
          .querySelector(".submenu");
        // Only close if it's not the current one being clicked
        if (
          otherToggle !== toggle &&
          otherToggle.classList.contains("active")
        ) {
          otherToggle.classList.remove("active");
          otherToggle.setAttribute("aria-expanded", "false");
          if (otherSubmenu) {
            otherSubmenu.classList.remove("active");
          }
        }
      });

      // Toggle the current submenu
      toggle.classList.toggle("active", !isActive);
      toggle.setAttribute("aria-expanded", !isActive);
      if (currentSubmenu) {
        currentSubmenu.classList.toggle("active", !isActive);
      }
    });
  });

  /* --- CLOSE MENU/SUBMENU ON LINK CLICK (Mobile Only) --- */
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      // Check if it's a mobile view (navMenu is active)
      if (navMenu.classList.contains("active")) {
        // For regular links, close the entire mobile menu
        if (!link.classList.contains("nav-link-text")) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");

          // Also close all submenus that might have been left open
          dropdownToggles.forEach((toggle) => {
            const submenu = toggle
              .closest(".nav-item")
              .querySelector(".submenu");
            toggle.classList.remove("active");
            toggle.setAttribute("aria-expanded", "false");
            if (submenu) {
              submenu.classList.remove("active");
            }
          });
        }
        // For dropdown parent links (nav-link-text), we don't close the main menu,
        // as the user might want to redirect and still have the menu open temporarily.
        // However, in a true app, redirection handles this. Here we focus on the logic.
      }
    });
  });

  /* --- DESKTOP DROPUP CLOSING (Click anywhere else) --- */
  document.addEventListener("click", (e) => {
    // If the click target is outside the navigation bar and not part of the menu/submenu
    const isClickOutsideNav = !e.target.closest(".navbar-container");

    if (isClickOutsideNav) {
      dropdownToggles.forEach((toggle) => {
        const submenu = toggle.closest(".nav-item").querySelector(".submenu");
        // Close the submenu
        if (toggle.classList.contains("active")) {
          toggle.classList.remove("active");
          toggle.setAttribute("aria-expanded", "false");
          if (submenu) {
            submenu.classList.remove("active");
          }
        }
      });
    }
  });
});
