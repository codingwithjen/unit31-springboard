let favoriteNum = 6;
let baseURL = "http://numbersapi.com";

// 1. Make a request to the Numbers API (look above) to get a fact about your favorite number. Make sure you get back JSON
// by including the json query key, specific to this API
async function firstRequest() {
    let data = await $.getJSON(`${baseURL}/${favoriteNum}?json`);
    console.log(data);
}

firstRequest();

// // 2. Figure out how to get data on MULTIPLE numbers in a SINGLE request. Make that request and when you get the data back,
// // put all of the number facts on the page

const favoriteNums = [7,24,18,19];

async function multNums() {
    let data = await $.getJSON(`${baseURL}/${favoriteNums}?json`);
    console.log(data);
}

multNums();

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.
// It's okay if some of the facts are repeats...
async function fourFacts() {
    let facts = await Promise.all(
      Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favoriteNum}?json`))
    );
    facts.forEach(data => {
      $('body').append(`<p>${data.text}</p>`);
    });
  }
fourFacts();
