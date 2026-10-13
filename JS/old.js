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
  // Old browsers: just show everything
  revealItems.forEach(function (item) {
    item.classList.add("visible");
  });
}
// 5. Contact form — sends a real email using EmailJS
(function () {
  // ⬇️ እነዚህን 3 ከ EmailJS dashboard ገልብጠህ ቀይር
  const PUBLIC_KEY = "የአንተ_PUBLIC_KEY";
  const SERVICE_ID = "የአንተ_SERVICE_ID";
  const TEMPLATE_ID = "የአንተ_TEMPLATE_ID";

  emailjs.init(PUBLIC_KEY);

  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");
  const submitBtn = document.getElementById("submitBtn");

  if (contactForm) {
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

// 6. Click a product card to see it enlarged in a popup
const productModal = document.getElementById("productModal");
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

 /* ---------- Ceiling slider ---------- */
  const slider = document.getElementById("ceilingSlider");
  if (slider) {
    const slides = slider.querySelectorAll(".slide");
    const dots   = slider.querySelectorAll(".slider__dots span");
    const card   = slider.closest(".work-card");
    let current = 0;
    let timer;

    function show(i) {
      slides[current].classList.remove("is-active");
      dots[current].classList.remove("is-active");
      current = (i + slides.length) % slides.length;
      slides[current].classList.add("is-active");
      dots[current].classList.add("is-active");
    }
    function stop()  { clearInterval(timer); }
    function start() { stop(); timer = setInterval(() => show(current + 1), 2500); }

    start();
    card.addEventListener("mouseenter", stop);
    card.addEventListener("mouseleave", start);

    dots.forEach((d, i) => d.addEventListener("click", (e) => {
      e.stopPropagation();
      show(i);
      start();
    }));

    card.addEventListener("click", () => {
      openModal({
        type: "image",
        src: slides[current].getAttribute("src"),
        title: card.querySelector("h3").textContent,
        text: card.querySelector("p").textContent
      });
    });
  }
})();