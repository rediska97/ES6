import {html, render} from 'lit-html';
import {countriesList} from "./JS/country";

const AppContainer = (props) => html`<div>${props}</div>`;

const MDTable = (countriesList) => html`
    <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
        <thead>
            <tr>
                <th class="mdl-data-table__cell--non-numeric">ID</th>
                <th>Name</th>
                <th>Capital</th>
                <th>Population</th>
                <th>Area</th>
                <th>Time zone</th>
                <th>Currency</th>
                <th>Phone Code</th>
            </tr>
        </thead>
       <tbody>
       ${countriesList.map( (country) => MDTableRow(country) ) }
       
        </tbody>
    </table>
`;

const MDTableRow = (country) => html`
<tr>
${Object.keys(country).map(key => html`<th>${country[key]}</th>`)}
</tr>
`;

console.log(Object.keys(countriesList[0]));

// Render the template to the document
render(MDTable(countriesList), document.body);