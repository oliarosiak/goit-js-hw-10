export function markupForCounty(country) {
    
    const countryLayout = country.map(({ name, capital, population, flags, languages }) => {
        return `
        <p class="wrap"><img class="flag-pic" src="${flags.svg}" alt="${name.official}" /><span class="name">${name.official}</span></p>
        <p class="wrap">Capital: <span class="wrap-text">${capital}</span></p>
        <p class="wrap">Population: <span class="wrap-text">${population}</span></p>
        <p class="wrap">Languages: <span class="wrap-text">${Object.values(languages).join(', ')}</span></p>
        `
    });       
    
    return countryLayout;
}