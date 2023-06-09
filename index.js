"use strict"
/** Fetch the list of TLDs */
const TLDsRequest = fetch('https://data.iana.org/TLD/tlds-alpha-by-domain.txt');
const BannedTLDsRequest = fetch('static/bannedTLDS.json');
const nameInput = document.getElementById('lookup');
const hacksList = document.getElementById('hacks-list');
const errorsList = document.getElementById('errors');
let brandName = nameInput.value;
let TLDs = (await(await TLDsRequest).text()).split('\n').slice(1, -1);
let bannedTLDS = (await(await BannedTLDsRequest).json());
for (const TLD of bannedTLDS) {
    const index = TLDs.indexOf(TLD);
    if (index > -1) {
        TLDs.splice(index, 1)
    }
}

// console.log(bannedTLDS);
// console.log(TLDs);


nameInput.addEventListener('input', () => {
    let errors = [];
    let hacks = [];
    if (brandName.length < 3) {
        errors.push("Domain names less than 3 letters are not commonly available");
    }
    brandName = nameInput.value; console.log(brandName);
    for (const TLD of TLDs) {
        const lowerBrand = brandName.toLowerCase().trim();
        const lowerTLD = TLD.toLowerCase();
        if (lowerBrand.endsWith(lowerTLD)) {
            const li = document.createElement('li');
            li.textContent = `${brandName.slice(0, brandName.length - TLD.length)}.${lowerTLD}`;
            hacks.push(li);
        }
    }
    if (errors != []) {
        let errorsElements = [];
        for (const error of errors) {
            const li = document.createElement('li');
            li.textContent = error;
            errorsElements.push(li);
        }
        errorsList.replaceChildren(...errorsElements)
    }
        hacksList.replaceChildren(...hacks);
    
});