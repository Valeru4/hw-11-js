import './css/styles.css';
import debounce from 'lodash.debounce'
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries.js'

const listEl = document.querySelector('.country-list')
const inputEl = document.querySelector('[id="search-box"]')
const optiontEl = document.querySelector('.country-info')

const DEBOUNCE_DELAY = 300;

inputEl.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY ))

function onInputCountry() {
    const country = inputEl.value.trim();
    if (country === '') {
        return (listEl.innerHTML = ''), (optiontEl.innerHTML = '')
    }

    fetchCountries(country)
        .then(countries => {
            listEl.innerHTML = ''
            optiontEl.innerHTML = ''
            if (countries.length === 1) {
                listEl.insertAdjacentHTML('beforeend', createListOfCountry(countries));
                optiontEl.insertAdjacentHTML('beforeend', createOptionsOfCountry(countries));

            } else if (countries.length > 10) {
                alertErrorTooManyMatches()
            } else if (countries.length >= 2 && countries.length <= 10) {
                listEl.insertAdjacentHTML('beforeend', createListOfCountry(countries));
            }
        })
        .catch(error => {
            if (error.message === '404') {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            } else {
                Notiflix.Notify.failure(error.message);
            }
            listEl.innerHTML = '';
            optiontEl.innerHTML = '';
        })
}


function createListOfCountry(countries) {
  const markup = countries.map((country) => {
    return `<li class="country-item">
      <img class="country-flag" src=${country.flags.svg} alt=${country.flags.alt} />
      <h2 class="country-item-name">${country.name.official}</h2>
      </li>`;
  }).join('');
  return markup;
}

function createOptionsOfCountry(countries) {
    const markup = countries.map((country) => {
        const languagesofCountry = Object.values(country.languages).join(', ')
    return `<ul class=country-option-list>
        <li class=country-option-item> <p class="country-option"> <b>Capital:</b> ${country.capital}</p></li>
            <li class=country-option-item><p class="country-option"><b>Population:</b> ${country.population}</p></li>
            <li class=country-option-item> <p class="country-option"><b>Languages:</b> ${languagesofCountry}</p></li>
            </ul>`
    }).join('')
    return markup
}


function alertErrorSpecific() {
Notiflix.Notify.failure('Oops, there is no country with that name')
}
function alertErrorTooManyMatches() {
Notiflix.Notify.info('Too many matches found. Please enter a more specific name.')
}