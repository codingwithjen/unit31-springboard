let favoriteNum = 6;
let baseURL = "http://numbersapi.com";

// 1. Make a request to the Numbers API (look above) to get a fact about your favorite number. Make sure you get back JSON
// by including the json query key, specific to this API

$.getJSON(`${baseURL}/${favoriteNum}?json`).then(data => {
    console.log(data);
});

// // 2. Figure out how to get data on MULTIPLE numbers in a SINGLE request. Make that request and when you get the data back,
// // put all of the number facts on the page

let favoriteNums = [7,24,18,19];
$.getJSON(`${baseURL}/${favoriteNums}?json`).then(data => {
    console.log(data);
});

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.
// It's okay if some of the facts are repeats...
Promise.all(Array.from({ length: 4 }, () => {
    return $.getJSON(`${baseURL}/${favoriteNum}?json`);
})
).then(facts => {
    facts.forEach(data => $("body").append(`<p>${data.text}</p>`));
});