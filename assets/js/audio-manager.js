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
let audioEnabled = false;
let audioMuted = true;
let activeTemporaryAudio = null;
let currentVolume = 0.25;

const audioToggle = document.getElementById('audio-toggle');
const audioVolume = document.getElementById('audio-volume');

function setAllVolumes(value) {
    currentVolume = value;

    sofiaAudio.siteLoop.volume = value;
    sofiaAudio.threshold.volume = value;
    sofiaAudio.institutionalBed.volume = value;
    sofiaAudio.livingAesthetics.volume = value;
    sofiaAudio.pulse.volume = Math.min(value + 0.15, 1);
    sofiaAudio.concessionSeal.volume = value;

    if (activeTemporaryAudio) {
        activeTemporaryAudio.volume = value;
    }
}

function setAllMuted(isMuted) {
    Object.values(sofiaAudio).forEach((audio) => {
        audio.muted = isMuted;
    });

    if (activeTemporaryAudio) {
        activeTemporaryAudio.muted = isMuted;
    }
}

function stopAllAudio() {
    Object.values(sofiaAudio).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });

    if (activeTemporaryAudio) {
        activeTemporaryAudio.pause();
        activeTemporaryAudio.currentTime = 0;
        activeTemporaryAudio = null;
    }
}

function startSofiaAudio() {
    audioEnabled = true;
    audioMuted = false;

    setAllMuted(false);
    setAllVolumes(currentVolume);

    if (audioToggle) {
        audioToggle.textContent = 'Audio On';
    }

    if (!audioStarted) {
        audioStarted = true;

        console.log('Starting Sofia Audio...');

        sofiaAudio.threshold.currentTime = 0;

        sofiaAudio.threshold.play()
            .catch((error) => {
                console.error('Erro ao iniciar Sofia Threshold:', error);
            });

        sofiaAudio.threshold.addEventListener('ended', () => {
            console.log('Threshold finished');

            if (audioEnabled && !audioMuted) {
                sofiaAudio.siteLoop.currentTime = 0;
                sofiaAudio.siteLoop.play()
                    .catch((error) => {
                        console.error('Erro ao iniciar Sofia Site Loop:', error);
                    });
            }
        }, { once: true });

        return;
    }

    sofiaAudio.siteLoop.play()
        .catch((error) => {
            console.error('Erro ao retomar Sofia Site Loop:', error);
        });
}

function disableSofiaAudio() {
    audioEnabled = false;
    audioMuted = true;

    stopAllAudio();
    setAllMuted(true);

    if (audioToggle) {
        audioToggle.textContent = 'Audio Off';
    }
}

function playSofiaPulse() {
    if (!audioEnabled || audioMuted) return;

    const pulse = new Audio('assets/audio/05_SOFIA_PULSE.wav');

    pulse.volume = Math.min(currentVolume + 0.15, 1);
    pulse.muted = false;

    pulse.play()
        .then(() => console.log('Sofia Pulse tocou'))
        .catch((error) => console.error('Erro ao tocar Sofia Pulse:', error));
}

function playSofiaConcessionSeal() {
    if (!audioEnabled || audioMuted) return;

    if (activeTemporaryAudio) {
        activeTemporaryAudio.pause();
        activeTemporaryAudio.currentTime = 0;
    }

    sofiaAudio.siteLoop.pause();

    const seal = new Audio('assets/audio/06_SOFIA_CONCESSION_SEAL.wav');

    activeTemporaryAudio = seal;

    seal.volume = currentVolume;
    seal.muted = false;

    seal.play()
        .catch((error) => {
            console.error('Erro ao tocar Sofia Concession Seal:', error);
        });

    seal.addEventListener('ended', () => {
        activeTemporaryAudio = null;

        if (audioEnabled && !audioMuted) {
            sofiaAudio.siteLoop.play()
                .catch((error) => {
                    console.error('Erro ao retomar Sofia Site Loop:', error);
                });
        }
    });
}

setAllVolumes(currentVolume);
setAllMuted(true);

if (audioToggle) {
    audioToggle.textContent = 'Audio Off';

    audioToggle.addEventListener('click', () => {
        if (!audioEnabled) {
            startSofiaAudio();
            return;
        }

        disableSofiaAudio();
    });
}

if (audioVolume) {
    audioVolume.addEventListener('input', () => {
        setAllVolumes(Number(audioVolume.value));
    });
}

document.addEventListener('click', (event) => {
    const clickedButton = event.target.closest('.hero-button');

    if (!clickedButton) return;

    const isFormSubmitButton =
        clickedButton.matches('button[type="submit"]') ||
        clickedButton.closest('form');

    if (isFormSubmitButton) return;

    console.log('Sofia Pulse acionado');

    playSofiaPulse();
});