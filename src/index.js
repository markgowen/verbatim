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
    const result = document.querySelector("#result");
    const word = document.createElement("h1");
    const phonetic = document.createElement("p");
    const sound = document.querySelector("#sound");
    const soundIcon = document.createElement("button");
    
    sound.setAttribute("src", `${element.phonetics[0].audio}`);
    
    phonetic.classList.add("phonetic")

    word.innerHTML = element.word;
    soundIcon.innerText = "Play"
    phonetic.innerHTML = element.phonetic;

    result.append(word, soundIcon, phonetic)

    // setting all definitions for each word
    element.meanings.forEach((meaning) => {
        const partOfSpeech = document.createElement("p.partOfSpeech");
        partOfSpeech.classList.add("details");

        const synonyms = document.createElement("p.synonyms");
        synonyms.classList.add("details")

        partOfSpeech.innerText = meaning.partOfSpeech;
        synonyms.innerText = meaning.synonyms;

        meaning.definitions.forEach((definitions) => {
            const definition = document.createElement("p");
            
            definition.classList.add("definition");
            definition.innerText = definitions.definition;
            
            result.append(definition)
        })
        result.append(partOfSpeech, synonyms)
    })
    
    soundIcon.addEventListener("click", () => {
        playSound()
    })
}

function playSound() {
    sound.play();
}

init()