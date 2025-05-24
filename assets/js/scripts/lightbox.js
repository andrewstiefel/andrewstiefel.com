document.addEventListener("DOMContentLoaded", () => {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");

    // Bind click handlers to all lightboxable images
    document.querySelectorAll("img[data-lightbox]").forEach(img => {
      img.addEventListener("click", () => {
        const src = img.getAttribute("src");
        const alt = img.getAttribute("alt") || "";

        // Hide image while loading
        lightboxImg.classList.remove("opacity-100");
        lightboxImg.classList.add("opacity-0");

        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.remove("hidden");

        // Wait for both image load and next animation frame
        lightboxImg.onload = () => {
          requestAnimationFrame(() => {
            lightbox.classList.remove("opacity-0");
            lightbox.classList.add("opacity-100");

            lightboxImg.classList.remove("opacity-0");
            lightboxImg.classList.add("opacity-100");
          });
        };
      });
    });

    function closeLightbox() {
      lightbox.classList.remove("opacity-100");
      lightbox.classList.add("opacity-0");
      lightboxImg.classList.remove("opacity-100");
      lightboxImg.classList.add("opacity-0");

      setTimeout(() => {
        lightbox.classList.add("hidden");
        lightboxImg.src = "";
      }, 300); // Match Tailwind duration
    }

    lightbox.addEventListener("click", closeLightbox);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !lightbox.classList.contains("hidden")) {
        closeLightbox();
      }
    });
});