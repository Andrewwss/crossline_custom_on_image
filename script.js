
// Params
const custom_id = 'custom_id';
const image_source = './test.webp';

let intViewportWidth = window.innerWidth;
let intViewportHeight = window.innerHeight;

// Onload
window.addEventListener('load', () => {
  processWork(custom_id, image_source); // Id of element and source of image
});

// Scroll
document.addEventListener('scroll', () => {
  cursorParams.scrollX = window.scrollX;
  cursorParams.scrollY = window.scrollY;

  render();
});

const cursorParams = {
  clientX: 0,
  clientY: 0,
  scrollX: 0,
  scrollY: 0,
  imgWidth: 0,
  imgHeight: 0,
};

const render = () => {
  try {
    const cursorVT = document.querySelector('.vt');
    const cursorHL = document.querySelector('.hl');
    
    // Get position of image wrapper:
    let imageElement = document.getElementById("custom_id");
    const rect = imageElement.getBoundingClientRect();
    
    //check if cursor on image
    if (cursorParams.clientX >= rect.left && cursorParams.clientX <= rect.right && cursorParams.clientY >= rect.top && cursorParams.clientY <= rect.bottom) {
      const fixedRight = intViewportWidth - (rect.right + cursorParams.scrollX) - 14;
      const fixedBottom = intViewportHeight - (rect.bottom + cursorParams.scrollY);

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

const reportWindowSize = () => {
  intViewportHeight = window.innerHeight;
  intViewportWidth = window.innerWidth;
};

const processWork = (elementId, imageSource) => {
  // Attaching the event listener function to window's resize event
  window.addEventListener("resize", reportWindowSize);

  // Get anchor elem
  const anchorElement = document.getElementById(elementId);
  anchorElement.setAttribute("style", 'display: inline-block;');

  // Create image element
  let imageElement = document.createElement("img");
  imageElement.setAttribute("src", imageSource);

  // Image resolution
  // imageElement.setAttribute("width", "960px");
  // imageElement.setAttribute("height", "640px");

  // Append image to anchor
  anchorElement.appendChild(imageElement);

  // Get image size
  setTimeout(() => {
    cursorParams.imgWidth = imageElement.clientWidth;
    cursorParams.imgHeight = imageElement.clientHeight;

    // Set container image size
    document.querySelector('#custom_id').style.height = `${cursorParams.imgHeight}px`;
    document.querySelector('#custom_id').style.width = `${cursorParams.imgWidth}px`;
  }, 100);
  
  // Create crosslines
  createAndAppendCrosslinesElementToAnchor(anchorElement);
  // Add styles
  addStyles();

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

const addStyles = () => {
  const css = `
    .hover { cursor: crosshair; }
    .vt { position: absolute; border-right: 1px dashed rgb(255, 0, 0); z-index: 0;}
    .hl { position: absolute; border-top: 1px dashed rgb(255, 0, 0); z-index: 0;}`;
  const style = document.createElement('style');

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }

  document.getElementsByTagName('head')[0].appendChild(style);
  document.querySelector('#custom_id').classList.add('hover');
};