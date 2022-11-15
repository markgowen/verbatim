function init() {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const btn = document.querySelector("#search-btn");
    
    btn.addEventListener("click", () => {
        let searchTerm = document.querySelector("#search-term").value;
        
        fetch(`${url}${searchTerm}`)
        .then(res => res.json())
        .then(data => renderResult(data[0]))
        .catch(() => {
            result.innerHTML = "Could not find word"
        })
    })
}

function renderResult(element) {
    const result = document.querySelector(".result");
    const details = document.querySelector(".details");
    const word = document.querySelector(".word");

    const sound = document.querySelector("#sound");
    sound.setAttribute("src", `${element.phonetics[0].audio}`);

    const soundIcon = document.createElement("button");
    soundIcon.innerText = "Play"
    
    const term = document.createElement("h3");
    term.innerHTML = element.word;
    
    const phonetic = document.createElement("p");
    phonetic.innerHTML = element.phonetic;

    const partOfSpeech = document.createElement("p");
    partOfSpeech.innerText = element.meanings[0].partOfSpeech;
    
    details.append(phonetic, partOfSpeech)
    word.append(sound, soundIcon, term)
    result.append(word, soundIcon, details)
    
    // setting all definitions for each word
    element.meanings.forEach((meaning) => {
        
        // const synonyms = document.createElement("p");
        // synonyms.classList.add("details")

        // synonyms.innerText = meaning.synonyms;

        meaning.definitions.forEach((definitions) => {
            const definition = document.createElement("p");
            
            definition.classList.add("definition");
            definition.innerText = definitions.definition;
            
            result.append(definition)
        })
    })
    
    soundIcon.addEventListener("click", () => {
        playSound()
    })
}

function playSound() {
    sound.play();
}

init()