const search = document.querySelector("[type=text]");
let searchValue;
let search_results;

/* ===================== Functions ===========================
============================================================= */

// function to filter the employees array based on the search value
const searchArray = () => {
	return (search_results = employees.filter((employee) => {
		return searchObject(employee);
	}));
};

// function to filter each employee object based on the search value
let searchObject = (object) => {
	let search_index;
	let search_outcome;
	for (data in object) {
		search_index = object[data];
		if (typeof search_index === "number") {
			search_index = search_index.toString();
			if (search_index.indexOf(searchValue) !== -1) {
				search_outcome = true;
			}
		} else if (typeof search_index === "string") {
			search_index = search_index.toLowerCase();
			if (search_index.indexOf(searchValue) !== -1) {
				search_outcome = true;
			}
		}
	}
	if (search_outcome) {
		return object;
	} else {
		return false;
	}
};

// function to clear the existing user markup and generate new user markup based on the search results
const filter_html = () => {
	let current_html = document.querySelectorAll(".user");
	current_html.forEach((html) => html.remove());
	generateHTML(search_results);
};

/* ===================== Event Listeners =========================
============================================================= */

// search input - fires on input field keyup
search.addEventListener("keyup", (event) => {
	searchValue = search.value;
	searchArray();
	filter_html();
});
