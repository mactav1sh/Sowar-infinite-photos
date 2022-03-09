"use strict";

//variables
const imagesContainer = document.querySelector(".images-section");
let photosArray = [];
let imagesLoaded = 0;
const imagesCountAPI = "12";
let ready = false;

const getPhotosFromAPI = async function () {
  const apiKey = `CkWk1RqRkVuL3fV1f0b6iSb4LRNIm7-7-1sWEuSM7P8`;
  const url = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imagesCountAPI}`;
  const data = await fetch(url);
  photosArray = await data.json();
  renderImages();
};
getPhotosFromAPI();

// helper function to set attribute
const attributesSetter = function (element, objectOfAttributes) {
  for (const key in objectOfAttributes) {
    element.setAttribute(key, objectOfAttributes[key]);
  }
};

// creating elements and rendering the images on display
const renderImages = function () {
  photosArray.forEach((object) => {
    //creating a div element for the anchor and image
    const div = document.createElement("div");
    div.classList.add("image-box");
    // creating an anchor element for the image
    const anchor = document.createElement("a");
    attributesSetter(anchor, {
      href: object.urls.full,
      target: "_blank",
    });
    // adding div as a child to div element
    div.appendChild(anchor);
    //creating image element
    const image = document.createElement("img");

    // image.classList.add("image");
    attributesSetter(image, {
      src: object.urls.regular,
      alt: object.alt_description,
      class: `image`,
    });
    // Even listener check when image is finished loading
    image.addEventListener("load", loadingDone);
    // adding image as a child to the anchor element
    anchor.appendChild(image);
    // adding the div containing a and img to the images container
    imagesContainer.append(div);
  });
};

const loadingDone = function () {
  imagesLoaded++;
  if (imagesLoaded === +imagesCountAPI) ready = true;
};

const loadMorePhotos = function () {
  if (
    window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 10 &&
    ready
  ) {
    // console.log("end");
    getPhotosFromAPI();
    ready = false;
    imagesLoaded = 0;
  }
};

window.addEventListener("scroll", loadMorePhotos);
