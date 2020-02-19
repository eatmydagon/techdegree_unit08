let searchValue = "1";

// let searchArray = employees.filter((employee) => {
// 	return searchObject(employee);
// });

let searchObject = (object) => {
	let xyz;
	for (data in object) {
		xyz = object[data];
		if (typeof xyz === "number") {
			xyz = xyz.toString();
			if (xyz.indexOf(searchValue) !== -1) {
				return true;
			} else {
				return false;
			}
		} else if (typeof xyz === "string") {
			if (xyz.toLowerCase().indexOf(searchValue) !== -1) {
				return true;
			} else {
				return false;
			}
		}
	}
};
