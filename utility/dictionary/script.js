//@ts-check
///<reference path="wordlist.js"/>

/** 
 * @typedef Word
 * @property {string} word
 * @property {string} pos
 * @property {string[]} meaning
 * @property {string[]} [category]
 * @property {string} [notes]
 */

let table = document.getElementById('output-table');

/**
 * @param {string[]} lists 
 * @param {boolean} head
 */
function generateHTMLRow(lists, head = false, headFirst = false) {
    let row = document.createElement('tr');
    for (let text of lists) {
        let cell;
        if (head || headFirst)
            cell = document.createElement('th');
        else
            cell = document.createElement('td');

        cell.innerText = text;
        row.appendChild(cell);

        headFirst = false;
    }
    return row;
}

/**
 * @param {Word} word 
 */
function generateDeclensionTable(word) {
    if (word.pos !== 'noun') {
        return null;
    }
    let out = document.createElement('table');

    out.appendChild(generateHTMLRow(
        ['', 'Singular', 'Definite Plural', 'Indefinite Plural'], true));
    out.appendChild(generateHTMLRow(
        ['Simple', word.word, word.word + 'm', word.word + 'rt'], false, true));
    out.appendChild(generateHTMLRow(
        ['Construct', 'ćo' + word.word, 'ćo' + word.word + 'm', 'ćo' + word.word + 'rt'], false, true));
    return out;
}

/** @type {HTMLTableRowElement} */
let activeOpenTab = null;
/** @type {HTMLTableRowElement} */
let clickedElement = null;

/**
 * @param {Word} word 
 * @param {HTMLTableRowElement} tr
 */
function onClick(word, tr) {
    if (activeOpenTab !== null) {
        table.removeChild(activeOpenTab);
    }
    if (tr === clickedElement) {
        clickedElement = null;
        activeOpenTab = null;
        return;
    }

    let row = document.createElement('tr');
    row.classList.add('explanation');
    let cell = document.createElement('td');
    cell.colSpan = 3;
    row.appendChild(cell);
    if (word.pos === 'noun') {
        cell.appendChild(generateDeclensionTable(word));
    }
    activeOpenTab = row;
    clickedElement = tr;
    table.insertBefore(row, tr.nextSibling);
}

for (let word of dictionary) {
    let row = generateHTMLRow(
        [word.word, word.meaning[0], word.pos]);
    row.addEventListener('click', () => onClick(word, row));
    table.appendChild(row);
}

function syllabify(word) {
    const vowels = 'aiueoüö'
}