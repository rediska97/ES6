import {html, render} from 'lit-html/lit-html';
import {countriesList} from "./country";
import classNames from "classnames"

let listForRender = countriesList

let choosenSort = null
let sortOrder = 1;

const MDTable = (countriesList = []) => html`
    <table class="mdl-data-table mdl-js-data-table mdl-shadow--2dp">
        <thead>
            <tr>
                ${countriesList[0] && Object.keys(countriesList[0]).map((label) =>
    html`<th 
        class=${classNames({
        "mdl-data-table__header--sorted-ascending": choosenSort && choosenSort === label && sortOrder === 1,
        "mdl-data-table__header--sorted-descending": choosenSort && choosenSort === label && sortOrder === -1
    })}
        @click=${sortHandler(label)}
        >    
        ${formatLabel(label)}
        </th>
        `)}
            </tr>
        </thead>
       <tbody>
       ${countriesList.map((country) => MDTableRow(country))}
        </tbody>
    </table>
`;

// create table row
const MDTableRow = (country) => html`
<tr>
${Object.keys(country).map(key => html`<td>${country[key]}</td>`)}
</tr>
`;

// Format th text
function formatLabel(label) {
    let result = label;
    for (let i = 0; i < label.length; i++) {

        if ((label[i] === label[i].toUpperCase()) && label[i - 1] !== undefined) {
            result = [label.slice(0, i), ' ', label.slice(i)].join('');
        }
    }
    return result.toLocaleLowerCase();
};

// on th click, sort by label
const sortHandler = (label) => ({
    handleEvent(e) {
        if (choosenSort === label) {
            sortOrder = sortOrder * -1;
        }
        choosenSort = label;
        listForRender.sort(dynamicSort(label, sortOrder));
        renderRoot();
    }
})

function dynamicSort(property, sortOrder) {
    return function (a, b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

const filterInputValues = {}
Object.keys(countriesList[0]).forEach(key => filterInputValues[key] = '')


const MDFilters = (countriesList) => html`
 ${Object.keys(countriesList[0]).map((label) => html`
    <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input 
        class="mdl-textfield__input" 
        type="text"  
        @value=${filterInputValues[label]} 
        @change=${setInputValueHandler(label)}>
        <label class="mdl-textfield__label" for="addr1">${label}</label>
      </div>`)}
      <button 
      @click=${filterHandler()} 
      class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored">
           Filter
      </button>
`;

const filterHandler = () => ({
    handleEvent(e) {
        listForRender = countriesList.filter( country => {
            for(const [key, value] of Object.entries(filterInputValues)) {
                const checkValue= value.toString().toLowerCase();
                const countryKeyFiltered = country[key].toString().toLowerCase();

                if(!countryKeyFiltered.includes(checkValue) && checkValue !== "") {
                    return false
                }
            }
            return true
        })
        renderRoot();
    }
})

const setInputValueHandler = (label) => ({
    handleEvent(e) {
        filterInputValues[label] = e.target.value
    }
})

function renderRoot() {
    render(MDTable(listForRender), document.querySelector('.data-table'));
}
render(MDFilters(listForRender), document.querySelector('.filters'));
// Render the template to the document
renderRoot();

