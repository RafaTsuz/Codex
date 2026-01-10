export function iniciarFAQ() {
  const faqs = document.querySelectorAll(".faq-item");
  if (!faqs.length) return;

  faqs.forEach(item => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      faqs.forEach(f => f.classList.remove("active"));

      if (!isActive) item.classList.add("active");
    });
  });
}