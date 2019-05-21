import {html, render} from 'lit-html/lit-html';
import {countriesList} from "./country";

const AppContainer = (props) => html`<div>${props}</div>`;

const MDTable = (countriesList) => html`
    <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
        <thead>
            <tr>
                ${Object.keys(countriesList[0]).map( (label) => html`<th>${formatLabel(label)}</th>` )}
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

const clickHandler = {

    handleEvent(e) {
        console.log('clicked!');
    },
    capture: true,
};


// Render the template to the document
render(MDTable(countriesList), document.querySelector('.data-table'));