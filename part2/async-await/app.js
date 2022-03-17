$(function() {
  let baseURL = 'https://deckofcardsapi.com/api/deck';

// 1. Make a request to the Numbers API (look above) to get a fact about your favorite number. Make sure you get back JSON
// by including the json query key, specific to this API

async function firstRequest() {
  let data = await $.getJSON(`${baseURL}/new/draw/`);
  let { suit, value } = data.cards[0];
  console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
}

// // 2. Figure out how to get data on MULTIPLE numbers in a SINGLE request. Make that request and when you get the data back,
// // put all of the number facts on the page

async function multRequests() {
  let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
  let deckId = firstCardData.deck_id;
  let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
  [firstCardData, secondCardData].forEach(card => {
    let { suit, value } = card.cards[0];
    console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
  });
}

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page.
// It's okay if some of the facts are repeats...
async function drawingCards() {
  let $btn = $('button');
  let $cardArea = $('#card-area');

  let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
  $btn.show().on('click', async function() {
    let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
    let cardSrc = cardData.cards[0].image;
    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;
    $cardArea.append(
      $('<img>', {
        src: cardSrc,
        css: {
          transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
        }
      })
    );
    if (cardData.remaining === 0) $btn.remove();
  });
}
drawingCards();
});
