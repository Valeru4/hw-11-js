import './css/styles.css';
import NewsAPIService from './fetchImage.js';
import Notiflix from 'notiflix';
import LoadMoreBtn from "./LoadMoreBtn.js";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';


const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
};

const newsApiService = new NewsAPIService();
const gallery = new SimpleLightbox('.gallery a');
const loadMoreBtn = new LoadMoreBtn({
  selector: ".load-more",
  isHidden: true,
})

refs.formEl.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onLoadMore);

function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  if (value === '') {
    alert('Write your request');
  } else {
    newsApiService.searchQuery = value;
    newsApiService.resetPage();
    loadMoreBtn.show();

    clearNewsList();

    onLoadMore().finally(() => form.reset());
  }
}


async function onLoadMore() {
  loadMoreBtn.disable();

  try {
    const data = await newsApiService.getImg();
    const markup = onMarkUp(data);
    if (!markup) throw new Error("No data");
    onUpdateMarkUp(markup);
  } catch (err) {
    onError(err);
  }

  loadMoreBtn.enable();
}

function onMarkUp(data) {
  return data
    .map((image) => {
      return `<div class="photo-card">
        <a href="${image.webformatURL}">
            <img src="${image.largeImageURL}" alt="${image.tags}" loading="lazy" width="250" height="150" />
        </a>
        <div class="info">
            <p class="info-item">
                <b> Likes: ${image.likes}</b>
            </p>
            <p class="info-item">
                <b> Views: ${image.views}</b>
            </p>
            <p class="info-item">
                <b> Comments: ${image.comments}</b>
            </p>
            <p class="info-item">
                <b> Downloads: ${image.downloads}</b>
            </p>
        </div>
    </div>`; 
    })
    .join('');
}

function onUpdateMarkUp(markup) {
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}


function onError(err) {
  console.error(err);
  loadMoreBtn.hide();
  refs.galleryEl.innerHTML = "<p>Not found!</p>";
}

function clearNewsList() {
  refs.galleryEl.innerHTML = "";
}