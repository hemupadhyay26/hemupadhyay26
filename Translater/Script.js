const selectTag = document.querySelectorAll("select"),
    fromtext = document.querySelector(".from-text"),
    totext = document.querySelector(".to-text"),
    exchange = document.querySelector(".exchange"),
    translateBtn = document.querySelector("button"),
    icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries) {
        // console.log(countries[country_code]);
        let selected;
        if (id == 0 && country_code == "en-GB") {
            selected = "selected"
        } else if (id == 1 && country_code == "hi-IN") {
            selected = "selected"
        }
        let option = `<option value="${country_code}"${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchange.addEventListener("click", () => {
    let tempText = fromtext.value,
        templang = selectTag[0].value;
    fromtext.value = totext.value;
    selectTag[0].value = selectTag[1].value;
    totext.value = tempText;
    selectTag[1].value = templang;
});

translateBtn.addEventListener("click", () => {
    let text = fromtext.value,
        translateFrom = selectTag[0].value,
        translateTo = selectTag[1].value;
    if(!text) return;
    totext.setAttribute("placeholder", "Translating..... ");
    let ApiUrl = `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(ApiUrl).then(res => res.json()).then(data => {
        // console.log(data);
        totext.value = data.responseData.translatedText;
        totext.setAttribute("placeholder", "Translation");
    });
});

icons.forEach(icon => {
    icon.addEventListener("click", ({ target }) => {
        if (target.classList.contains("fa-copy")) {
            if (target.id == "from") {
                navigator.clipboard.writeText(fromtext.value);
            }
            else if (target.id == "to") {
                navigator.clipboard.writeText(totext.value);

            }
        }
        else {
            let utterance;
            if (target.id == "from") {
                utterance=new SpeechSynthesisUtterance(fromtext.value);
                utterance.lang = selectTag[0].value;
            }
            else if (target.id == "to") {
                utterance=new SpeechSynthesisUtterance(totext.value);
                utterance.lang = selectTag[1].value;

            }
            speechSynthesis.speak(utterance);
        }

    })
})


