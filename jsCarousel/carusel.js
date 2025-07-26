document.addEventListener("DOMContentLoaded", () => {
  caruselInit();
});

function caruselInit() {
  const caruselContainer = document.querySelector(".carusel");
  const caruselTrack = document.querySelector(".caruseltrack");
  const caruselItems = document.querySelectorAll(".caruselItem");
  let currentItem = 0;
  const tickThreshold = 3000;
  let direction = 1;
  let iterationId;

  createIndexNavigator();
  updateActiveDot();
  timer();

  function createIndexNavigator() {
    const navigatorContainer = document.createElement("section");
    navigatorContainer.classList.add("navigator");

    caruselItems.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.dataset.navindex = i;
      dot.addEventListener("click", onDotNavigateClick);
      navigatorContainer.appendChild(dot);
    });

    caruselContainer.appendChild(navigatorContainer);
  }

  function onDotNavigateClick(e) {
    const targetIndex = Number(e.target.dataset.navindex);
    clearTimeout(iterationId);
    moveToItem(targetIndex);
    timer();
  }

  function timer() {
    iterationId = setTimeout(() => {
      let nextItem = currentItem + direction;

      if (nextItem < 0) {
        nextItem = 1;
        direction = 1;
      } else if (nextItem >= caruselItems.length) {
        nextItem = caruselItems.length - 2;
        direction = -1;
      }

      moveToItem(nextItem);
      timer();
    }, tickThreshold);
  }

  function moveToItem(index) {
    caruselTrack.style.transform = `translateX(-${100 * index}vw)`;
    currentItem = index;
    updateActiveDot();
  }

  function updateActiveDot() {
    const dots = document.querySelectorAll(".dot");
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentItem);
    });
  }
}