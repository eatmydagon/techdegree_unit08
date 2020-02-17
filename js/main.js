const users = [];
let userData = [];

const fetch_data = async (url) => {
    for (i = 0; i < 12; i++) {
        let data = await fetch(url)
            .then((response) => response.json())
            .then((data) => users.push(data))
            .then(() => console.log(`data fetched sucessfully ${users.length}`))
            .catch((error) => console.error(`unable to fetch data ${error}`));
    }
    userData = users
        .map((user) => {
            console.log(`data added sucessfully`);
            return user.results[0];
        })
        .map((user) => {
            let data = {};
            data.name = user.name;
            data.image = user.picture;
            data.email = user.email;
            data.location = user.location;
            return data;
        });
};

fetch_data("https://randomuser.me/api/");
