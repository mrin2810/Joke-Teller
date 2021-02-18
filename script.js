const button = document.getElementById('button');
const audioElement = document.getElementById('audio');
const apiUrl = 'https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
let joke = '';

// toggleButton
function toggleButton() {
    button.disabled = !button.disabled;
}

function tellMe(jokeToSpeech) {
    VoiceRSS.speech({
        key: '8e37bf1462854ce18c19a565b6c01acd',
        src: jokeToSpeech,
        hl: 'en-us',
        r: 0,
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    })
}

async function getJokes() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        if(data.type === 'single'){
            joke = `${data.joke}`;
        } else {
            joke = `${data.setup}  ${data.delivery}`;
        }
        tellMe(joke);
    } catch (err) {

    }
}

button.addEventListener('click', () => {
    getJokes();
    toggleButton();
});

audioElement.addEventListener('ended', toggleButton);
