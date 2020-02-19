const directory = document.querySelector(".directory");
const randomAPI = "https://randomuser.me/api/?results=12&nat=us,gb";
const popup = document.querySelector(".popup");
const chevron = document.querySelectorAll(".chevron");
let current_user_profile;
let employees;

class Employee_profile {
	constructor(employee) {
		this.name = `${employee.name.first} ${employee.name.last}`;
		this.image = employee.picture.large;
		this.email = employee.email;
		this.country = employee.location.country;
		this.address = `${employee.location.state}, ${employee.location.city}, ${employee.location.postcode}`;
		this.phone = employee.phone;
		this.dob = new Date(employee.dob.date);
		this.id = employee.id;
	}

	get dateofbirth() {
		let birthdate = this.dob;
		let date = birthdate.getDate();
		let month = birthdate.getMonth() + 1;
		let year = birthdate.getFullYear();
		let dob = `${date}/${month}/${year}`;
		return dob;
	}
}

const generateHTML = (employee_data) => {
	let employee = employee_data;
	let userDiv = document.createElement("div");
	userDiv.setAttribute("class", "user");
	userDiv.setAttribute("user-id", `${employee.id}`);
	userDiv.innerHTML = `
					<figure>
						<img
							src="${employee.image}"
						/>
					</figure>
					<div>
						<p>${employee.name}</p>
						<p>${employee.email}</p>
						<p>${employee.country}</p>
					</div> `;
	directory.appendChild(userDiv);
};

const fetch_data = async (url) => {
	employees = await fetch(url)
		.then((response) => response.json())
		.then((data) => data.results)
		.then((data) => {
			data.forEach((user, index) => (user.id = index));
			return data;
		})
		.then((data) => {
			profiles = data.map((employee) => new Employee_profile(employee));
			return profiles;
		});

	employees.forEach((employee) => generateHTML(employee));
};

fetch_data(randomAPI);

directory.addEventListener("click", (event) => {
	e = event.target;
	let user = e;
	let user_id;
	if (e.getAttribute("class") !== "directory") {
		while (user.getAttribute("class") !== "user") {
			user = user.parentElement;
		}
		user_id = parseInt(user.getAttribute("user-id"));
		current_user_profile = employees
			.filter((employee) => employee.id === user_id)
			.reduce((profile, data) => (profile = data), {});
		generatePopup(current_user_profile);
		popup.style.display = "initial";
	} else {
		console.log("directory has been clicked");
	}
});

const generatePopup = (profile_data) => {
	let profile = profile_data;
	let profileDiv = document.createElement("div");
	profileDiv.setAttribute("class", "container");
	profileDiv.setAttribute("user-id", `${profile.id}`);
	profileDiv.innerHTML = `
            <div>
                <figure>
                    <img src="${profile.image}"/>
                </figure>
                <div>
                    <p>${profile.name}</p>
                    <p>${profile.email}</p>
                    <p>${profile.country}</p>
                </div>
                <div>
                    <p>${profile.phone}</p>
                    <p>${profile.address}</p>
                    <p>Birthday: ${profile.dateofbirth}</p>
                </div>
                <button class="close">
				</button>
            </div>
            
    `;
	popup.appendChild(profileDiv);
};

popup.addEventListener("click", (event) => {
	let e = event.target;
	if (
		e.getAttribute("class") === "popup" ||
		e.getAttribute("class") === "close"
	) {
		popup.style.display = "none";
		popup_remove();
	}
});

const popup_remove = () => {
	let popup_profile = document.querySelector(".container");
	popup_profile.remove();
};

chevron[0].addEventListener("click", (event) => {
	popup_navigate(-1);
});
chevron[01].addEventListener("click", (event) => {
	popup_navigate(1);
});

const popup_navigate = (navigate) => {
	let id = current_user_profile.id;
	let new_user_id = id + navigate;
	if (new_user_id >= 0 && new_user_id < employees.length) {
		current_user_profile = employees
			.filter((employee) => employee.id === new_user_id)
			.reduce((profile, data) => (profile = data), {});
		popup_remove();
		generatePopup(current_user_profile);
	}
};
