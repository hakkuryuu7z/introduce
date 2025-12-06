const dialogueText = document.getElementById('dialogue-text');
const choicesArea = document.getElementById('choices-area');
const nameTag = document.getElementById('name-tag');
// Variabel stickerImg SUDAH DIHAPUS

// --- NOMOR WA KAMU ---
const myNumber = "6281214764122"; 
const pesanWA = "Halo%2C%20aku%20udah%20selesai%20klik-klik%20webnya.%20Kreatif%20banget%20sih%20kamu%20haha%20%F0%9F%91%8F%E2%9B%B0%EF%B8%8F"; 
const linkWA = `https://wa.me/${myNumber}?text=${pesanWA}`;

// Efek Ngetik
function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        dialogueText.innerHTML = text.substring(0, i+1);
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback)
        }, 30); 
    } else if (typeof fnCallback == 'function') {
        fnCallback();
    }
}

// === SKENARIO ===
const story = {
    start: {
        speaker: "Kamu",
        text: "Halo Neng Kasir! 👋\nDaripada chat panjang di DM, aku iseng bikin ginian spesial buat nemenin kamu nunggu 'Rit Akhir'. Coba diklik deh.",
        choices: [
            { text: "Wih, niat banget! Apa nih?", next: "apresiasi_kerja" },
            { text: "Kreatif juga ya kamu haha", next: "apresiasi_kerja" }
        ]
    },
    apresiasi_kerja: {
        speaker: "Kamu",
        text: "Semangat ya kerjanya! Aku tau jam segini rawan ngantuk, tapi salut sih kamu tetep teliti. Keren loh dedikasinya.",
        choices: [
            { text: "Iya nih, butuh asupan semangat 🥺", next: "bahas_hobi" },
            { text: "Hehe makasih, lagi berjuang nih!", next: "bahas_hobi" }
        ]
    },
    bahas_hobi: {
        speaker: "Kamu",
        text: "Btw, liat kamu di kasir sama di gunung tuh vibes-nya beda banget. Di kerjaan profesional, pas di alam keliatan 'happy' banget.",
        choices: [
            { text: "Jelas dong, gunung itu healing!", next: "validasi_frekuensi" },
            { text: "Jadi kangen muncak kan...", next: "validasi_frekuensi" }
        ]
    },
    validasi_frekuensi: {
        speaker: "Kamu",
        text: "Nah itu dia. Karena kita sama-sama hobi nanjak, rasanya sayang kalau obrolannya kepotong cuma di DM Instagram.",
        choices: [
            { text: "Terus maunya gimana? 😜", next: "ajakan_wa" }
        ]
    },
    ajakan_wa: {
        speaker: "Kamu",
        text: "Gimana kalau kita 'pindah jalur' ke WhatsApp? Biar lebih enak sharing spot gunung di Garut (sekalian modus dikit gapapa kali ya? 😆).",
        choices: [
            { text: "Boleh, mana nomornya? 🚀", type: "link", url: linkWA }
        ]
    }
};

function showScene(sceneId) {
    const scene = story[sceneId];
    nameTag.innerText = scene.speaker;
    choicesArea.innerHTML = ''; 
    dialogueText.innerHTML = '';
    
    // BAGIAN LOGIKA STIKER SUDAH DIHAPUS DI SINI

    typeWriter(scene.text, 0, () => {
        scene.choices.forEach(choice => {
            const btn = document.createElement('div');
            btn.className = 'choice-btn';
            btn.innerText = choice.text;
            
            btn.onclick = () => {
                if (choice.type === 'link') {
                    window.open(choice.url, '_blank');
                } else {
                    showScene(choice.next);
                }
            };
            
            choicesArea.appendChild(btn);
        });
    });
}

// Mulai Game
showScene('start');