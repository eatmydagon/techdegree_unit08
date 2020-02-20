const search = document.querySelector("[type=text]");

let searchValue;

let search_data;

search.addEventListener("keyup", (event) => {
	searchValue = search.value;
	searchArray();
	filter_html();
});

const searchArray = () => {
	return (search_data = employees.filter((employee) => {
		return searchObject(employee);
	}));
};

let searchObject = (object) => {
	let xyz;
	let searchResult;
	for (data in object) {
		xyz = object[data];
		if (typeof xyz === "number") {
			xyz = xyz.toString();
			if (xyz.indexOf(searchValue) !== -1) {
				searchResult = true;
			}
		} else if (typeof xyz === "string") {
			xyz = xyz.toLowerCase();
			if (xyz.indexOf(searchValue) !== -1) {
				searchResult = true;
			}
		}
	}
	if (searchResult) {
		return object;
	} else {
		return false;
	}
};

const filter_html = () => {
	let current_html = document.querySelectorAll(".user");
	current_html.forEach((html) => html.remove());
	generateHTML(search_data);
};
