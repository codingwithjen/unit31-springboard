/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/
  // The constructor function contains code; it splits it on spaces and linebreak characters to make
  // a list of words...

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    // TODO
    let chains = {};
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      // show that we if picked null, we've reached the end of the chain, so stop
      let nextWord = this.words[i + 1] || null;

      if (chains[word]) {
        if (chains[word].indexOf(nextWord) === -1) chains[word].push(nextWord);
      } else {
        chains[word] = [nextWord];
      }
    }
    this.chains = chains;
  }



  /** return random text from chains */

  makeText(numWords = 100) {
    // TODO
    // pick a random key to begin
    let keys = Object.keys(this.chains);
    let key = keys[Math.floor(Math.random() * Math.floor(keys.length))];
    let out = [];

    // produce Markov chain until reaching termination word
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }
    return out.join(" ");
  }
}

// Export contents of files with module.exports (which is usually an object)
module.exports = {
  MarkovMachine,
};

let mm = new MarkovMachine("the cat in the cat");
mm.makeText();
// mm.makeText(numwords=50);
