document.addEventListener("DOMContentLoaded", function () {

    // 1. AUTO FIT CARD SCALE
    function autoFitCard() {
        const card = document.querySelector('.card-canvas');
        if (!card) return;

        const originalWidth = 480;
        const originalHeight = 750;
        const paddingMargin = 20;

        const availableWidth = window.innerWidth - paddingMargin;
        const availableHeight = window.innerHeight - paddingMargin;

        const scaleX = availableWidth / originalWidth;
        const scaleY = availableHeight / originalHeight;
        
        let scale = Math.min(scaleX, scaleY);
        if (scale > 1) scale = 1;

        card.style.transform = `scale(${scale})`;
    }

    autoFitCard();
    window.addEventListener('resize', autoFitCard);

    // 2. COUNTDOWN TIMER ACARA
    const targetDate = new Date("October 17, 2026 08:00:00").getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference > 0) {
            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            const dEl = document.getElementById("days");
            const hEl = document.getElementById("hours");
            const mEl = document.getElementById("minutes");
            const sEl = document.getElementById("seconds");

            if (dEl) dEl.innerText = days < 10 ? "0" + days : days;
            if (hEl) hEl.innerText = hours < 10 ? "0" + hours : hours;
            if (mEl) mEl.innerText = minutes < 10 ? "0" + minutes : minutes;
            if (sEl) sEl.innerText = seconds < 10 ? "0" + seconds : seconds;
        }
    }

    setInterval(updateCountdown, 1000);
    updateCountdown();

    // 3. SLIDESHOW CAROUSEL
    const weddingCarousel = document.querySelector('#weddingCarousel');
    if (weddingCarousel && typeof bootstrap !== 'undefined') {
        new bootstrap.Carousel(weddingCarousel, {
            interval: 2000,
            ride: 'carousel',
            pause: false
        });
    }

    // ANIMASI STRIP FOTO PAGE 2 (MATIUS 19:6 - MUTER SEAMLESS TANPA GAP)
    const trackTop = document.getElementById('trackTop');
    const trackBottom = document.getElementById('trackBottom');

    if (trackTop) {
        // Track Atas: Muter mulus terus ke KANAN
        trackTop.animate([
            { transform: 'translateX(-33.333%)' },
            { transform: 'translateX(0%)' }
        ], {
            duration: 18000,
            easing: 'linear',
            iterations: Infinity
        });
    }

    if (trackBottom) {
        // Track Bawah: Muter mulus terus ke KIRI
        trackBottom.animate([
            { transform: 'translateX(0%)' },
            { transform: 'translateX(-33.333%)' }
        ], {
            duration: 18000,
            easing: 'linear',
            iterations: Infinity
        });
    }

    // 5. ANIMASI BUNGA PAGE 3 (KIRI ATAS - GOYANG SEAMLESS)
    const pageGroom = document.querySelector('#pageGroom');
    const groomFlower = document.querySelector('.flower-top-left');

    if (pageGroom && groomFlower) {
        let hasAnimated = false;

        // Poros kuncian di POJOK KIRI ATAS
        groomFlower.style.transformOrigin = 'top left';
        groomFlower.style.opacity = '0';
        groomFlower.style.transform = 'translate(-40px, -40px)';

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !hasAnimated) {
                    hasAnimated = true;

                    // ANIMASI 1: Bunga Masuk dari Kiri Atas
                    const enterAnimation = groomFlower.animate([
                        { opacity: 0, transform: 'translate(-40px, -40px) rotate(0deg)' },
                        { opacity: 1, transform: 'translate(0, 0) rotate(0deg)' }
                    ], {
                        duration: 1200,
                        easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                        fill: 'forwards'
                    });

                    // ANIMASI 2: Gerakan Bergoyang Halus dari Poros Kiri Atas
                    enterAnimation.onfinish = () => {
                        groomFlower.animate([
                            { transform: 'rotate(0deg)', offset: 0 },
                            { transform: 'rotate(2.2deg)', offset: 0.25 }, /* Meliuk ke kanan */
                            { transform: 'rotate(0deg)', offset: 0.50 },
                            { transform: 'rotate(-1.8deg)', offset: 0.75 }, /* Meliuk ke kiri */
                            { transform: 'rotate(0deg)', offset: 1.0 }
                        ], {
                            duration: 5000,
                            easing: 'linear',
                            iterations: Infinity
                        });
                    };
                }
            });
        }, {
            threshold: 0.3
        });

        observer.observe(pageGroom);
    }

    // 5. ANIMASI BUNGA BAWAH PAGE 4 (DESSY: DIPERBESAR scale(1.35) & GOYANG HALUS)
        const pageBride = document.querySelector('#pageBride');
        const brideFlower = document.querySelector('#brideFlower');

        if (pageBride && brideFlower) {
            let hasAnimatedBride = false;

            // Kunci pangkal bawah mati di dasar
            brideFlower.style.transformOrigin = 'bottom center';
            brideFlower.style.opacity = '0';
            brideFlower.style.transform = 'translateY(25px) scale(1.35) rotate(0deg)';

            const observerBride = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimatedBride) {
                        hasAnimatedBride = true;

                        // 1. ANIMASI MASUK: Bunga naik dari dasar sambil membesar scale(1.35)
                        const enterAnimation = brideFlower.animate([
                            { opacity: 0, transform: 'translateY(25px) scale(1.35) rotate(0deg)' },
                            { opacity: 1, transform: 'translateY(0px) scale(1.35) rotate(0deg)' }
                        ], {
                            duration: 1200,
                            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                            fill: 'forwards'
                        });

                        // 2. ANIMASI LOOP: Ayunan lembut kiri-kanan tetap dalam ukuran scale(1.35)
                        enterAnimation.onfinish = () => {
                            brideFlower.animate([
                                { transform: 'scale(1.35) rotate(0deg)', offset: 0 },
                                { transform: 'scale(1.35) rotate(-1.2deg)', offset: 0.25 }, /* Liuk tipis ke kiri */
                                { transform: 'scale(1.35) rotate(0deg)', offset: 0.50 },
                                { transform: 'scale(1.35) rotate(1.2deg)', offset: 0.75 },  /* Liuk tipis ke kanan */
                                { transform: 'scale(1.35) rotate(0deg)', offset: 1.0 }
                            ], {
                                duration: 5500,       /* Ayunan sangat lembut */
                                easing: 'linear',
                                iterations: Infinity
                            });
                        };
                    }
                });
            }, {
                threshold: 0.3
            });

            observerBride.observe(pageBride);
        }
        // 7. SMOOTH WHEEL SCROLL ENHANCER (MENGHALUSKAN TRANSISI ANTAR HALAMAN)
        const scrollContainer = document.querySelector('.scroll-container');
        if (scrollContainer) {
            let isScrolling = false;

            scrollContainer.addEventListener('wheel', function(e) {
                // Mencegah benturan event scroll default yang patah-patah
                if (isScrolling) return;

                const pageHeight = 750; // Tinggi pasti per halaman
                const currentScroll = scrollContainer.scrollTop;
                
                // Tentukan arah scroll (ke bawah atau ke atas)
                if (e.deltaY > 0 && currentScroll % pageHeight < 50) {
                    // Scroll ke halaman berikutnya dengan halus
                    isScrolling = true;
                    scrollContainer.scrollBy({
                        top: pageHeight,
                        behavior: 'smooth'
                    });
                    setTimeout(() => { isScrolling = false; }, 400); // Jeda waktu transisi aman
                } else if (e.deltaY < 0 && currentScroll % pageHeight > pageHeight - 50) {
                    // Scroll ke halaman sebelumnya dengan halus
                    isScrolling = true;
                    scrollContainer.scrollBy({
                        top: -pageHeight,
                        behavior: 'smooth'
                    });
                    setTimeout(() => { isScrolling = false; }, 400);
                }
            }, { passive: true });
        }
        // 8. ANIMASI BUNGA PAGE 5 (PEMBERKATAN: GOYANG KIRI KANAN HALUS)
        const pagePemberkatan = document.querySelector('#pagePemberkatan');
        const pemberkatanFlower = document.querySelector('#pemberkatanFlower');

        if (pagePemberkatan && pemberkatanFlower) {
            let hasAnimatedPemberkatan = false;

            pemberkatanFlower.style.transformOrigin = 'bottom center';
            pemberkatanFlower.style.opacity = '0';
            pemberkatanFlower.style.transform = 'translateY(20px) scale(1.05) rotate(0deg)';

            const observerPemberkatan = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimatedPemberkatan) {
                        hasAnimatedPemberkatan = true;

                        // 1. Animasi Masuk
                        const enterAnimation = pemberkatanFlower.animate([
                            { opacity: 0, transform: 'translateY(20px) scale(1.05) rotate(0deg)' },
                            { opacity: 1, transform: 'translateY(0px) scale(1.05) rotate(0deg)' }
                        ], {
                            duration: 1200,
                            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                            fill: 'forwards'
                        });

                        // 2. Animasi Goyang Rumput
                        enterAnimation.onfinish = () => {
                            pemberkatanFlower.animate([
                                { transform: 'scale(1.05) rotate(0deg)', offset: 0 },
                                { transform: 'scale(1.05) rotate(-1.2deg)', offset: 0.25 },
                                { transform: 'scale(1.05) rotate(0deg)', offset: 0.50 },
                                { transform: 'scale(1.05) rotate(1.2deg)', offset: 0.75 },
                                { transform: 'scale(1.05) rotate(0deg)', offset: 1.0 }
                            ], {
                                duration: 5500,
                                easing: 'linear',
                                iterations: Infinity
                            });
                        };
                    }
                });
            }, {
                threshold: 0.3
            });

            observerPemberkatan.observe(pagePemberkatan);
        }
        
        // 9. ANIMASI BUNGA PAGE 6 (RESEPSI: GOYANG KIRI KANAN HALUS)
        const pageResepsi = document.querySelector('#pageResepsi');
        const resepsiFlower = document.querySelector('#resepsiFlower');

        if (pageResepsi && resepsiFlower) {
            let hasAnimatedResepsi = false;

            resepsiFlower.style.transformOrigin = 'bottom center';
            resepsiFlower.style.opacity = '0';
            resepsiFlower.style.transform = 'translateY(20px) scale(1.05) rotate(0deg)';

            const observerResepsi = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !hasAnimatedResepsi) {
                        hasAnimatedResepsi = true;

                        // 1. Animasi Masuk
                        const enterAnimation = resepsiFlower.animate([
                            { opacity: 0, transform: 'translateY(20px) scale(1.05) rotate(0deg)' },
                            { opacity: 1, transform: 'translateY(0px) scale(1.05) rotate(0deg)' }
                        ], {
                            duration: 1200,
                            easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
                            fill: 'forwards'
                        });

                        // 2. Animasi Goyang Rumput
                        enterAnimation.onfinish = () => {
                            resepsiFlower.animate([
                                { transform: 'scale(1.05) rotate(0deg)', offset: 0 },
                                { transform: 'scale(1.05) rotate(-1.2deg)', offset: 0.25 },
                                { transform: 'scale(1.05) rotate(0deg)', offset: 0.50 },
                                { transform: 'scale(1.05) rotate(1.2deg)', offset: 0.75 },
                                { transform: 'scale(1.05) rotate(0deg)', offset: 1.0 }
                            ], {
                                duration: 5500,
                                easing: 'linear',
                                iterations: Infinity
                            });
                        };
                    }
                });
            }, {
                threshold: 0.3
            });

            observerResepsi.observe(pageResepsi);
        }
});