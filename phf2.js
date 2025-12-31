document.addEventListener("DOMContentLoaded", () => {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Lottie Animation Initialization
  const moleculeAnim = lottie.loadAnimation({
    container: document.getElementById("lottie-molecule"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://assets5.lottiefiles.com/packages/lf20_at680pki.json",
  });

  const successAnim = lottie.loadAnimation({
    container: document.getElementById("success-lottie"),
    renderer: "svg",
    loop: false,
    autoplay: false,
    path: "https://assets2.lottiefiles.com/packages/lf20_7W9r9X.json",
  });

  // 2. Cinematic Entrance Animation
  const sections = document.querySelectorAll(".reveal-el");
  sections.forEach((section, index) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 90%",
        toggleActions: "play none none none",
      },
      y: 40,
      opacity: 0,
      duration: 1.2,
      delay: index * 0.1,
      ease: "power3.out",
    });
  });

  // 3. Magnetic Social Buttons Effect
  const socialBtns = document.querySelectorAll(".social-btn");
  socialBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(btn, {
        x: x * 0.4,
        y: y * 0.4,
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(btn.querySelector("svg"), {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.3,
        ease: "power2.out",
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
      gsap.to(btn.querySelector("svg"), {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    });
  });

  // 4. Parallax Background Movement
  gsap.to(".glow-orb", {
    scrollTrigger: {
      trigger: ".cinematic-footer",
      start: "top bottom",
      end: "bottom top",
      scrub: 1.5,
    },
    y: -120,
    scale: 1.1,
    opacity: 0.8,
  });

  // 5. Logo Shimmer Effect
  const logo = document.querySelector(".logo");
  logo.addEventListener("mouseenter", () => {
    gsap.to(logo, {
      textShadow: "0 0 20px rgba(0, 242, 255, 0.8)",
      letterSpacing: "6px",
      duration: 0.5,
      ease: "power2.out",
    });
  });
  logo.addEventListener("mouseleave", () => {
    gsap.to(logo, {
      textShadow: "none",
      letterSpacing: "4px",
      duration: 0.5,
      ease: "power2.out",
    });
  });

  // 6. Newsletter Submission
  const form = document.getElementById("subscribeForm");
  const btn = form.querySelector(".btn-subscribe");
  const input = form.querySelector("input");
  const lottieContainer = document.getElementById("success-lottie");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    gsap.to(btn, {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      onComplete: () => {
        btn.style.visibility = "hidden";
        input.style.opacity = "0.1";
        lottieContainer.style.display = "block";
        successAnim.play();

        const msg = document.createElement("p");
        msg.innerText = "IDENTITY VERIFIED. ACCESS GRANTED.";
        msg.style.cssText =
          "position:absolute; bottom: -30px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; color: var(--accent-blue); letter-spacing: 2px; width: 100%; text-align: center;";
        form.appendChild(msg);
        gsap.from(msg, {
          y: 10,
          opacity: 0,
          duration: 0.8,
          ease: "power4.out",
        });
      },
    });
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});
