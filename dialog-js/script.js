const modalTriggerButtons = document.querySelectorAll(
  "[data-open-modal-target"
);
const modalCloseButtons = document.querySelectorAll("[data-close-modal-target");

const overlay = document.createElement("div");
overlay.classList.add("overlay");
document.body.appendChild(overlay);
overlay.addEventListener("click", () => {
  overlay.classList.remove("active");
  const modalList = document.querySelector(".modal.active");
  modalList.classList.remove("active");
});

modalTriggerButtons.forEach((triggerButton) => {
  triggerButton.addEventListener("click", () => {
    const modalId = triggerButton.dataset.openModalTarget;
    const modalElement = document.getElementById(modalId);
    modalElement.classList.add("active");
    overlay.classList.add("active");
  });
});

modalCloseButtons.forEach((closeButton) => {
  closeButton.addEventListener("click", () => {
    const modalId = closeButton.dataset.closeModalTarget;
    const modalElement = document.getElementById(modalId);
    modalElement.classList.remove("active");
    overlay.classList.remove("active");
  });
});
