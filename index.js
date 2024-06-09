
// const searchButton = document.getElementById('searchButton');
// const meaningsContainer = document.getElementById('meaningsContainer');
// const firstLetter = document.getElementById('firstLetter');
// const lastLetter = document.getElementById('lastLetter');

// const dic = ['apple', 'boy', 'cat', 'dog'];

// const filterMeaning = () => {
//     let a = firstLetter.value.trim();
//     let b = lastLetter.value.trim();

//     if (!a && !b) {
//         return null; // No input provided
//     }

//     return dic.filter((meaning) => {
//         if (a && b) {
//             return meaning.startsWith(a) && meaning.endsWith(b);
//         } else if (a) {
//             return meaning.startsWith(a);
//         } else if (b) {
//             return meaning.endsWith(b);
//         }
//     });
// }

// searchButton.addEventListener('click', () => {
//     const filteredMeanings = filterMeaning();
//     if (filteredMeanings === null) {
//         meaningsContainer.innerHTML = 'Please enter at least one letter.';
//     } else if (filteredMeanings.length > 0) {
//         meaningsContainer.innerHTML = filteredMeanings.join(', ');
//     } else {
//         meaningsContainer.innerHTML = 'No results found';
//     }
// });


const searchButton = document.getElementById('searchButton');
const meaningsContainer = document.getElementById('meaningsContainer');
const firstLetter = document.getElementById('firstLetter');
const lastLetter = document.getElementById('lastLetter');

const getWords = async (first, last) => {
    const response = await fetch(`https://api.datamuse.com/words?sp=${first}*${last}`);
    const words = await response.json();
    return words.map(word => word.word);
};

searchButton.addEventListener('click', async () => {
    let a = firstLetter.value.trim().toLowerCase();
    let b = lastLetter.value.trim().toLowerCase();

    if (!a && !b) {
        meaningsContainer.innerHTML = '<div>Please enter at least one letter.</div>';
        return;
    }

    const filteredMeanings = await getWords(a, b);
    meaningsContainer.innerHTML = filteredMeanings.length > 0
        ? filteredMeanings.map(meaning => `<div>${meaning}</div>`).join('')
        : '<div>No results found</div>';
});
