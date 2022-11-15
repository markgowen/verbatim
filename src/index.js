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
    let result = document.querySelector(".result");
    const word = document.querySelector(".word");
    const details = document.querySelector(".details");
    const wordDef = document.querySelector(".word-def");
    const wordExample = document.querySelector(".example");
    const sound = document.querySelector("#sound");
    
    word.innerHTML = ""
    details.innerHTML = ""
    wordDef.innerHTML = ""
    wordExample.innerHTML = ""

    const soundIcon = document.createElement("button");
    const icon = document.createElement("i");

    icon.className = ("fas fa-volume-up");
    soundIcon.append(icon);
    
    const term = document.createElement("h3");
    term.innerHTML = element.word;
    
    const phonetic = document.createElement("p");
    phonetic.innerHTML = element.phonetic || element.phonetics.find((p) => {
        return p.text}).text;
    
    const partOfSpeech = document.createElement("p");
    partOfSpeech.innerText = element.meanings[0].partOfSpeech;

    const example = document.createElement("p");
    element.meanings.find((m) => {
        return m.definitions.find((d) => {
            if (d.example){
                example.innerText = d.example
            }
            return d.example
        })
    })

    const definition = document.createElement("p");
    definition.innerText = element.meanings[0].definitions[0].definition;
    
    wordDef.append(definition)
    wordExample.append(example)
    details.append(phonetic, partOfSpeech)
    word.append(term, soundIcon)
    result.append(word, details, wordDef, wordExample)

    const audio = element.phonetics.find((audioSrc) => {
        return audioSrc.audio.length > 0})?.audio

    sound.setAttribute("src", `${audio}`);
    
    if (!audio) {
        soundIcon.remove();
    }

    soundIcon.addEventListener("click", () => {
        playSound()
    })
}

function playSound() {
    sound.play();
}

function darkMode() {
    const darkModeIcon = document.querySelector(".dark-mode-icon");

    darkModeIcon.addEventListener("click", () => {
        const element = document.body;
        element.classList.toggle("dark-mode")
    })
}

darkMode()
init()