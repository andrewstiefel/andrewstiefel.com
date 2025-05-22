document.addEventListener("DOMContentLoaded", () => {
  const preview = document.createElement("div");
  preview.id = "link-preview";
  preview.style.position = "absolute";
  preview.style.display = "none";
  preview.classList.add(
    "bg-gray-50", "text-black", "border", "border-gray-100",
    "rounded", "shadow-lg", "text-sm", "leading-snug", "p-2", "z-50",
    "dark:bg-gray-800", "dark:text-white", "dark:border-gray-600", "max-w-sm", "relative"
  );

  document.body.appendChild(preview);

  document.querySelectorAll("a.internal-link").forEach(link => {
    link.addEventListener("mouseenter", (e) => {
      const title = link.dataset.previewTitle;
      const raw = link.dataset.previewExcerpt;
      const excerpt = raw.replace(/\\n/g, '\n');

      console.log("previewTitle:", link.dataset.previewTitle);
      console.log("label inside tag:", link.textContent);

      preview.innerHTML = `
        <div class="font-bold text-lg capitalize z-10 preview-title"></div>
        <div class="mt-1 max-h-[8em] overflow-hidden relative z-10 text-sm whitespace-pre-wrap preview-excerpt"></div>
        <div class="absolute bottom-0 left-0 w-full h-[4em] bg-gradient-to-t from-gray-50 from-15% to-transparent dark:from-gray-800 z-20"></div>
      `;

      preview.querySelector(".preview-title").textContent = title;
      preview.querySelector(".preview-excerpt").textContent = excerpt;
      preview.style.display = "block";
    });

    link.addEventListener("mousemove", (e) => {
      preview.style.left = `${e.pageX + 15}px`;
      preview.style.top = `${e.pageY + 15}px`;
    });

    link.addEventListener("mouseleave", () => {
      preview.style.display = "none";
    });
  });
});