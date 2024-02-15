import { fetchApiAsync } from "./pixabay-api";
import { Notify } from "notiflix/build/notiflix-notify-aio";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const inputForm = document.querySelector("input");
const submitForm = document.querySelector("button");
const imageGallery = document.querySelector(".gallery");

const buttonMore = document.querySelector(".load-more");
buttonMore.classList.add("btn-more--visible");

let pageCounter = 1;

submitForm.addEventListener("click", (event) => {
  event.preventDefault();
  pageCounter = 1;
  imageGallery.innerHTML = "";
  if (inputForm.value === "") {
    return Notify.failure("Ingresa en el buscador la palabra clave");
  }
  const result = async (query) => {
    try {
      buttonMore.classList.remove("btn-more--visible");
      const response = await fetchApiAsync(query);
      const { total, totalHits, hits } = response.data;
      if (totalHits === 0) {
        buttonMore.classList.add("btn-more--visible");
        Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
        return;
      } else if (totalHits <= 40) {
        buttonMore.classList.add("btn-more--visible");
      }
      Notify.success(`Hooray! We found ${totalHits} images.`);
      hits.forEach((element) => {
        imageGallery.innerHTML += `
                <div class="photo-card">
                <a href="${element.largeImageURL}">
                    <img src="${element.previewURL}" alt="${element.pageURL}" loading="lazy" />
                    </a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${element.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${element.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${element.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${element.downloads}
                        </p>
                    </div>
                </div>
                `;
        lightbox.refresh();
      });
    } catch (error) {
      Notify.failure(error);
    }
  };
  result(inputForm.value);
});

buttonMore.addEventListener("click", (event) => {
  event.preventDefault();
  pageCounter++;
  const result = async (query, page) => {
    try {
      buttonMore.classList.remove("btn-more--visible");
      const response = await fetchApiAsync(query, page);
      const { total, totalHits, hits } = response.data;
      if (totalHits === 0) {
        buttonMore.classList.add("btn-more--visible");
        return Notify.failure(
          "Sorry, there are no images matching your search query. Please try again."
        );
      } else if (totalHits <= 40 || pageCounter >= Math.ceil(totalHits / 40)) {
        buttonMore.classList.add("btn-more--visible");
        Notify.warning(
          "We're sorry, but you've reached the end of search results."
        );
      }
      hits.forEach((element) => {
        imageGallery.innerHTML += `
                <div class="photo-card">
                <a href="${element.largeImageURL}">
                    <img src="${element.previewURL}" alt="${element.pageURL}" loading="lazy" />
                    </a>
                    <div class="info">
                        <p class="info-item">
                            <b>Likes</b>
                            ${element.likes}
                        </p>
                        <p class="info-item">
                            <b>Views</b>
                            ${element.views}
                        </p>
                        <p class="info-item">
                            <b>Comments</b>
                            ${element.comments}
                        </p>
                        <p class="info-item">
                            <b>Downloads</b>
                            ${element.downloads}
                        </p>
                    </div>
                </div>
                `;
        lightbox.refresh();
      });
    } catch (error) {
      Notify.failure(error);
    }
  };
  result(inputForm.value, pageCounter);
});

var lightbox = new SimpleLightbox(".gallery a", {
  /* options */
});
