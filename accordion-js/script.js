const accordionList = [
  {
    label: "Accordion 1",
    content:
      "This is the content for Accordion 1 in the accordion section of the accordion section of the accordion section of the accordion section of the accordion section.",
  },
  {
    label: "Accordion 2",
    content:
      "This is the content for Accordion 2 in the accordion section of the accordion section of the accordion section of the accordion section of the accordion section.",
  },
  {
    label: "Accordion 3",
    content: "This is the content for Accordion 3.",
  },
];

const container = document.querySelector(".container");

(function () {
  accordionList.forEach((item, index) => {
    const accordion = document.createElement("div");
    accordion.classList.add("accordion");
    const accordionHeader = document.createElement("div");
    accordionHeader.classList.add("accordionHeader");
    accordionHeader.textContent = item.label;
    accordionHeader.setAttribute("data-id", index);
    accordionHeader.addEventListener("click", (e) => {
      toggleAccordion(e.target.dataset.id);
    });

    const accordionBody = document.createElement("div");
    accordionBody.classList.add("accordionBody");
    accordionBody.textContent = item.content;
    accordionBody.setAttribute("data-id", index);

    accordion.appendChild(accordionHeader);
    accordion.appendChild(accordionBody);
    container.appendChild(accordion);
  });
})();

function toggleAccordion(id) {
  const accordionBodyList = document.querySelectorAll(".accordionBody");
  accordionBodyList.forEach((accordionBody) => {
    if (accordionBody.dataset.id === id) {
      if (accordionBody.classList.contains("accordionBody-open")) {
        accordionBody.classList.remove("accordionBody-open");
      } else {
        accordionBody.classList.add("accordionBody-open");
      }
    } else {
      accordionBody.classList.remove("accordionBody-open");
    }
  });
}
