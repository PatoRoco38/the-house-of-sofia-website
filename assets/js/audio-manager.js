// ===== Sofia Audio Manager =====

const sofiaAudio = {
    threshold: new Audio('assets/audio/01_SOFIA_THRESHOLD.wav'),
    siteLoop: new Audio('assets/audio/02_SOFIA_SITE_LOOP.wav'),
    institutionalBed: new Audio('assets/audio/03_SOFIA_INSTITUTIONAL_BED.wav'),
    livingAesthetics: new Audio('assets/audio/04_SOFIA_LIVING_AESTHETICS.wav'),
    pulse: new Audio('assets/audio/05_SOFIA_PULSE.wav'),
    concessionSeal: new Audio('assets/audio/06_SOFIA_CONCESSION_SEAL.wav')
};

sofiaAudio.siteLoop.loop = true;

let audioStarted = false;

function startSofiaAudio() {

    if (audioStarted) return;

    audioStarted = true;

    console.log('Starting Sofia Audio...');

    sofiaAudio.threshold.play();

    sofiaAudio.threshold.addEventListener('ended', () => {

        console.log('Threshold finished');

        sofiaAudio.siteLoop.volume = 0.25;

        sofiaAudio.siteLoop.play();

    });

}
const audioToggle = document.getElementById('audio-toggle');
const audioVolume = document.getElementById('audio-volume');

let audioMuted = false;

function setAllVolumes(value) {
    sofiaAudio.siteLoop.volume = value;
    sofiaAudio.threshold.volume = value;
    sofiaAudio.institutionalBed.volume = value;
    sofiaAudio.livingAesthetics.volume = value;
    sofiaAudio.pulse.volume = Math.min(value + 0.15, 1);
    sofiaAudio.concessionSeal.volume = value;
}

if (audioVolume) {
    audioVolume.addEventListener('input', () => {
        setAllVolumes(Number(audioVolume.value));
    });
}

if (audioToggle) {
    audioToggle.addEventListener('click', () => {
        audioMuted = !audioMuted;

        Object.values(sofiaAudio).forEach((audio) => {
            audio.muted = audioMuted;
        });

        audioToggle.textContent = audioMuted ? 'Audio Off' : 'Audio On';
    });
}