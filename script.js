
let custom_id = 'custom_id';
const image_source = './test.webp';

// Onload
window.addEventListener('load', (event) => {
  processWork(custom_id, image_source); // Id of element and source of image
});

// Initial values
let scrollPosX = window.scrollX;
let scrollPosY = window.scrollY;

// Scroll
document.addEventListener('scroll', function(e) {
  cursorParams.scrollX = window.scrollX;
  cursorParams.scrollY = window.scrollY;

  render();
});

let intViewportWidth = window.innerWidth;
let intViewportHeight = window.innerHeight;

const cursorParams = {
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  
  clientX: 0,
  clientY: 0,

  scrollX: 0,
  scrollY: 0,

  // imgWidth: 0,
  // imgHeight: 0,
};

const render = () => {
  console.log('render');

  try {
    const cursorVT = document.querySelector('.vt');
    const cursorHL = document.querySelector('.hl');
    
    // Get position of image wrapper:
    let imageElement = document.getElementById("custom_id");
    const rect = imageElement.getBoundingClientRect();
    
    //check if cursor on image
    if (
      cursorParams.clientX >= rect.left
      && cursorParams.clientX <= rect.right
      && cursorParams.clientY >= rect.top
      && cursorParams.clientY <= rect.bottom
    ) {
      //TODO: fix small bug
      const fixedRight = intViewportWidth - (rect.right + cursorParams.scrollX) - 12;
      const fixedBottom = intViewportHeight - (rect.bottom + cursorParams.scrollY) + 5;

      cursorHL.setAttribute('style', `
        top: ${cursorParams.clientY + cursorParams.scrollY}px;
        left: ${rect.left + cursorParams.scrollX}px;
        right: ${fixedRight}px;
      `);

      cursorVT.setAttribute('style', `
        left: ${cursorParams.clientX + cursorParams.scrollX}px;
        top: ${rect.top + cursorParams.scrollY}px;
        bottom: ${fixedBottom}px;
      `);
    } else {
      // Reset
      cursorVT.setAttribute('style', `left: -999px; top: -999px; bottom: -999px;`);
      cursorHL.setAttribute('style', `top: -999px; left: -999px; right: -999px;`);
    }

  } catch (error) {
    throw error
  }
};

function reportWindowSize() {
  intViewportHeight = window.innerHeight;
  intViewportWidth = window.innerWidth;
}

const processWork = (elementId, imageSource) => {
  // Attaching the event listener function to window's resize event
  window.addEventListener("resize", reportWindowSize);

  // Get anchor elem
  const anchorElement = document.getElementById(elementId);
  anchorElement.setAttribute("style", 'display: inline-block;');

  // Create image element
  let imageElement = document.createElement("img");
  imageElement.setAttribute("src", imageSource);

  // TODO: image resolution
  // imageElement.setAttribute("width", "960px");
  // imageElement.setAttribute("height", "640px");

  // Append image to anchor
  anchorElement.appendChild(imageElement);

  // Get image size
  // setTimeout(function(){
  //   cursorParams.imgWidth = imageElement.clientWidth;
  //   cursorParams.imgHeight = imageElement.clientHeight;
  // }, 100);
  
  // Create crosslines
  createAndAppendCrosslinesElementToAnchor(anchorElement);

  // Update crosslines on mousemove
  document.addEventListener('mousemove', e => {
    cursorParams.clientX = e.clientX;
    cursorParams.clientY = e.clientY;

    render();
  })
};

const createAndAppendCrosslinesElementToAnchor = (anchorElement) => {
  const horizontalLine = document.createElement("div");
  const verticalLine = document.createElement("div");

  horizontalLine.classList.add("hl");
  verticalLine.classList.add("vt");

  // Append lines to anchor
  anchorElement.appendChild(horizontalLine);
  anchorElement.appendChild(verticalLine);
};