const axios = require('axios');

async function getRandomWord() {
    try {
        const response = await axios.get('https://api.wordnik.com/v4/words.json/randomWord?api_key=YOUR_API_KEY');
        return response.data.word;
    } catch (error) {
        console.error('Error fetching random word:', error.message);
        return null;
    }
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
            const word = await getRandomWord();
            words.push(maybeUppercase(word));
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

// Example usage:
async function main() {
    let paragraph = await generateParagraph(5, 0.2, true, true);
    console.log(paragraph);
}

main();
