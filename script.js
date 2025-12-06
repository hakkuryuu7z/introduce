const dialogueText = document.getElementById('dialogue-text');
const choicesArea = document.getElementById('choices-area');
const nameTag = document.getElementById('name-tag');
const stickerImg = document.getElementById('sticker-img');

// --- NOMOR WA KAMU (Pastikan format 62...) ---
const myNumber = "6281214764122"; 
const pesanWA = "Halo%2C%20aku%20udah%20selesai%20klik-klik%20webnya.%20Kreatif%20banget%20sih%20kamu%20haha%20%F0%9F%91%8F%E2%9B%B0%EF%B8%8F"; 
// Isi pesan: "Halo, aku udah selesai klik-klik webnya. Kreatif banget sih kamu haha 👏⛰️"
const linkWA = `https://wa.me/${myNumber}?text=${pesanWA}`;

// --- KOLEKSI STIKER LUCU (GIF) ---
// Stiker ini akan muncul sesuai suasana hati percakapan
const stickers = {
  // Beruang Say Hi
    hi: "https://media.tenor.com/fTTVgygZD1wAAAAi/cute-bear.gif", 
    
    // Kucing Semangat Kerja/Ngetik
    work: "https://media.tenor.com/P5b6sM91h4cAAAAi/cute-cat.gif", 
    
    // Beruang Malu/Shy
    shy: "https://media.tenor.com/eH4SeRXrVCypK98Flw/giphy.gif", 
    
    // Mata Berbinar (Starry Eyes)
    mountain: "https://media.tenor.com/Images/70e281577435476880080d8d6411559e/tenor.gif", 
    
    // Hati/Love Banyak
    love: "https://media.tenor.com/l5_u4J0x24oAAAAi/mochi-peach.gif"
};

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

// === SKENARIO (SUDAH KENAL DI DM) ===
const story = {
    start: {
        sticker: stickers.hi,
        speaker: "Kamu", // Ini seolah kamu yang ngomong
        text: "Halo Neng Kasir! 👋\nDaripada chat panjang di DM, aku iseng bikin ginian spesial buat nemenin kamu nunggu 'Rit Akhir'. Coba diklik deh.",
        choices: [
            { text: "Wih, niat banget! Apa nih?", next: "apresiasi_kerja" },
            { text: "Kreatif juga ya kamu haha", next: "apresiasi_kerja" }
        ]
    },
    apresiasi_kerja: {
        sticker: stickers.work,
        speaker: "Kamu",
        text: "Semangat ya kerjanya! Aku tau jam segini rawan ngantuk, tapi salut sih kamu tetep teliti. Keren loh dedikasinya.",
        choices: [
            { text: "Iya nih, butuh asupan semangat 🥺", next: "bahas_hobi" },
            { text: "Hehe makasih, lagi berjuang nih!", next: "bahas_hobi" }
        ]
    },
    bahas_hobi: {
        sticker: stickers.mountain,
        speaker: "Kamu",
        text: "Btw, liat kamu di kasir sama di gunung tuh vibes-nya beda banget. Di kerjaan profesional, pas di alam keliatan 'happy' banget.",
        choices: [
            { text: "Jelas dong, gunung itu healing!", next: "validasi_frekuensi" },
            { text: "Jadi kangen muncak kan...", next: "validasi_frekuensi" }
        ]
    },
    validasi_frekuensi: {
        sticker: stickers.shy, // Pura-pura malu/gombal dikit
        speaker: "Kamu",
        text: "Nah itu dia. Karena kita sama-sama hobi nanjak, rasanya sayang kalau obrolannya kepotong cuma di DM Instagram.",
        choices: [
            { text: "Terus maunya gimana? 😜", next: "ajakan_wa" }
        ]
    },
    ajakan_wa: {
        sticker: stickers.love,
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
    
    // Ganti Stiker jika ada
    if (scene.sticker) {
        stickerImg.src = scene.sticker;
        stickerImg.classList.remove('hidden');
    }

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