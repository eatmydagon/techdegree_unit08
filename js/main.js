const users = [];

for (i = 0; i < 12; i++) {
	fetch("https://randomuser.me/api/")
		.then((data) => data.json())
		.then((data) => users.push(data.results))
		.catch((error) => console.log(error));
}

console.log(users);

users.forEach((user) => console.log(user));
