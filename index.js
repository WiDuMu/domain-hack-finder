/** Fetch the list of TLDs */
const TLDsRequest = fetch("https://data.iana.org/TLD/tlds-alpha-by-domain.txt");
const BannedTLDsRequest = fetch("static/bannedTLDS.json");
const nameInput = document.getElementById("lookup");
const hacksList = document.getElementById("hacks-list");
const errorsList = document.getElementById("errors");
let brandName = nameInput.value;
let TLDs = new Set((await (await TLDsRequest).text()).split("\n").slice(1, -1));
const bannedTLDS = new Set(await (await BannedTLDsRequest).json());
TLDs = TLDs.difference(bannedTLDS);
console.log(...TLDs);

nameInput.addEventListener("input", () => {
	const errors = [];
	const hacks = [];
	if (brandName.length < 3) {
		errors.push("Domain names less than 3 letters are not commonly available.");
	}
	brandName = nameInput.value;
	for (const TLD of TLDs) {
		const lowerBrand = brandName.toLowerCase().trim().split(/[^A-z0-9-_]/gum).join("");
		const lowerTLD = TLD.toLowerCase();
		if (lowerBrand.endsWith(lowerTLD)) {
			const li = document.createElement("li");
			li.textContent = `${lowerBrand.slice(0, lowerBrand.length - TLD.length)}.${lowerTLD}`;
			hacks.push(li);
		}
	}

	const errorsElements = errors.map(error => {
		const li = document.createElement("li");
		li.textContent = error;
		return li;
	});
	errorsList.replaceChildren(...errorsElements);
	hacksList.replaceChildren(...hacks);
});
