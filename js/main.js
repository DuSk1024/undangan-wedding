// ==========================================
// 1. CONFIG & INITIALIZE SUPABASE
// ==========================================
const SUPABASE_URL = 'https://lrwoorxthpgvlgisolli.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxyd29vcnh0aHBndmxnaXNvbGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDU3ODMsImV4cCI6MjEwMzIyMTc4M30.s_dZQN1xuHkyjYeFrHvN7dGk6P1vZdpGAAhEytaULRg';

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ==========================================
// 2. DOM CONTENT LOADED (MAIN INIT & ANIMATIONS)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {

    // 1. SET BACKGROUND PERTAMA AKTIF
    const firstBg = document.getElementById('bg1');
    if (firstBg) firstBg.classList.add('active');

    // 2. COUNTDOWN TIMER ACARA (17 OKTOBER 2026)
    const targetDate = new Date("October 17, 2026 08:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            if (document.getElementById("days")) document.getElementById("days").innerText = days < 10 ? "0" + days : days;
            if (document.getElementById("hours")) document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
            if (document.getElementById("minutes")) document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
            if (document.getElementById("seconds")) document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. ANIMASI POP-OUT 3D & STAGGERED REVEAL
    const scrollContainer = document.getElementById('scrollContainer');
    const scrollTargetBlocks = document.querySelectorAll('.scroll-target-block');
    const bgSlides = document.querySelectorAll('.bg-slide');

    if (scrollContainer && scrollTargetBlocks.length > 0) {
        
        // A. Observer Transisi Latar Belakang Cross-Fade
        const bgObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const bgId = entry.target.getAttribute('data-bg');
                    if (bgId) {
                        bgSlides.forEach(slide => {
                            if (slide.id === bgId) {
                                slide.classList.add('active');
                            } else {
                                slide.classList.remove('active');
                            }
                        });
                    }
                }
            });
        }, { root: scrollContainer, threshold: 0.25 });

        scrollTargetBlocks.forEach(block => bgObserver.observe(block));

        // B. Observer Kemunculan Pop-Out Tulisan & Kartu Berurutan
        const contentObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const revealElements = entry.target.querySelectorAll('.reveal-element');

                if (entry.isIntersecting) {
                    revealElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add('active-pop');
                        }, index * 120); 
                    });
                } else {
                    revealElements.forEach(el => {
                        el.classList.remove('active-pop');
                    });
                }
            });
        }, {
            root: scrollContainer,
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        });

        scrollTargetBlocks.forEach(block => contentObserver.observe(block));

        // C. Dynamic Scroll Micro Parallax (HANYA AKTIF DI LAYAR BESAR)
        scrollContainer.addEventListener('scroll', () => {
            if (window.innerWidth <= 576) return; // Mencegah bentrokan layout di HP
            
            const scrollTop = scrollContainer.scrollTop;
            const activeElements = document.querySelectorAll('.reveal-element.active-pop');
            
            activeElements.forEach((el, idx) => {
                const speed = (idx % 2 === 0) ? 0.02 : -0.015;
                el.style.transform = `translateY(${scrollTop * speed}px) scale(1) rotateX(0deg)`;
            });
        }, { passive: true });
    }

    // 4. LOAD DAFTAR UCAPAN DARI SUPABASE
    fetchWishes();

});

// ==========================================
// 3. FITUR SUPABASE: FETCH & SUBMIT UCAPAN
// ==========================================

async function fetchWishes() {
    const wishesList = document.getElementById('wishesList');
    const countBadge = document.getElementById('wishCount');
    if (!wishesList) return;

    try {
        const { data: wishes, error } = await supabaseClient
            .from('wishes')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        wishesList.innerHTML = ''; 

        if (wishes && wishes.length > 0) {
            if (countBadge) countBadge.innerHTML = `<i class="bi bi-chat-heart-fill me-1"></i> ${wishes.length} Doa Restu`;

            wishes.forEach(item => {
                appendWishCard(item.name, item.message, item.created_at);
            });
        } else {
            if (countBadge) countBadge.innerHTML = `<i class="bi bi-chat-heart me-1"></i> 0 Doa Restu`;
            wishesList.innerHTML = '<p class="text-center text-muted small py-3 mb-0">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p>';
        }
    } catch (err) {
        console.error('Gagal mengambil ucapan:', err.message);
        wishesList.innerHTML = '<p class="text-center text-muted small py-3 mb-0"><i class="bi bi-exclamation-circle me-1"></i> Gagal terhubung ke database.</p>';
    }
}

