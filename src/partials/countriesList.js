export function markupForCountriesList(countries) {
  
    const countryListLayout = countries.map(({ name: {official}, flags: {svg} }) => {
        return `<li class="list-item"><img class="flag-pic" src="${svg}" alt="${official}" /><span class="name">${official}</span></li>`
    }).join('');

    return countryListLayout;  
}