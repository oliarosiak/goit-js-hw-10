import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
import { markupForCounty } from './partials/countryCard';
import { markupForCountriesList } from './partials/countriesList';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input[id="search-box"]');
const cardWrapperRef = document.querySelector('div.country-info');
const listWrapperRef = document.querySelector('ul.country-list');

inputRef.addEventListener('input', debounce(onInputField, DEBOUNCE_DELAY));

function onInputField(event) {
    const searchQuery = event.target.value;
    const searchQueryTrim = searchQuery.trim();
    const infoText = '<div class="info-text">😎 Hey you! Please, enter a country name 🙌</div>';

    if (searchQueryTrim === '') {
        cleaner();            
        cardWrapperRef.innerHTML = infoText;
        Notiflix.Notify.info('Enter a country name');
        return;
    }

    fetchCountries(searchQueryTrim)
        .then(displayCountryLayout)
        .catch(errorNotification);           
}

function displayCountryLayout(countries) {
    cleaner();

    if (countries.length > 10) {
        Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
    } else if (countries.length >= 2 && countries.length <= 10) {
        listWrapperRef.innerHTML = markupForCountriesList(countries);
        Notiflix.Notify.info(`We found ${countries.length} countries.`);
    } else if (countries.length === 1) {
        cardWrapperRef.innerHTML = markupForCounty(countries);
        Notiflix.Notify.success('We found one match.'); 
    }
}

function cleaner() {
    cardWrapperRef.innerHTML = '';
    listWrapperRef.innerHTML = '';
}

function errorNotification(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
    console.log(error);
}



