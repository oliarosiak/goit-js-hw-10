export function markupForCounty(country) {
    
    const countryLayout = country.map(({ name: {official}, capital, population, flags: {svg}, languages }) => {
        return `
        <p class="wrap"><img class="flag-pic" src="${svg}" alt="${official}" /><span class="name">${official}</span></p>
        <p class="wrap">Capital: <span class="wrap-text">${capital}</span></p>
        <p class="wrap">Population: <span class="wrap-text">${population}</span></p>
        <p class="wrap">Languages: <span class="wrap-text">${Object.values(languages).join(', ')}</span></p>
        `
    });       
    
    return countryLayout;
}