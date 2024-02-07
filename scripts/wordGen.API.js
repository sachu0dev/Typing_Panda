const axios = require('axios');

const API_KEY = 'YOUR_API_KEY';

// Fetch a batch of random words from the Wordnik API
async function fetchWordBatch(batchSize) {
    try {
        const response = await axios.get(`https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&minCorpusCount=1000&minLength=3&maxLength=10&limit=${batchSize}&api_key=${API_KEY}`);
        return response.data.map(wordObj => wordObj.word);
    } catch (error) {
        console.error('Error fetching word batch:', error.message);
        return [];
    }
}

let wordPool = [];

// Prepopulate word pool on startup
async function populateWordPool(poolSize) {
    const batchSize = 100; // Adjust batch size as needed
    let wordsFetched = 0;
    while (wordsFetched < poolSize) {
        const batch = await fetchWordBatch(Math.min(batchSize, poolSize - wordsFetched));
        wordPool = wordPool.concat(batch);
        wordsFetched += batch.length;
    }
}

// Function to get a random word from the word pool
function getRandomWord() {
    return wordPool[Math.floor(Math.random() * wordPool.length)];
}

async function generateParagraph(numSentences, upperFreq, punctuation = true, numbers = true) {
    function maybeUppercase(word) {
        return Math.random() < upperFreq ? word.toUpperCase() : word;
    }

    let paragraph = [];
    for (let i = 0; i < numSentences; i++) {
        let sentenceLength = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
        let words = [];
        for (let j = 0; j < sentenceLength; j++) {
            words.push(maybeUppercase(getRandomWord()));
        }
        let sentence = words.join(' ') + (punctuation ? ['.', '!', '?'][Math.floor(Math.random() * 3)] : '');
        if (numbers) {
            for (let j = 0; j < Math.floor(Math.random() * 3) + 1; j++) {
                let index = Math.floor(Math.random() * sentence.length);
                let randomNumber = Math.floor(Math.random() * 10);
                sentence = sentence.slice(0, index) + randomNumber + sentence.slice(index);
            }
        }
        paragraph.push(sentence);
    }
    return paragraph.join(' ');
}

// Populate word pool on startup
populateWordPool(1000) // Adjust pool size as needed
    .then(() => {
        // Example usage:
        generateParagraph(5, 0.2, true, true)
            .then(paragraph => console.log(paragraph))
            .catch(error => console.error('Error generating paragraph:', error.message));
    })
    .catch(error => console.error('Error populating word pool:', error.message));
