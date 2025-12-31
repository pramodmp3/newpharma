gsap.registerPlugin(ScrollTrigger);

window.addEventListener("load", () => {
  // 1. Atmosphere: DNA/Molecule Lottie
  const lottieContainer = document.getElementById("lottie-molecule");
  const animation = lottie.loadAnimation({
    container: lottieContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "https://assets4.lottiefiles.com/packages/lf20_u4j3t6qg.json",
  });

  // 2. Parallax Motion (Smooth Scrubbing)
  gsap.to("#dust-layer", {
    y: -100,
    ease: "none",
    scrollTrigger: {
      trigger: "#main-footer",
      start: "top bottom",
      end: "bottom top",
      scrub: 1,
    },
  });

  // 3. reveal-el Timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#main-footer",
      start: "top 75%",
      toggleActions: "play none none none",
    },
  });

  tl.from(".reveal-el", {
    y: 60,
    opacity: 0,
    scale: 0.98,
    duration: 1.2,
    stagger: 0.1,
    ease: "expo.out",
  });

  // 4. Newsletter
  const submitBtn = document.getElementById("submit-btn");
  const emailInput = document.getElementById("email-input");
  const msg = document.getElementById("success-msg");

  submitBtn.addEventListener("click", () => {
    if (emailInput.value.includes("@")) {
      submitBtn.innerText = "VERIFIED";
      msg.classList.add("show");
      emailInput.value = "";
      setTimeout(() => {
        msg.classList.remove("show");
        submitBtn.innerText = "AUTHORIZE";
      }, 4000);
    }
  });

  // 5. Mouse Interaction for Desktop
  if (window.innerWidth > 1024) {
    document.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX - window.innerWidth / 2) / 60;
      const moveY = (clientY - window.innerHeight / 2) / 60;

      gsap.to(".footer-bg-layers", {
        x: moveX,
        y: moveY,
        duration: 1.5,
        ease: "power2.out",
      });
    });
  }
});
