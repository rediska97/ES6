import {html, render} from 'lit-html/lit-html';
import {countriesList} from "./country";
import classNames from "classnames"

const AppContainer = (props) => html`<div>${props}</div>`;

let choosenSort = null
let sortOrder = 1;

const MDTable = (countriesList) => html`
    <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
        <thead>
            <tr>
                ${Object.keys(countriesList[0]).map( (label) => 
    html`<th 
        class=${classNames({
        "asc" : choosenSort && choosenSort === label && sortOrder === 1,
        "dsc" : choosenSort && choosenSort === label && sortOrder === -1
    })}
        
        @click=${sortHandler(label)}
        >    
        ${formatLabel(label)}
        </th>
        ` )}
            </tr>
        </thead>
       <tbody>
       ${countriesList.map( (country) => MDTableRow(country) ) }
        </tbody>
    </table>
`;


const MDTableRow = (country) => html`
<tr>
${Object.keys(country).map(key => html`<td>${country[key]}</td>`)}
</tr>
`;

// Format th text
function formatLabel (label) {
    let result = label;
    for (let i = 0; i<label.length; i++){

        if ( (label[i] == label[i].toUpperCase()) && label[i-1] != undefined){
            result = [label.slice(0, i), ' ', label.slice(i)].join('');
        }
    }
    return result.toLocaleLowerCase();

};

const sortHandler =  (label) => ({
    handleEvent(e) {
        if(choosenSort === label) {
            sortOrder = sortOrder * -1;
        }
    choosenSort = label;

    countriesList.sort(dynamicSort(label));
        renderRoot();
    }
})

function dynamicSort(property, sortOrder) {
    return function (a,b) {
        /* next line works with strings and numbers,
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

function renderRoot () {
    render(MDTable(countriesList), document.querySelector('.data-table'));
}
// Render the template to the document

renderRoot();