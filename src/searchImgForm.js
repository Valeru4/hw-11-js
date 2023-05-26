
import './css/styles.css';
import NewsAPIService from './fetchImage.js';
import Notiflix from 'notiflix';
import LoadMoreBtn from "./LoadMoreBtn.js";
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';


const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '17538652-b999fbbbfe57ad3fb90b083ce';

const refs = {
  formEl: document.querySelector('#search-form'),
  galleryEl: document.querySelector('.gallery'),
};

const newsApiService = new NewsAPIService();
const gallery = new SimpleLightbox('.gallery a');
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

refs.formEl.addEventListener('submit', onSearch);
loadMoreBtn.button.addEventListener('click', onLoadMore);

async function onSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const value = form.elements.searchQuery.value.trim();

  clearNewsList();
  
  newsApiService.searchQuery = value;


  if (value === '') {
    Notiflix.Notify.info('Please write your request');
    return;
  }

  try {
    const data = await newsApiService.getImages(value);

    console.log(data);

    if (data.totalHits > 0) {
      Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`);
    }
  
    if (data.hits.length === 0) {
      Notiflix.Notify.info(
        'Sorry, there are no images matching your search query. Please try again.')
    }
  
    newsApiService.resetPage();
    const markup = generateMarkup(data.hits);
    onUpdateMarkup(markup);
     onLoadMore();
  }

  catch (error) {
    onError(error);
  } finally {
    refs.formEl.reset();
  }
}

async function onLoadMore() {
  loadMoreBtn.disable();

  try {
    

    const data = await newsApiService.getImages();
    const images = data.hits;
    const markup = generateMarkup(images);
    if (!markup) throw new Error('No data');
    onUpdateMarkup(markup);

    const totalHits = data.totalHits;
    const perPage = newsApiService.perPage;
    const currentPage = newsApiService.page;
    const totalPages = Math.ceil(totalHits / perPage);

    if (currentPage >= totalPages) {
      loadMoreBtn.hide();
              Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.");

    } if (images.length === 0) {
        throw new Error("Sorry, there are no images matching your search query. Please try again.");
      }
    
    else {
const markup = generateMarkup(data.hits);
    onUpdateMarkup(markup);
      loadMoreBtn.enable();
    }
  } catch (err) {
    onError(err);
  }
}


function generateMarkup(images) {
  
  return images
    .map(
      (image) =>
        `<div class="photo-card">
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
      </div>`
    )
    .join('');
}


function onUpdateMarkup(markup) {
  refs.galleryEl.insertAdjacentHTML('beforeend', markup);
}

function onError(err) {
  console.error(err);
  loadMoreBtn.hide();
  refs.galleryEl.innerHTML = '<p>Not found!</p>';
}

function clearNewsList() {
  refs.galleryEl.innerHTML = '';
} 


refs.galleryEl.addEventListener('click', (event) => {

    const lightBox = new SimpleLightbox('.photo-card a',
    {captionDelay: 250, 
     enableKeyboard: true, 
     captionsData: 'alt', 
     captions: true})
});