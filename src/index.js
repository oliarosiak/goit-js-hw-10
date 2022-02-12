import './css/styles.css';
import { fetchCountries } from './api/fetchCountries';
// import { markupForCounty } from './partials/countryCard';

import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 300;
// const DEBOUNCE_DELAY = 500;

const inputRef = document.querySelector('input[id="search-box"]');
const cardWrapperRef = document.querySelector('div.country-info');
const listWrapperRef = document.querySelector('ul.country-list');

inputRef.addEventListener('input', debounce(onInputField, DEBOUNCE_DELAY));

function onInputField(event) {
    const searchQuery = event.target.value;
    const searchQueryTrim = searchQuery.trim();

    if (searchQueryTrim === '') {
        cleaner();
        Notiflix.Notify.warning('Please enter a country name 🙌');
        return;
    }

    fetchCountries(searchQueryTrim)
        .then(countries => {            
            if (countries.length > 10) {
                Notiflix.Notify.warning('Too many matches found. Please enter a more specific name.');
                cleaner();

            } else if (countries.length >= 2 && countries.length <= 10) {               
                markupForCountriesList(countries);
                Notiflix.Notify.info(`We found ${countries.length} countries.`);                

            } else if (countries.length === 1) {                
                markupForCounty(countries);
                Notiflix.Notify.success('We found one match.');                
            }
          
            console.log(countries.length);
        }).catch(error => {
            Notiflix.Notify.failure('Oops, there is no country with that name');
            console.log(error);
        });   
}

function markupForCounty(country) {
    cleaner();
    const countryLayout = country.map(({ name, capital, population, flags, languages }) => {
        return `
        <p class="wrap"><img class="flag-pic" src="${flags.svg}" alt="${name.official}" /><span class="name">${name.official}</span></p>
        <p class="wrap">Capital: <span class="wrap-text">${capital}</span></p>
        <p class="wrap">Population: <span class="wrap-text">${population}</span></p>
        <p class="wrap">Languages: <span class="wrap-text">${Object.values(languages).join(', ')}</span></p>
        `
    });       
    cardWrapperRef.innerHTML = countryLayout;
}

function markupForCountriesList(countries) {
    cleaner();
    const countryListLayout = countries.map(({ name, flags }) => {
        return `<li class="list-item"><img class="flag-pic" src="${flags.svg}" alt="${name.official}" /><span class="name">${name.official}</span></li>`
    }).join('');
   listWrapperRef.innerHTML = countryListLayout;
}

function cleaner() {
    cardWrapperRef.innerHTML = '';
    listWrapperRef.innerHTML = '';
}