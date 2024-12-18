const container = document.querySelector(".container");
const imageClassName = "image-js";

function throttle(fn, delay) {
  let isAPICallAllowed = true;
  return function () {
    if (!isAPICallAllowed) return;
    fn();
    isAPICallAllowed = false;
    setTimeout(() => {
      isAPICallAllowed = true;
    }, delay);
  };
}

/**
 * There is a performance overhead of using `getBoundingClientRect()`. It triggers "Reflow".
 * getBoundingClientRect forces the browser to recalculate the layout and style information of the document.
 * If used in performance-critical scenarios (e.g., inside a scroll or resize event),
 * it can degrade performance, especially when used repeatedly.
 *
 * In the below scenario, we can use intersection observer to know when an image comes to the viewport.
 * And then load the image
 */

function loadImages() {
  const imageList = document.querySelectorAll(`.${imageClassName}`);
  imageList.forEach((image) => {
    const rect = image.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      image.src = image.dataset.src;
    } else {
      image.src = "";
    }
  });
}

const throttledImageLoad = throttle(loadImages, 400);

container.addEventListener("scroll", throttledImageLoad);

(async function () {
  const url = "https://picsum.photos/v2/list";
  const response = await fetch(url);
  const data = await response.json();
  data.forEach((image) => {
    const imageElement = document.createElement("img");
    imageElement.setAttribute("data-src", image.download_url);
    imageElement.classList.add(imageClassName);
    container.appendChild(imageElement);
  });
  loadImages();
})();
