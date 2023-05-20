const countryArr = 'https://restcountries.com/v3.1/name/'

export function fetchCountries(countries) {
    return fetch(`${countryArr}${countries}`)
     .then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  })
}




