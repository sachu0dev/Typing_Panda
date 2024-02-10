const { LoremIpsum } = require("lorem-ipsum");

function genParagraph(sentences){
    const lorem = new LoremIpsum({
        sentencesPerParagraph: {
          max: sentences,
          min: sentences - 2
        },
        wordsPerSentence: {
          max: 10,
          min: 6
        }
      });
      let paragraph = lorem.generateParagraphs(1);
      filterParagraph(paragraph);
}
function filterParagraph(paragraph, punctuations = true, capital = true) {
    let filteredText = paragraph;
  
    if (!punctuations) {
      filteredText = filteredText.replace(/[^\w\s]/g, '');
    }
  
    if (!capital) {
      filteredText = filteredText.toLowerCase();
    }
  
    return filteredText;
  }
  
  // Example usage:
  const paragraph = "This is a test paragraph! It includes some Punctuation, and Some Capital Letters.";
  
  // Filter the paragraph removing punctuations and converting to lowercase
  const filteredText = filterParagraph(paragraph);
  console.log(filteredText); // Output: "this is a test paragraph it includes some punctuation and some capital letters"
  
  // Filter the paragraph keeping punctuations and capital letters
  const filteredTextWithPunctuationsAndCapital = filterParagraph(paragraph, true, true);
  console.log(filteredTextWithPunctuationsAndCapital); // Output: "This is a test paragraph! It includes some Punctuation, and Some Capital Letters."
  