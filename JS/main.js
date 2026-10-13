// Get the elements from the page
const navbar = document.getElementById("navbar");
const menu = document.getElementById("menu");
const menuToggle = document.getElementById("menuToggle");

// 1. Open / close the menu on mobile
menuToggle.addEventListener("click", function () {
  menu.classList.toggle("open");
});

// 2. Close the menu after clicking a link
menu.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    menu.classList.remove("open");
  });
});

// 3. Add a shadow to the navbar when scrolling
window.addEventListener("scroll", function () {
  if (window.scrollY > 10) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// 4. Fade-in animation when a section scrolls into view
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 },
  );

  revealItems.forEach(function (item) {
    observer.observe(item);
  });
} else {
  revealItems.forEach(function (item) {
    item.classList.add("visible");
  });
}

// 5. Contact form — only runs on contact.html (where EmailJS script is loaded)

 // 5. Contact form
if (typeof emailjs !== "undefined") {
  (function () {
    const PUBLIC_KEY = "TYqXjUFAQfQ0IThfi";
    const SERVICE_ID = "service_b62pl8b";
    const TEMPLATE_ID = "template_ub7iydb";

    emailjs.init({
      publicKey: PUBLIC_KEY
    });

    const contactForm = document.getElementById("contactForm");
    const formNote = document.getElementById("formNote");
    const submitBtn = document.getElementById("submitBtn");

    if (contactForm && formNote && submitBtn) {
      contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        formNote.textContent = "";

        emailjs
          .sendForm(SERVICE_ID, TEMPLATE_ID, contactForm)
          .then(function () {
            formNote.style.color = "green";
            formNote.textContent =
              "Thank you! Your message has been sent successfully.";
            contactForm.reset();
          })
          .catch(function (error) {
            formNote.style.color = "red";
            formNote.textContent =
              "Something went wrong. Please try again or call us directly.";
            console.error("EmailJS error:", error);
          })
          .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send Message";
          });
      });
    }
  })();
}


// 6. Product card click-to-enlarge — only runs on products.html
const productModal = document.getElementById("productModal");

if (productModal) {
  const modalImg = document.getElementById("productModalImg");
  const modalTitle = document.getElementById("productModalTitle");
  const modalText = document.getElementById("productModalText");
  const modalTags = document.getElementById("productModalTags");
  const modalClose = document.getElementById("productModalClose");

  document.querySelectorAll(".product-card").forEach(function (card) {
    card.addEventListener("click", function () {
      const img = card.querySelector("img");
      const title = card.querySelector("h3").textContent;
      const text = card.querySelector("p").textContent;
      const tags = card.querySelectorAll(".tags span");

      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modalTitle.textContent = title;
      modalText.textContent = text;

      modalTags.innerHTML = "";
      tags.forEach(function (tag) {
        const span = document.createElement("span");
        span.textContent = tag.textContent;
        modalTags.appendChild(span);
      });

      productModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeProductModal() {
    productModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  modalClose.addEventListener("click", closeProductModal);

  productModal.addEventListener("click", function (e) {
    if (e.target === productModal) closeProductModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeProductModal();
  });
}

// 7. Work card click-to-enlarge — only runs on works.html
const workModal = document.getElementById("workModal");

if (workModal) {
  const wImg = document.getElementById("workModalImg");
  const wTitle = document.getElementById("workModalTitle");
  const wText = document.getElementById("workModalText");
  const wClose = document.getElementById("workModalClose");

  document.querySelectorAll(".work-card").forEach(function (card) {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
      const img = card.querySelector("img");
      const title = card.querySelector("h3").textContent;
      const text = card.querySelector("p").textContent;

      wImg.src = img.src;
      wImg.alt = img.alt;
      wTitle.textContent = title;
      wText.textContent = text;

      workModal.classList.add("open");
      document.body.style.overflow = "hidden";
    });
  });

  function closeWorkModal() {
    workModal.classList.remove("open");
    document.body.style.overflow = "";
  }

  wClose.addEventListener("click", closeWorkModal);

  workModal.addEventListener("click", function (e) {
    if (e.target === workModal) closeWorkModal();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeWorkModal();
  });
}
/* ==================== WORKS: MODAL + CEILING SLIDER ==================== */
(function () {
  const OPEN_CLASS = "open"; // <-- ክፍል 3 ላይ ያገኘኸውን ቃል እዚህ አስገባ

  const modal = document.getElementById("workModal");
  if (!modal) return;

  const modalImg = document.getElementById("workModalImg");
  const modalVideo = document.getElementById("workModalVideo");
  const modalTitle = document.getElementById("workModalTitle");
  const modalText = document.getElementById("workModalText");
  const closeBtn = document.getElementById("workModalClose");

  function openModal({ type, src, title, text }) {
    if (type === "video") {
      modalImg.style.display = "none";
      modalVideo.style.display = "block";
      modalVideo.src = src;
      modalVideo.play().catch(() => {});
    } else {
      modalVideo.pause();
      modalVideo.style.display = "none";
      modalImg.style.display = "block";
      modalImg.src = src;
    }
    modalTitle.textContent = title || "";
    modalText.textContent = text || "";
    modal.classList.add(OPEN_CLASS);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove(OPEN_CLASS);
    modalVideo.pause();
    modalVideo.removeAttribute("src");
    modalVideo.load();
    document.body.style.overflow = "";
  }

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- Epoxy video card ---------- */
  const videoCard = document.querySelector(".work-card--video");
  if (videoCard) {
    videoCard.addEventListener("click", () => {
      const video = videoCard.querySelector("video");
      openModal({
        type: "video",
        src: video.getAttribute("src"),
        title: videoCard.querySelector("h3").textContent,
        text: videoCard.querySelector("p").textContent,
      });
    });
  }

  /* ---------- Other image cards ---------- */
  document
    .querySelectorAll(
      ".work-card:not(.work-card--video):not(.work-card--slider)",
    )
    .forEach((card) => {
      card.addEventListener("click", () => {
        const img = card.querySelector(".work-card__img img");
        openModal({
          type: "image",
          src: img.getAttribute("src"),
          title: card.querySelector("h3").textContent,
          text: card.querySelector("p").textContent,
        });
      });
    });

  /* ---------- All sliders (ceiling, waterproofing, ...) ---------- */
  document.querySelectorAll(".slider").forEach((slider) => {
    const slides = slider.querySelectorAll(".slide");
    const dots = slider.querySelectorAll(".slider__dots span");
    const card = slider.closest(".work-card");
    let current = 0;
    let timer;

    function show(i) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    }
    function stop() {
      clearInterval(timer);
    }
    function start() {
      stop();
      timer = setInterval(() => show(current + 1), 2500);
    }

    start();
    card.addEventListener("mouseenter", stop);
    card.addEventListener("mouseleave", start);

    dots.forEach((d, i) =>
      d.addEventListener("click", (e) => {
        e.stopPropagation();
        show(i);
        start();
      }),
    );

    card.addEventListener("click", () => {
      openModal({
        type: "image",
        src: slides[current].getAttribute("src"),
        title: card.querySelector("h3").textContent,
        text: card.querySelector("p").textContent,
      });
    });
  });
})();