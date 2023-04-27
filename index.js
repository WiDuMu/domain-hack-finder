"use strict"
/** Fetch the list of TLDs */
const TLDsRequest = fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt');
const nameInput = document.getElementById('lookup');
const hacksList = document.getElementById('hacks-list');
let brandName = nameInput.value;

let TLDs = (await (await TLDsRequest).text()).split('\n').slice(1, -1);
console.log(TLDs);
nameInput.addEventListener('input', () => {
    brandName = nameInput.value; console.log(brandName);
    let hacks = [];
    for (const TLD of TLDs) {
        const lowerBrand = brandName.toLowerCase().trim();
        const lowerTLD = TLD.toLowerCase();
        if (lowerBrand.endsWith(lowerTLD)) {
            const li = document.createElement('li');
            li.textContent = `${brandName.slice(0, brandName.length - TLD.length)}.${lowerTLD}`;
            hacks.push(li);
        }
    }
    hacksList.replaceChildren(...hacks);
});