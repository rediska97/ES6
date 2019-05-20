import countriesData from './countriesData.js'

class Country {
    constructor(props) {
        this.id = props.id;
        this.name = props.name;
        this.population = props.population;
        this.area = props.area;
        this.capital = props.capital;
        this.timeZone = props.timeZone;
        this.currency = props.currency;
        this.phoneCode = props.phoneCode
    }
}

export const countriesList = countriesData.map( country => new Country(country));
