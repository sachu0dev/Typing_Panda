const express = require('express');
const { LoremIpsum } = require("lorem-ipsum");

const app = express();
const PORT = process.env.PORT || 3000;

function genParagraph(sentences) {
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
            max: sentences,
            min: sentences
        },
        wordsPerSentence: {
            max: 12,
            min: 10
        }
    });
    let paragraph = lorem.generateParagraphs(1);
    return paragraph;
}
function capitalizeFirstLetter(sentence) {
    return sentence.charAt(0).toUpperCase() + sentence.slice(1);
}
app.get('/generate-paragraph', (req, res) => {
    const sentences = parseInt(req.query.sentences) || 5;
    const punctuations = req.query.punctuations === 'true'; 
    const capital = req.query.capital === 'true';

    let filteredText = genParagraph(sentences);

    if (capital) {
        // Corrected to use filteredText instead of paragraph
        filteredText = filteredText.split('. ').map(sentence => capitalizeFirstLetter(sentence)).join('. ');
    } else {
        filteredText = filteredText.toLowerCase();
    }

    if (!punctuations) {
        filteredText = filteredText.replace(/[^\w\s]/g, '');
    }

    res.json({ paragraph: filteredText });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
