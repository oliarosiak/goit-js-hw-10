export function markupForCountriesList(countries) {
  
    const countryListLayout = countries.map(({ name, flags }) => {
        return `<li class="list-item"><img class="flag-pic" src="${flags.svg}" alt="${name.official}" /><span class="name">${name.official}</span></li>`
    }).join('');

    return countryListLayout;  
}