async function submitWish(event) {
    event.preventDefault();

    const nameInput = document.getElementById('guestName');
    const messageInput = document.getElementById('guestMessage');
    const submitBtn = event.target.querySelector('button[type="submit"]');

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !message) return;

    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="bi bi-arrow-repeat spin-icon me-1"></i> Mengirim...';

    try {
        const { data, error } = await supabaseClient
            .from('wishes')
            .insert([{ name: name, message: message }])
            .select();

        if (error) throw error;

        nameInput.value = '';
        messageInput.value = '';

        if (data && data.length > 0) {
            appendWishCard(data[0].name, data[0].message, data[0].created_at, true);
        }

        submitBtn.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Terkirim!';
        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnText;
            fetchWishes();
        }, 1800);

    } catch (err) {
        console.error('Gagal mengirim ucapan:', err.message);
        alert('Gagal mengirim ucapan. Silakan coba lagi.');
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

function appendWishCard(name, message, createdAt, isNew = false) {
    const wishesList = document.getElementById('wishesList');
    if (!wishesList) return;

    if (wishesList.querySelector('p.text-muted')) {
        wishesList.innerHTML = '';
    }

    const wishCard = document.createElement('div');
    wishCard.className = 'wish-item-card';

    wishCard.innerHTML = `
        <h6 class="wish-author-name mb-1">${escapeHtml(name)}</h6>
        <p class="wish-text mb-1">${escapeHtml(message)}</p>
        <small class="wish-time">${formatDate(createdAt)}</small>
    `;

    if (isNew) {
        wishCard.style.opacity = '0';
        wishCard.style.transform = 'translateY(-18px) scale(0.95)';
        wishCard.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';

        wishesList.insertBefore(wishCard, wishesList.firstChild);

        requestAnimationFrame(() => {
            setTimeout(() => {
                wishCard.style.opacity = '1';
                wishCard.style.transform = 'translateY(0) scale(1)';
            }, 30);
        });
    } else {
        wishesList.appendChild(wishCard);
    }
}

function formatDate(dateString) {
    if (!dateString) return 'Baru saja';
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'Baru saja';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    
    return date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });
}

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

// ==========================================
// 4. FITUR COPY NO REKENING & EFEK KETUK KARTU
// ==========================================
function copyFromImage(accountNumber, cardElement) {
    navigator.clipboard.writeText(accountNumber).then(function() {
        const popout = cardElement.querySelector('.popout-copy-badge');
        
        cardElement.style.transition = 'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        cardElement.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            cardElement.style.transform = 'scale(1)';
        }, 150);

        if (popout) {
            if (cardElement._popoutTimeout) clearTimeout(cardElement._popoutTimeout);

            popout.classList.add('show-popout');
            
            cardElement._popoutTimeout = setTimeout(function() {
                popout.classList.remove('show-popout');
            }, 1800);
        }
    }).catch(function(err) {
        console.error('Gagal menyalin rekening: ', err);
    });
}

// ==========================================
// KONTROL MUSIC
// ==========================================
const audio = document.getElementById('weddingMusic');
const musicBtn = document.getElementById('musicToggleBtn');

if (audio && musicBtn) {
    audio.volume = 0.3;
    let isPlaying = false;

    function playAudio() {
        if (isPlaying) return;
        audio.play().then(() => {
            isPlaying = true;
            musicBtn.classList.remove('paused');
        }).catch(err => {
            console.log("Autoplay ditahan browser:", err);
        });
    }

    function pauseAudio() {
        audio.pause();
        isPlaying = false;
        musicBtn.classList.add('paused');
    }

    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('playMusic') === 'true') {
        playAudio();
    }

    function startMusicOnInteraction() {
        playAudio();
        window.removeEventListener('touchstart', startMusicOnInteraction);
        window.removeEventListener('click', startMusicOnInteraction);
        const scrollContainer = document.getElementById('scrollContainer');
        if (scrollContainer) {
            scrollContainer.removeEventListener('scroll', startMusicOnInteraction);
        }
    }

    window.addEventListener('touchstart', startMusicOnInteraction, { once: true });
    window.addEventListener('click', startMusicOnInteraction, { once: true });
    
    const scrollContainer = document.getElementById('scrollContainer');
    if (scrollContainer) {
        scrollContainer.addEventListener('scroll', startMusicOnInteraction, { once: true });
    }

    musicBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        if (isPlaying) {
            pauseAudio();
        } else {
            playAudio();
        }
    });
}

function makeCanvasFullScreen() {
    const canvas = document.querySelector('.card-canvas');
    if (!canvas) return;

    if (window.innerWidth <= 576) {
        // Matikan efek scale agar kanvas murni memenuhi 100% tinggi & lebar HP
        canvas.style.transform = 'none';
        canvas.style.width = '100vw';
        canvas.style.height = `${window.innerHeight}px`;
    } else {
        canvas.style.width = '';
        canvas.style.height = '';
    }
}

window.addEventListener('resize', makeCanvasFullScreen);
document.addEventListener('DOMContentLoaded', makeCanvasFullScreen);
makeCanvasFullScreen();