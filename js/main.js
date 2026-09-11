// ==========================================
// 1. CONFIG & INITIALIZE SUPABASE
// ==========================================
const SUPABASE_URL = 'https://lrwoorxthpgvlgisolli.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxyd29vcnh0aHBndmxnaXNvbGxpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2NDU3ODMsImV4cCI6MjEwMzIyMTc4M30.s_dZQN1xuHkyjYeFrHvN7dGk6P1vZdpGAAhEytaULRg';

const supabaseClient = supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);


// ==========================================
// EARLY MEDIA HINTS
// ==========================================
// Script berada di akhir HTML, jadi DOM gambar sudah tersedia.
// Async decode mengurangi kemungkinan decode foto besar memblok main thread.
document
    .querySelectorAll('#mainPageStage img')
    .forEach((img) => {
        img.decoding = 'async';
    });

// Semua gambar MAIN yang berada setelah section pertama boleh lazy-load.
// Section pertama tetap eager supaya saat cover naik tampilannya langsung siap.
const firstMainBlockEarly =
    document.querySelector('#mainPageStage .scroll-target-block');

document
    .querySelectorAll('#mainPageStage .scroll-target-block img')
    .forEach((img) => {
        if (
            firstMainBlockEarly &&
            firstMainBlockEarly.contains(img)
        ) {
            return;
        }

        img.loading = 'lazy';
        img.decoding = 'async';
        try {
            img.fetchPriority = 'low';
        } catch (_) {
            // Browser lama cukup mengabaikan hint ini.
        }
    });


// ==========================================
// 2. MAIN INIT
// ==========================================
document.addEventListener('DOMContentLoaded', function () {

    // ==========================================================
    // PERFORMANCE: MAIN baru diinisialisasi saat user menekan
    // Open Invitation. Ini mencegah observer, layout calculation,
    // animasi scroll, dan request database bekerja di balik cover.
    // ==========================================================
    let mainExperienceInitialized = false;

    function initializeMainExperience() {

        if (mainExperienceInitialized) {
            return;
        }

        mainExperienceInitialized = true;

    // ==========================================
    // BACKGROUND PERTAMA
    // ==========================================
    const firstBg = document.getElementById('bg1');

    if (firstBg) {
        firstBg.classList.add('active');
    }


    // ==========================================
    // COUNTDOWN TIMER
    // ==========================================
    const targetDate =
        new Date(
            'October 17, 2026 08:00:00'
        ).getTime();


    function updateCountdown() {

        const now =
            Date.now();


        const difference =
            targetDate -
            now;


        if (
            difference <=
            0
        ) {

            return;
        }


        const days =
            Math.floor(
                difference /
                (
                    1000 *
                    60 *
                    60 *
                    24
                )
            );


        const hours =
            Math.floor(

                (
                    difference %

                    (
                        1000 *
                        60 *
                        60 *
                        24
                    )
                )

                /

                (
                    1000 *
                    60 *
                    60
                )
            );


        const minutes =
            Math.floor(

                (
                    difference %

                    (
                        1000 *
                        60 *
                        60
                    )
                )

                /

                (
                    1000 *
                    60
                )
            );


        const seconds =
            Math.floor(

                (
                    difference %

                    (
                        1000 *
                        60
                    )
                )

                /

                1000
            );


        const dayEl =
            document.getElementById(
                'days'
            );


        const hourEl =
            document.getElementById(
                'hours'
            );


        const minuteEl =
            document.getElementById(
                'minutes'
            );


        const secondEl =
            document.getElementById(
                'seconds'
            );


        if (
            dayEl
        ) {

            dayEl.innerText =

                String(
                    days
                )
                    .padStart(
                        2,
                        '0'
                    );
        }


        if (
            hourEl
        ) {

            hourEl.innerText =

                String(
                    hours
                )
                    .padStart(
                        2,
                        '0'
                    );
        }


        if (
            minuteEl
        ) {

            minuteEl.innerText =

                String(
                    minutes
                )
                    .padStart(
                        2,
                        '0'
                    );
        }


        if (
            secondEl
        ) {

            secondEl.innerText =

                String(
                    seconds
                )
                    .padStart(
                        2,
                        '0'
                    );
        }
    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );


    // ==========================================
    // SCROLL AREA
    // ==========================================

    const scrollContainer =

        document.getElementById(
            'scrollContainer'
        );


    const scrollTargetBlocks =

        Array.from(
            document.querySelectorAll(
                '.scroll-target-block'
            )
        );


    const bgSlides =

        Array.from(
            document.querySelectorAll(
                '.bg-slide'
            )
        );


    if (
        scrollContainer &&
        scrollTargetBlocks.length >
        0
    ) {


        // ========================================================
        // A. TEXT REVEAL
        // ========================================================
        //
        // BAGIAN TEXT DIPERTAHANKAN.
        //
        // ========================================================

        const fadeTextElements =

            Array.from(
                document.querySelectorAll(
                    [
                        '.scroll-target-block h1',

                        '.scroll-target-block h2',

                        '.scroll-target-block h3',

                        '.scroll-target-block h4',

                        '.scroll-target-block h5',

                        '.scroll-target-block h6',

                        '.scroll-target-block p',

                        '.scroll-target-block label',

                        '.scroll-target-block .countdown-display',

                        '.scroll-target-block .couple-subtitle-script',

                        '.scroll-target-block .couple-tagline',

                        '.scroll-target-block .date-top-month',

                        '.scroll-target-block .date-middle-line',

                        '.scroll-target-block .date-bottom-year',

                        '.scroll-target-block .btn-clean-outline',

                        '.scroll-target-block .btn-olive-pill',

                        '.scroll-target-block .btn-back-home'
                    ].join(',')
                )
            );


        document
            .querySelectorAll(
                '.reveal-element'
            )
            .forEach(
                (
                    element
                ) => {

                    element
                        .classList
                        .add(
                            'active-pop'
                        );
                }
            );


        fadeTextElements
            .forEach(
                (
                    element
                ) => {

                    element
                        .classList
                        .add(
                            'video-fade-text'
                        );


                    element
                        .classList
                        .remove(
                            'active-pop'
                        );


                    element
                        .classList
                        .remove(
                            'is-visible'
                        );
                }
            );


        const firstSection =

            scrollTargetBlocks[0] ||
            null;


        const coverTextElements =

            firstSection

                ?

                fadeTextElements
                    .filter(
                        (
                            element
                        ) => {

                            return (
                                firstSection
                                    .contains(
                                        element
                                    )
                            );
                        }
                    )

                :

                [];


        const scrollTextElements =

            fadeTextElements
                .filter(
                    (
                        element
                    ) => {

                        return !(
                            firstSection &&

                            firstSection
                                .contains(
                                    element
                                )
                        );
                    }
                );


        const coverPhoto =

            firstSection

                ?

                firstSection
                    .querySelector(
                        '.photo-hero-wrapper'
                    )

                :

                null;


        if (
            coverPhoto
        ) {

            coverPhoto
                .classList
                .add(
                    'video-cover-photo'
                );


            coverPhoto
                .classList
                .remove(
                    'active-pop'
                );


            coverPhoto
                .classList
                .remove(
                    'is-visible'
                );
        }


        const coverFlowers =

            firstSection

                ?

                Array.from(

                    firstSection
                        .querySelectorAll(
                            '.hero-flower-bottom-left, .hero-flower-bottom-right'
                        )
                )

                :

                [];


        coverFlowers
            .forEach(
                (
                    flower
                ) => {

                    flower
                        .classList
                        .add(
                            'video-cover-flower'
                        );


                    flower
                        .classList
                        .remove(
                            'is-visible'
                        );
                }
            );


        // ========================================================
        // TEXT OBSERVER
        // ========================================================

        const textFadeObserver =

            new IntersectionObserver(

                (
                    entries
                ) => {

                    entries
                        .forEach(
                            (
                                entry
                            ) => {

                                if (
                                    entry
                                        .isIntersecting
                                ) {

                                    entry
                                        .target
                                        .classList
                                        .add(
                                            'is-visible'
                                        );

                                } else {

                                    entry
                                        .target
                                        .classList
                                        .remove(
                                            'is-visible'
                                        );
                                }
                            }
                        );
                },

                {

                    root:
                        scrollContainer,


                    threshold:
                        [
                            0,
                            0.02
                        ],


                    rootMargin:
                        '0px'
                }
            );


        scrollTextElements
            .forEach(
                (
                    element
                ) => {

                    textFadeObserver
                        .observe(
                            element
                        );
                }
            );


        // ========================================================
        // COVER ENTRANCE — SETELAH OPEN INVITATION
        // ========================================================

        let mainCoverEntranceStarted =
            false;


        function startMainCoverEntrance() {

            // Mencegah entrance berjalan dua kali
            if (
                mainCoverEntranceStarted
            ) {

                return;
            }


            mainCoverEntranceStarted =
                true;


            // ========================================================
            // RESET STATE AWAL
            // ========================================================

            coverTextElements
                .forEach(
                    (
                        element
                    ) => {

                        element
                            .classList
                            .remove(
                                'is-visible'
                            );
                    }
                );


            if (
                coverPhoto
            ) {

                coverPhoto
                    .classList
                    .remove(
                        'is-visible'
                    );
            }


            coverFlowers
                .forEach(
                    (
                        flower
                    ) => {

                        flower
                            .classList
                            .remove(
                                'is-visible'
                            );
                    }
                );


            // ========================================================
            // TUNGGU BROWSER RENDER KONDISI AWAL
            // ========================================================

            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        () => {

                            const weddingSubtitle =
                                firstSection
                                    ? firstSection.querySelector(
                                        '.text-subtitle'
                                    )
                                    : null;


                            const coupleName =
                                firstSection
                                    ? firstSection.querySelector(
                                        '.couple-name'
                                    )
                                    : null;


                            const countdownTitle =
                                firstSection
                                    ? firstSection.querySelector(
                                        '.countdown-title'
                                    )
                                    : null;


                            const countdownDisplay =
                                firstSection
                                    ? firstSection.querySelector(
                                        '.countdown-display'
                                    )
                                    : null;


                            const saveDate =
                                firstSection
                                    ? firstSection.querySelector(
                                        '.btn-olive-pill'
                                    )
                                    : null;


                            // =================================================
                            // THE WEDDING OF
                            // =================================================

                            if (
                                weddingSubtitle
                            ) {

                                setTimeout(
                                    () => {

                                        weddingSubtitle
                                            .classList
                                            .add(
                                                'is-visible'
                                            );

                                    },
                                    30
                                );
                            }


                            // =================================================
                            // STEPHEN & DESSY
                            // =================================================

                            if (
                                coupleName
                            ) {

                                setTimeout(
                                    () => {

                                        coupleName
                                            .classList
                                            .add(
                                                'is-visible'
                                            );

                                    },
                                    70
                                );
                            }


                            // =================================================
                            // FOTO UTAMA
                            // =================================================

                            if (
                                coverPhoto
                            ) {

                                setTimeout(
                                    () => {

                                        coverPhoto
                                            .classList
                                            .add(
                                                'is-visible'
                                            );

                                    },
                                    110
                                );
                            }


                            // =================================================
                            // BUNGA
                            // =================================================

                            coverFlowers
                                .forEach(
                                    (
                                        flower,
                                        flowerIndex
                                    ) => {

                                        setTimeout(
                                            () => {

                                                flower
                                                    .classList
                                                    .add(
                                                        'is-visible'
                                                    );

                                            },
                                            120 +
                                            flowerIndex *
                                            30
                                        );
                                    }
                                );


                            // =================================================
                            // COUNTDOWN TIMER TEXT
                            // =================================================

                            if (
                                countdownTitle
                            ) {

                                setTimeout(
                                    () => {

                                        countdownTitle
                                            .classList
                                            .add(
                                                'is-visible'
                                            );

                                    },
                                    200
                                );
                            }


                            // =================================================
                            // COUNTDOWN BOX
                            // =================================================

                            if (
                                countdownDisplay
                            ) {

                                setTimeout(
                                    () => {

                                        countdownDisplay
                                            .classList
                                            .add(
                                                'is-visible'
                                            );

                                    },
                                    240
                                );
                            }


                            // =================================================
                            // SAVE THE DATE
                            // =================================================

                            if (
                                saveDate
                            ) {

                                setTimeout(
                                    () => {

                                        saveDate
                                            .classList
                                            .add(
                                                'is-visible'
                                            );

                                    },
                                    640
                                );
                            }


                            // =================================================
                            // ELEMEN LAIN DI SECTION PERTAMA
                            // =================================================

                            coverTextElements
                                .forEach(
                                    (
                                        element
                                    ) => {

                                        if (
                                            element === weddingSubtitle ||
                                            element === coupleName ||
                                            element === countdownTitle ||
                                            element === countdownDisplay ||
                                            element === saveDate
                                        ) {

                                            return;
                                        }


                                        setTimeout(
                                            () => {

                                                element
                                                    .classList
                                                    .add(
                                                        'is-visible'
                                                    );

                                            },
                                            540
                                        );
                                    }
                                );
                        }
                    );
                }
            );


            // ========================================================
            // SETELAH ENTRANCE SELESAI,
            // OBSERVER BOLEH MENGAMBIL ALIH LAGI
            // ========================================================

            setTimeout(
                () => {

                    coverTextElements
                        .forEach(
                            (
                                element
                            ) => {

                                textFadeObserver
                                    .observe(
                                        element
                                    );
                            }
                        );

                },
                1400
            );


            // ========================================================
            // OBSERVER FOTO
            // ========================================================

            if (
                coverPhoto
            ) {

                const coverPhotoObserver =
                    new IntersectionObserver(

                        (
                            entries
                        ) => {

                            entries
                                .forEach(
                                    (
                                        entry
                                    ) => {

                                        if (
                                            entry.isIntersecting
                                        ) {

                                            entry.target
                                                .classList
                                                .add(
                                                    'is-visible'
                                                );

                                        } else {

                                            entry.target
                                                .classList
                                                .remove(
                                                    'is-visible'
                                                );
                                        }
                                    }
                                );
                        },

                        {
                            root:
                                scrollContainer,

                            threshold:
                                [
                                    0,
                                    0.02
                                ],

                            rootMargin:
                                '0px'
                        }
                    );


                setTimeout(
                    () => {

                        coverPhotoObserver
                            .observe(
                                coverPhoto
                            );

                    },
                    1400
                );
            }
        }


        // ========================================================
        // TUNGGU EVENT DARI INDEX.JS
        // ========================================================

        document.addEventListener(
            'invitation:main-enter',
            startMainCoverEntrance,
            {
                once:
                    true
            }
        );

        // ========================================================
        // B. BACKGROUND
        // ========================================================

        bgSlides
            .forEach(
                (
                    slide
                ) => {

                    slide
                        .classList
                        .remove(
                            'active'
                        );


                    slide
                        .style
                        .setProperty(
                            'opacity',
                            '0',
                            'important'
                        );


                    slide
                        .style
                        .setProperty(
                            'visibility',
                            'hidden',
                            'important'
                        );


                    slide
                        .style
                        .setProperty(
                            'transform',
                            'none',
                            'important'
                        );
                }
            );


        let currentBgId =
            null;


        function showBackground(
            bgId
        ) {

            let target =
                null;


            if (
                bgId
            ) {

                const candidate =

                    document
                        .getElementById(
                            bgId
                        );


                if (
                    candidate &&

                    candidate
                        .classList
                        .contains(
                            'bg-slide'
                        )
                ) {

                    target =
                        candidate;
                }
            }


            const nextId =

                target

                    ?

                    target.id

                    :

                    null;


            if (
                nextId ===
                currentBgId
            ) {

                return;
            }


            const previous =
                currentBgId
                    ? document.getElementById(currentBgId)
                    : null;


            currentBgId =
                nextId;


            // Hanya target + background sebelumnya yang tetap dirender.
            // Cross-fade visual tetap sama, tetapi 5-6 layer gambar fullscreen
            // lain tidak lagi ikut dikomposisi GPU di HP.
            bgSlides
                .forEach(
                    (
                        slide
                    ) => {

                        slide
                            .style
                            .setProperty(
                                'transform',
                                'none',
                                'important'
                            );

                        slide
                            .classList
                            .remove(
                                'bg-fading-out'
                            );

                        if (
                            target &&
                            slide ===
                            target
                        ) {

                            slide
                                .style
                                .setProperty(
                                    'visibility',
                                    'visible',
                                    'important'
                                );

                            slide
                                .classList
                                .add(
                                    'active'
                                );

                            slide
                                .style
                                .setProperty(
                                    'opacity',
                                    '0.76',
                                    'important'
                                );

                        } else if (
                            previous &&
                            slide === previous
                        ) {

                            slide
                                .classList
                                .remove(
                                    'active'
                                );

                            slide
                                .classList
                                .add(
                                    'bg-fading-out'
                                );

                            slide
                                .style
                                .setProperty(
                                    'visibility',
                                    'visible',
                                    'important'
                                );

                            slide
                                .style
                                .setProperty(
                                    'opacity',
                                    '0',
                                    'important'
                                );

                            setTimeout(
                                () => {
                                    if (
                                        !slide.classList.contains('active') &&
                                        slide.classList.contains('bg-fading-out')
                                    ) {
                                        slide.classList.remove('bg-fading-out');
                                        slide.style.setProperty(
                                            'visibility',
                                            'hidden',
                                            'important'
                                        );
                                    }
                                },
                                620
                            );

                        } else {

                            slide
                                .classList
                                .remove(
                                    'active'
                                );

                            slide
                                .style
                                .setProperty(
                                    'opacity',
                                    '0',
                                    'important'
                                );

                            slide
                                .style
                                .setProperty(
                                    'visibility',
                                    'hidden',
                                    'important'
                                );
                        }
                    }
                );
        }


        // ========================================================
        // BACKGROUND FOCUS
        // ========================================================

        function getSectionAtViewportFocus(
            containerRect
        ) {

            containerRect =
                containerRect ||
                scrollContainer.getBoundingClientRect();


            const focusY =

                containerRect.top +

                containerRect.height *
                0.46;


            let chosen =
                null;


            let bestDistance =
                Infinity;


            scrollTargetBlocks
                .forEach(
                    (
                        section
                    ) => {

                        const rect =

                            section
                                .getBoundingClientRect();


                        if (
                            rect.bottom <=
                            containerRect.top

                            ||

                            rect.top >=
                            containerRect.bottom
                        ) {

                            return;
                        }


                        const sectionCenter =

                            rect.top +

                            rect.height /
                            2;


                        const distance =

                            Math.abs(

                                sectionCenter -
                                focusY
                            );


                        if (
                            distance <
                            bestDistance
                        ) {

                            bestDistance =
                                distance;


                            chosen =
                                section;
                        }
                    }
                );


            return chosen;
        }


        function updateBackgroundFromScroll(
            containerRect
        ) {

            const section =

                getSectionAtViewportFocus(
                    containerRect
                );


            const bgId =

                section

                    ?

                    section
                        .getAttribute(
                            'data-bg'
                        )

                    :

                    null;


            showBackground(
                bgId
            );
        }


        // ========================================================
        // F. SUPER SMOOTH GROUP FLOWER MOTION
        // ========================================================
        //
        // SEKARANG ANIMASI BUKAN DIHITUNG PER BUNGA.
        //
        // TAPI BERDASARKAN PARENT / CARD.
        //
        // CONTOH:
        //
        // DESSY CARD
        // ├─ burung atas
        // └─ bunga bawah
        //
        // keduanya menggunakan progress YANG SAMA.
        //
        // UCAPAN:
        // bunga atas + bunga bawah = SATU GROUP.
        //
        // THANK YOU:
        // bunga kiri atas + bunga kanan bawah = SATU GROUP.
        //
        // ========================================================


        // ========================================================
        // F1. CONFIG GROUP
        // ========================================================

        const flowerGroupConfigs = [

            // ====================================================
            // COVER
            // ====================================================

            {
                name:
                    'cover',

                container:
                    firstSection,

                intro:
                    true,

                flowers:
                    [
                        {
                            selector:
                                '.hero-flower-bottom-left',

                            enterX:
                                -20,

                            enterY:
                                14,

                            startScale:
                                0.94
                        },

                        {
                            selector:
                                '.hero-flower-bottom-right',

                            enterX:
                                20,

                            enterY:
                                14,

                            startScale:
                                0.94
                        }
                    ]
            },


            // ====================================================
            // MATIUS
            // ====================================================

            {
                name:
                    'verse',

                container:
                    document.querySelector(
                        '.verse-clean-card'
                    ),

                flowers:
                    [
                        {
                            selector:
                                '.verse-flower-left',

                            enterX:
                                -18,

                            enterY:
                                5,

                            startScale:
                                0.95
                        },

                        {
                            selector:
                                '.verse-flower-right',

                            enterX:
                                18,

                            enterY:
                                5,

                            startScale:
                                0.95
                        }
                    ]
            },


            // ====================================================
            // STEPHEN
            // ====================================================

            {
                name:
                    'stephen',

                container:
                    document.querySelector(
                        '.scroll-target-block[data-bg="bg3"] .couple-profile-card'
                    ),

                flowers:
                    [
                        {
                            selector:
                                '.arch-flower-top-left',

                            enterX:
                                -16,

                            enterY:
                                -10,

                            startScale:
                                0.94
                        }
                    ]
            },


            // ====================================================
            // DESSY
            //
            // INI PENTING:
            //
            // BURUNG + BUNGA BAWAH
            // SEKARANG SATU ANIMASI.
            // ====================================================

            {
                name:
                    'dessy',

                container:
                    document.querySelector(
                        '.scroll-target-block[data-bg="bg4"] .couple-profile-card'
                    ),

                flowers:
                    [
                        {
                            selector:
                                '.bride-birds-top-left',

                            enterX:
                                -14,

                            enterY:
                                -8,

                            startScale:
                                0.96
                        },

                        {
                            selector:
                                '.bride-flower-bottom',

                            enterX:
                                0,

                            enterY:
                                18,

                            startScale:
                                0.96
                        }
                    ]
            },


            // ====================================================
            // PEMBERKATAN
            // ====================================================

            {
                name:
                    'pemberkatan',

                container:
                    document.querySelector(
                        '.event-pemberkatan-card'
                    ),

                flowers:
                    [
                        {
                            selector:
                                '.pemberkatan-flower-left',

                            enterX:
                                -22,

                            enterY:
                                16,

                            startScale:
                                0.93,

                            // Bunga tetap hidup sampai Resepsi selesai
                            persistUntilReceptionEnd:
                                true
                        },


                        {
                            selector:
                                '.pemberkatan-flower-right',

                            enterX:
                                22,

                            enterY:
                                16,

                            startScale:
                                0.93,

                            // Bunga tetap hidup sampai Resepsi selesai
                            persistUntilReceptionEnd:
                                true
                        },
                    ]
            },


            // ====================================================
            // GALLERY
            // ====================================================

            {
                name:
                    'gallery',

                container:
                    document.querySelector(
                        '.gallery-clean-card'
                    ),

                flowers:
                    [
                        {
                            selector:
                                '.gallery-flower-bottom',

                            enterX:
                                0,

                            enterY:
                                20,

                            startScale:
                                0.97
                        }
                    ]
            },


            // ====================================================
            // WEDDING GIFT
            // ====================================================

            {
                name:
                    'gift',

                container:
                    document.querySelector(
                        '.gift-clean-card'
                    ),

                flowers:
                    [
                        {
                            selector:
                                '.gift-flower-left-new',

                            enterX:
                                -18,

                            enterY:
                                8,

                            startScale:
                                0.95
                        },

                        {
                            selector:
                                '.gift-flower-right-new',

                            enterX:
                                18,

                            enterY:
                                8,

                            startScale:
                                0.95
                        }
                    ]
            },


            // ====================================================
            // UCAPAN
            //
            // BUNGA ATAS + BUNGA BAWAH
            // SATU GROUP / SATU TIMING.
            // ====================================================

            {
                name:
                    'wishes',

                container:
                    document.querySelector(
                        '.wishes-clean-card'
                    ),

                flowers:
                    [
                        {
                            selector:
                                '.wishes-flower-top-right',

                            enterX:
                                16,

                            enterY:
                                -9,

                            startScale:
                                0.95
                        },

                        {
                            selector:
                                '.wishes-flower-bottom',

                            enterX:
                                0,

                            enterY:
                                18,

                            startScale:
                                0.97
                        }
                    ]
            },


            // ====================================================
            // THANK YOU
            //
            // BUNGA ATAS + BUNGA BAWAH
            // SATU GROUP / SATU TIMING.
            // ====================================================

            {
                name:
                    'thankyou',

                container:
                    document.querySelector(
                        '.thankyou-card-wrapper'
                    ),

                flowers:
                    [
                        {
                            selector:
                                '.ty-flower-top-left',

                            enterX:
                                -16,

                            enterY:
                                -10,

                            startScale:
                                0.95
                        },

                        {
                            selector:
                                '.ty-flower-bottom-right',

                            enterX:
                                16,

                            enterY:
                                14,

                            startScale:
                                0.96
                        }
                    ]
            }
        ];


        // ========================================================
        // F2. CLAMP
        // ========================================================

        function clampFlower(
            value
        ) {

            return Math.max(
                0,
                Math.min(
                    1,
                    value
                )
            );
        }


        // ========================================================
        // F3. SMOOTHERSTEP
        // ========================================================
        //
        // LEBIH LEMBUT DARI EASE BIASA.
        //
        // awal sangat pelan
        // tengah flowing
        // akhir sangat pelan
        //
        // ========================================================

        function smoothFlower(
            value
        ) {

            const x =
                clampFlower(
                    value
                );


            return (
                x *
                x *
                x *
                (
                    x *
                    (
                        x *
                        6
                        -
                        15
                    )
                    +
                    10
                )
            );
        }


        // ========================================================
        // F4. SETUP GROUP
        // ========================================================

        const flowerGroups =
            [];


        flowerGroupConfigs.forEach(
            (
                groupConfig
            ) => {

                // COVER punya animasi entrance sendiri
                // Jangan diproses oleh cinematic flower system
                if (
                    groupConfig.name === 'cover'
                ) {
                    return;
                }


                if (
                    !groupConfig.container
                ) {

                    return;
                }


                const group = {

                    name:
                        groupConfig.name,

                    container:
                        groupConfig.container,

                    intro:
                        Boolean(
                            groupConfig.intro
                        ),

                    currentProgress:
                        0,

                    flowers:
                        []
                };


                groupConfig.flowers.forEach(
                    (
                        flowerConfig
                    ) => {

                        /*
                        * Cari bunga di dalam
                        * parent/card group tersebut.
                        */
                        let element =

                            groupConfig.container
                                .querySelector(
                                    flowerConfig.selector
                                );


                        /*
                        * Fallback untuk ornamen
                        * yang secara DOM mungkin
                        * berada sedikit di luar parent.
                        */
                        if (
                            !element
                        ) {

                            element =

                                document.querySelector(
                                    flowerConfig.selector
                                );
                        }


                        if (
                            !element
                        ) {

                            return;
                        }


                        // =========================================
                        // HAPUS MOTION LAMA
                        // =========================================

                        element.classList.remove(
                            'video-cover-flower'
                        );


                        element.classList.remove(
                            'is-visible'
                        );


                        element.classList.remove(
                            'flower-cinematic'
                        );


                        // =========================================
                        // SIMPAN OPACITY DESIGN ASLI
                        // =========================================

                        const originalOpacity =

                            parseFloat(

                                getComputedStyle(
                                    element
                                ).opacity
                            );


                        const finalOpacity =

                            Number.isFinite(
                                originalOpacity
                            )

                                ? originalOpacity

                                : 1;


                        // =========================================
                        // INLINE MOTION
                        // =========================================
                        //
                        // transform CSS asli TIDAK disentuh.
                        //
                        // Jadi:
                        //
                        // rotate(...)
                        // scaleX(-1)
                        // translateX(-50%)
                        //
                        // tetap aman.
                        //
                        // =========================================

                        element.style.setProperty(
                            'transition',
                            'none',
                            'important'
                        );


                        element.style.setProperty(
                            'visibility',
                            'visible',
                            'important'
                        );


                        element.style.setProperty(
                            'will-change',
                            'opacity, translate, scale',
                            'important'
                        );


                        element.style.setProperty(
                            'opacity',
                            '0',
                            'important'
                        );


                        element.style.setProperty(
                            'translate',

                            `${flowerConfig.enterX}px ${flowerConfig.enterY}px`,

                            'important'
                        );


                        element.style.setProperty(
                            'scale',

                            String(
                                flowerConfig.startScale
                            ),

                            'important'
                        );


                        /*
                        * Tidak ada rotate tambahan.
                        *
                        * Supaya tidak goyang kasar.
                        */
                        element.style.removeProperty(
                            'rotate'
                        );


                        group.flowers.push(
                            {

                                element:
                                    element,

                                config:
                                    flowerConfig,

                                finalOpacity:
                                    finalOpacity
                            }
                        );
                    }
                );


                if (
                    group.flowers.length >
                    0
                ) {

                    flowerGroups.push(
                        group
                    );
                }
            }
        );


        // ========================================================
        // F5. TARGET PROGRESS BERDASARKAN PARENT
        // ========================================================
        //
        // INI BEDANYA DENGAN VERSI SEBELUMNYA.
        //
        // Dulu:
        //
        // bride-birds
        // menghitung posisinya sendiri.
        //
        // bride-flower-bottom
        // menghitung posisinya sendiri.
        //
        // hasil:
        // timing BEDA.
        //
        //
        //
        // Sekarang:
        //
        // seluruh Dessy card
        // menghasilkan SATU progress.
        //
        // progress tersebut dipakai:
        //
        // burung atas
        // +
        // bunga bawah.
        //
        // ========================================================

        function getFlowerGroupTarget(
            group,
            viewport
        ) {

            viewport =
                viewport ||
                scrollContainer.getBoundingClientRect();


            // ========================================================
            // KHUSUS BUNGA PEMISAH
            // PEMBERKATAN → RESEPSI
            // ========================================================
            //
            // Kalau salah satu bunga dalam group
            // punya:
            //
            // persistUntilReceptionEnd: true
            //
            // maka:
            //
            // Pemberkatan masuk
            //        ↓
            // bunga muncul
            //
            // Pemberkatan selesai
            //        ↓
            // bunga TETAP ADA
            //
            // Resepsi berlangsung
            //        ↓
            // bunga TETAP ADA
            //
            // akhir Resepsi lewat
            //        ↓
            // bunga baru fade out
            //
            // ========================================================

            const persistUntilReceptionEnd =

                group.flowers.some(
                    (
                        flower
                    ) => {

                        return Boolean(

                            flower.config
                                .persistUntilReceptionEnd
                        );
                    }
                );


            if (
                persistUntilReceptionEnd
            ) {

                // ====================================================
                // SECTION PEMBERKATAN
                // ====================================================

                const pemberkatanSection =

                    group.container
                        .closest(
                            '.scroll-target-block'
                        );


                // ====================================================
                // SECTION RESEPSI
                // ====================================================
                //
                // Di HTML kamu:
                //
                // Pemberkatan
                // ↓
                // Resepsi
                //
                // jadi nextElementSibling.
                //
                // ====================================================

                let resepsiSection =

                    pemberkatanSection

                        ? pemberkatanSection
                            .nextElementSibling

                        : null;


                /*
                * Pengaman:
                * kalau next sibling ternyata
                * bukan scroll-target-block,
                * cari sibling berikutnya.
                */
                while (
                    resepsiSection &&

                    !resepsiSection
                        .classList
                        .contains(
                            'scroll-target-block'
                        )
                ) {

                    resepsiSection =

                        resepsiSection
                            .nextElementSibling;
                }


                if (
                    pemberkatanSection &&
                    resepsiSection
                ) {

                    const pemberkatanRect =

                        pemberkatanSection
                            .getBoundingClientRect();


                    const resepsiRect =

                        resepsiSection
                            .getBoundingClientRect();


                    const viewportHeight =

                        Math.max(
                            1,
                            viewport.height
                        );


                    // ====================================================
                    // MASUK SAAT PEMBERKATAN MULAI DATANG
                    // ====================================================

                    const enterStart =

                        viewport.bottom;


                    const enterEnd =

                        viewport.bottom -

                        viewportHeight *
                        0.30;


                    let enterProgress;


                    if (
                        pemberkatanRect.top >=
                        enterStart
                    ) {

                        enterProgress =
                            0;

                    } else if (
                        pemberkatanRect.top <=
                        enterEnd
                    ) {

                        enterProgress =
                            1;

                    } else {

                        enterProgress =

                            clampFlower(

                                (
                                    enterStart -

                                    pemberkatanRect.top
                                )

                                /

                                Math.max(

                                    1,

                                    enterStart -
                                    enterEnd
                                )
                            );
                    }


                    // ====================================================
                    // TETAP FULL SAMPAI RESEPSI SELESAI
                    // ====================================================
                    //
                    // Bunga baru mulai hilang
                    // ketika BAGIAN BAWAH RESEPSI
                    // mendekati atas viewport.
                    //
                    // ====================================================

                    const exitZone =

                        viewportHeight *
                        0.24;


                    let exitProgress;


                    /*
                    * Resepsi masih panjang / masih tampil.
                    *
                    * Bunga 100% terlihat.
                    */
                    if (
                        resepsiRect.bottom >=

                        viewport.top +
                        exitZone
                    ) {

                        exitProgress =
                            1;
                    }


                    /*
                    * Ujung bawah Resepsi sedang
                    * melewati area atas viewport.
                    *
                    * Mulai fade.
                    */
                    else if (
                        resepsiRect.bottom >
                        viewport.top
                    ) {

                        exitProgress =

                            clampFlower(

                                (
                                    resepsiRect.bottom -

                                    viewport.top
                                )

                                /

                                exitZone
                            );
                    }


                    /*
                    * Resepsi sudah benar-benar lewat.
                    */
                    else {

                        exitProgress =
                            0;
                    }


                    // ====================================================
                    // FINAL PROGRESS
                    // ====================================================
                    //
                    // Muncul berdasarkan Pemberkatan,
                    // hilang berdasarkan akhir Resepsi.
                    //
                    // ====================================================

                    return Math.min(

                        enterProgress,

                        exitProgress
                    );
                }
            }


            // ========================================================
            // NORMAL FLOWER GROUP
            // ========================================================

            const rect =

                group.container
                    .getBoundingClientRect();


            const centerY =

                rect.top +

                rect.height /
                2;


            const ratio =

                (
                    centerY -

                    viewport.top
                )

                /

                Math.max(
                    1,
                    viewport.height
                );


            // ========================================================
            // SUDAH KELUAR ATAS
            // ========================================================

            if (
                ratio <=
                -0.04
            ) {

                return 0;
            }


            // ========================================================
            // MASUK DARI ATAS
            // ========================================================

            if (
                ratio <
                0.28
            ) {

                return clampFlower(

                    (
                        ratio +
                        0.04
                    )

                    /

                    0.32
                );
            }


            // ========================================================
            // AREA TENGAH
            // ========================================================

            if (
                ratio <=
                0.72
            ) {

                return 1;
            }


            // ========================================================
            // MASUK / KELUAR DARI BAWAH
            // ========================================================

            if (
                ratio <
                1.04
            ) {

                return clampFlower(

                    (
                        1.04 -
                        ratio
                    )

                    /

                    0.32
                );
            }


            return 0;
        }


        // ========================================================
        // F6. INTRO COVER
        // ========================================================

        const flowerIntroStartedAt =

            performance.now();


        const flowerIntroDuration =

            1050;


        const flowerIntroMax =

            1400;


        // Cover flower sudah memakai entrance terpisah dan memang tidak
        // masuk flowerGroups. Jangan paksa render-loop 1.4 detik kalau
        // tidak ada group intro yang perlu dianimasikan.
        const hasIntroFlowerGroups =
            flowerGroups.some(
                (group) => group.intro
            );


        // ========================================================
        // F7. FRAME TIME
        // ========================================================
        //
        // TIME BASED SMOOTHING.
        //
        // Jadi hasil lebih konsisten di:
        //
        // 60Hz
        // 90Hz
        // 120Hz
        //
        // ========================================================

        let lastFlowerFrameTime =

            performance.now();


        // ========================================================
        // F8. UPDATE FLOWER GROUPS
        // ========================================================

        function updateFlowers(
            now =
                performance.now(),
            viewportRect =
                scrollContainer.getBoundingClientRect()
        ) {

            // =========================================
            // DELTA TIME
            // =========================================

            const deltaTime =

                Math.min(
                    40,
                    Math.max(
                        1,
                        now -
                        lastFlowerFrameTime
                    )
                );


            lastFlowerFrameTime =
                now;


            // =========================================
            // INERTIA / FOLLOWING
            // =========================================
            //
            // 260 = lebih lembut.
            //
            // Jangan terlalu kecil,
            // nanti terasa snap.
            //
            // =========================================

            const smoothingTau =

                260;


            const followAmount =

                1 -

                Math.exp(

                    -deltaTime /

                    smoothingTau
                );


            const introAge =

                now -

                flowerIntroStartedAt;


            const stillAtTop =

                scrollContainer.scrollTop <
                4;


            let stillMoving =
                false;


            // =========================================
            // LOOP PER GROUP
            // =========================================

            flowerGroups.forEach(
                (
                    group
                ) => {

                    let rawTarget;


                    // =====================================
                    // COVER INTRO
                    // =====================================

                    if (
                        group.intro &&
                        stillAtTop &&
                        introAge <
                        flowerIntroMax
                    ) {

                        rawTarget =

                            clampFlower(

                                (
                                    introAge -
                                    100
                                )

                                /

                                flowerIntroDuration
                            );
                    }


                    // =====================================
                    // COVER SUDAH INTRO
                    // =====================================

                    else if (
                        group.intro &&
                        stillAtTop
                    ) {

                        rawTarget =
                            1;
                    }


                    // =====================================
                    // NORMAL SCROLL
                    // =====================================

                    else {

                        rawTarget =

                            getFlowerGroupTarget(
                                group,
                                viewportRect
                            );
                    }


                    // =====================================
                    // EASING TARGET
                    // =====================================

                    const target =

                        smoothFlower(
                            rawTarget
                        );


                    // =====================================
                    // GROUP INERTIA
                    // =====================================
                    //
                    // SATU progress untuk semua
                    // bunga dalam group.
                    //
                    // =====================================

                    const difference =

                        target -

                        group.currentProgress;


                    group.currentProgress +=

                        difference *

                        followAmount;


                    if (
                        Math.abs(
                            difference
                        ) >
                        0.0007
                    ) {

                        stillMoving =
                            true;
                    }


                    const progress =

                        clampFlower(
                            group.currentProgress
                        );


                    /*
                    * Opacity sedikit lebih lembut
                    * dari progress scale.
                    */
                    const opacityProgress =

                        smoothFlower(
                            progress
                        );


                    // =====================================
                    // APPLY KE SEMUA BUNGA DALAM GROUP
                    // =====================================

                    group.flowers.forEach(
                        (
                            flower
                        ) => {

                            const {
                                element,
                                config,
                                finalOpacity
                            } =
                                flower;


                            // =================================
                            // TRANSLATE
                            // =================================

                            const x =

                                config.enterX *

                                (
                                    1 -
                                    progress
                                );


                            const y =

                                config.enterY *

                                (
                                    1 -
                                    progress
                                );


                            // =================================
                            // SCALE
                            // =================================

                            const scale =

                                config.startScale +

                                (
                                    1 -
                                    config.startScale
                                )

                                *

                                progress;


                            // =================================
                            // OPACITY
                            // =================================

                            const opacity =

                                finalOpacity *

                                opacityProgress;


                            // =================================
                            // APPLY
                            // =================================

                            element.style.setProperty(

                                'opacity',

                                opacity.toFixed(
                                    3
                                ),

                                'important'
                            );


                            element.style.setProperty(

                                'translate',

                                `${x.toFixed(2)}px ${y.toFixed(2)}px`,

                                'important'
                            );


                            element.style.setProperty(

                                'scale',

                                scale.toFixed(
                                    3
                                ),

                                'important'
                            );
                        }
                    );
                }
            );


            // =========================================
            // INTRO MASIH JALAN
            // =========================================

            if (
                hasIntroFlowerGroups &&
                introAge <
                flowerIntroMax
            ) {

                stillMoving =
                    true;
            }


            /*
            * PENTING:
            *
            * Kalau scroll berhenti tetapi
            * bunga belum selesai mengejar target,
            * teruskan render beberapa frame.
            */

            if (
                stillMoving
            ) {

                requestScrollRender();
            }


            return stillMoving;
        }


        // ========================================================
        // D. SATU RENDER LOOP
        // ========================================================

        let frameRequested =
            false;


        function requestScrollRender() {

            if (
                frameRequested
            ) {

                return;
            }


            frameRequested =
                true;


            requestAnimationFrame(
                renderScrollState
            );
        }


        function renderScrollState(
            now =
                performance.now()
        ) {


            frameRequested =
                false;


            // Satu geometry read per frame untuk viewport scroll.
            // Mengurangi layout reads berulang tanpa mengubah posisi animasi.
            const viewportRect =
                scrollContainer.getBoundingClientRect();

            updateBackgroundFromScroll(
                viewportRect
            );


            /*
             * Update flower motion.
             */

            const flowersStillMoving =

                updateFlowers(
                    now,
                    viewportRect
                );


            /*
             * Walaupun user sudah
             * berhenti scroll,
             *
             * bunga menyelesaikan
             * sisa inertia.
             */

            if (
                flowersStillMoving
            ) {

                requestScrollRender();
            }
        }


        // ========================================================
        // SCROLL EVENT
        // ========================================================

        scrollContainer
            .addEventListener(

                'scroll',

                requestScrollRender,

                {

                    passive:
                        true
                }
            );


        window
            .addEventListener(

                'resize',

                requestScrollRender,

                {

                    passive:
                        true
                }
            );


        // ========================================================
        // SMOOTH WHEEL DESKTOP
        // ========================================================

        const finePointer =

            window.matchMedia &&

            window
                .matchMedia(
                    '(pointer: fine)'
                )
                .matches;


        const reduceMotion =

            window.matchMedia &&

            window
                .matchMedia(
                    '(prefers-reduced-motion: reduce)'
                )
                .matches;


        if (
            finePointer &&

            !reduceMotion
        ) {


            let targetScroll =

                scrollContainer
                    .scrollTop;


            let wheelRaf =
                0;

            window.weddingScrollState = {
                scrollContainer,
                get targetScroll() {
                    return targetScroll;
                },
                set targetScroll(value) {
                    targetScroll = value;
                },
                get wheelRaf() {
                    return wheelRaf;
                },
                set wheelRaf(value) {
                    wheelRaf = value;
                }
            };

            function maxScrollTop() {

                return Math.max(

                    0,

                    scrollContainer
                        .scrollHeight -

                    scrollContainer
                        .clientHeight
                );
            }


            function clampScroll(
                value
            ) {

                return Math.max(

                    0,

                    Math.min(

                        maxScrollTop(),

                        value
                    )
                );
            }


            function normalizedWheelDelta(
                event
            ) {

                if (
                    event.deltaMode ===
                    1
                ) {

                    return (
                        event.deltaY *
                        18
                    );
                }


                if (
                    event.deltaMode ===
                    2
                ) {

                    return (

                        event.deltaY *

                        scrollContainer
                            .clientHeight
                    );
                }


                return event.deltaY;
            }


            function animateWheel() {

                const current =

                    scrollContainer
                        .scrollTop;


                const difference =

                    targetScroll -

                    current;


                if (
                    Math.abs(
                        difference
                    ) <
                    0.25
                ) {

                    scrollContainer
                        .scrollTop =

                        targetScroll;


                    wheelRaf =
                        0;


                    return;
                }


                scrollContainer
                    .scrollTop =

                    current +

                    difference *
                    0.18;


                wheelRaf =

                    requestAnimationFrame(
                        animateWheel
                    );
            }


            scrollContainer
                .addEventListener(

                    'wheel',

                    (
                        event
                    ) => {


                        if (
                            event.ctrlKey
                        ) {

                            return;
                        }


                        event
                            .preventDefault();


                        targetScroll =

                            clampScroll(

                                targetScroll +

                                normalizedWheelDelta(
                                    event
                                )

                                *

                                1.08
                            );


                        if (
                            !wheelRaf
                        ) {

                            wheelRaf =

                                requestAnimationFrame(
                                    animateWheel
                                );
                        }
                    },

                    {

                        passive:
                            false
                    }
                );


            scrollContainer
                .addEventListener(

                    'scroll',

                    () => {

                        if (
                            !wheelRaf
                        ) {

                            targetScroll =

                                scrollContainer
                                    .scrollTop;
                        }
                    },

                    {

                        passive:
                            true
                    }
                );
        }


        // ========================================================
        // INITIAL RENDER
        // ========================================================

        requestScrollRender();
    }


    // ==========================================
    // LOAD UCAPAN
    // ==========================================
    // Jangan rebut CPU/network saat cover baru mulai naik.
    // Data ucapan tetap otomatis dimuat, hanya dipindah ke idle time.
    const loadWishesWhenIdle = function () {
        fetchWishes();
    };

    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadWishesWhenIdle, { timeout: 1800 });
    } else {
        setTimeout(loadWishesWhenIdle, 700);
    }
    }

    document.addEventListener(
        'invitation:main-prep',
        initializeMainExperience,
        { once: true }
    );

    // Fallback: kalau halaman dibuka langsung dalam state invitation-open.
    if (document.body.classList.contains('invitation-open')) {
        initializeMainExperience();
    }
});


// ==========================================
// 3. SUPABASE - FETCH UCAPAN
// ==========================================

async function fetchWishes() {

    const wishesList =

        document.getElementById(
            'wishesList'
        );


    const countBadge =

        document.getElementById(
            'wishCount'
        );


    if (
        !wishesList
    ) {

        return;
    }


    try {

        const {

            data:
                wishes,

            error

        } =

            await supabaseClient

                .from(
                    'wishes'
                )

                .select(
                    '*'
                )

                .order(
                    'created_at',
                    {

                        ascending:
                            false
                    }
                );


        if (
            error
        ) {

            throw error;
        }


        wishesList.innerHTML =
            '';


        if (
            wishes &&

            wishes.length >
            0
        ) {


            if (
                countBadge
            ) {

                countBadge.innerHTML =

                    `<i class="bi bi-chat-heart-fill me-1"></i> ${wishes.length} Doa Restu`;
            }


            wishes
                .forEach(
                    (
                        item
                    ) => {

                        appendWishCard(

                            item.name,

                            item.message,

                            item.created_at
                        );
                    }
                );

        } else {


            if (
                countBadge
            ) {

                countBadge.innerHTML =

                    '<i class="bi bi-chat-heart me-1"></i> 0 Doa Restu';
            }


            wishesList.innerHTML =

                '<p class="text-center text-muted small py-3 mb-0">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p>';
        }

    } catch (
        err
    ) {


        console.error(

            'Gagal mengambil ucapan:',

            err.message
        );


        wishesList.innerHTML =

            '<p class="text-center text-muted small py-3 mb-0"><i class="bi bi-exclamation-circle me-1"></i> Gagal terhubung ke database.</p>';
    }
}


// ==========================================
// 4. SUBMIT UCAPAN
// ==========================================

async function submitWish(
    event
) {

    event
        .preventDefault();


    const nameInput =

        document.getElementById(
            'guestName'
        );


    const messageInput =

        document.getElementById(
            'guestMessage'
        );


    const submitBtn =

        event.target
            .querySelector(
                'button[type="submit"]'
            );


    const name =

        nameInput
            .value
            .trim();


    const message =

        messageInput
            .value
            .trim();


    if (
        !name ||
        !message
    ) {

        return;
    }


    const originalBtnText =

        submitBtn
            .innerHTML;


    submitBtn.disabled =
        true;


    submitBtn.innerHTML =

        '<i class="bi bi-arrow-repeat spin-icon me-1"></i> Mengirim...';


    try {

        const {

            data,

            error

        } =

            await supabaseClient

                .from(
                    'wishes'
                )

                .insert(
                    [
                        {

                            name:
                                name,

                            message:
                                message
                        }
                    ]
                )

                .select();


        if (
            error
        ) {

            throw error;
        }


        nameInput.value =
            '';


        messageInput.value =
            '';


        if (
            data &&

            data.length >
            0
        ) {

            appendWishCard(

                data[0].name,

                data[0].message,

                data[0].created_at,

                true
            );
        }


        submitBtn.innerHTML =

            '<i class="bi bi-check-circle-fill me-1"></i> Terkirim!';


        setTimeout(
            () => {

                submitBtn.disabled =
                    false;


                submitBtn.innerHTML =
                    originalBtnText;


                fetchWishes();

            },
            1800
        );

    } catch (
        err
    ) {


        console.error(

            'Gagal mengirim ucapan:',

            err.message
        );


        alert(
            'Gagal mengirim ucapan. Silakan coba lagi.'
        );


        submitBtn.disabled =
            false;


        submitBtn.innerHTML =
            originalBtnText;
    }
}


// ==========================================
// 5. APPEND UCAPAN
// ==========================================

function appendWishCard(

    name,

    message,

    createdAt,

    isNew =
        false
) {


    const wishesList =

        document.getElementById(
            'wishesList'
        );


    if (
        !wishesList
    ) {

        return;
    }


    if (
        wishesList
            .querySelector(
                'p.text-muted'
            )
    ) {

        wishesList.innerHTML =
            '';
    }


    const wishCard =

        document
            .createElement(
                'div'
            );


    wishCard.className =

        'wish-item-card';


    wishCard.innerHTML = `

        <h6 class="wish-author-name mb-1">${escapeHtml(name)}</h6>

        <p class="wish-text mb-1">${escapeHtml(message)}</p>

        <small class="wish-time">${formatDate(createdAt)}</small>

    `;


    if (
        isNew
    ) {


        wishCard.style.opacity =
            '0';


        wishCard.style.transform =

            'translateY(-18px) scale(0.95)';


        wishCard.style.transition =

            'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';


        wishesList
            .insertBefore(

                wishCard,

                wishesList
                    .firstChild
            );


        requestAnimationFrame(
            () => {

                setTimeout(
                    () => {

                        wishCard.style.opacity =
                            '1';


                        wishCard.style.transform =

                            'translateY(0) scale(1)';

                    },
                    30
                );
            }
        );

    } else {


        wishesList
            .appendChild(
                wishCard
            );
    }
}


// ==========================================
// 6. FORMAT DATE
// ==========================================

function formatDate(
    dateString
) {


    if (
        !dateString
    ) {

        return 'Baru saja';
    }


    const date =

        new Date(
            dateString
        );


    const now =

        new Date();


    const diffInSeconds =

        Math.floor(

            (
                now -
                date
            )

            /

            1000
        );


    if (
        diffInSeconds <
        60
    ) {

        return 'Baru saja';
    }


    if (
        diffInSeconds <
        3600
    ) {

        return `${Math.floor(diffInSeconds / 60)} menit lalu`;
    }


    if (
        diffInSeconds <
        86400
    ) {

        return `${Math.floor(diffInSeconds / 3600)} jam lalu`;
    }


    return date
        .toLocaleDateString(

            'id-ID',

            {

                day:
                    'numeric',

                month:
                    'short',

                year:
                    'numeric'
            }
        );
}


// ==========================================
// 7. ESCAPE HTML
// ==========================================

function escapeHtml(
    text
) {

    return String(
        text
    )

        .replace(
            /&/g,
            '&amp;'
        )

        .replace(
            /</g,
            '&lt;'
        )

        .replace(
            />/g,
            '&gt;'
        )

        .replace(
            /"/g,
            '&quot;'
        )

        .replace(
            /'/g,
            '&#039;'
        );
}


// ==========================================
// 8. COPY NO REKENING
// ==========================================

function copyFromImage(

    accountNumber,

    cardElement
) {


    navigator
        .clipboard
        .writeText(
            accountNumber
        )

        .then(
            () => {


                const popout =

                    cardElement
                        .querySelector(
                            '.popout-copy-badge'
                        );


                cardElement
                    .style
                    .transition =

                    'transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275)';


                cardElement
                    .style
                    .transform =

                    'scale(0.95)';


                setTimeout(
                    () => {

                        cardElement
                            .style
                            .transform =

                            'scale(1)';

                    },
                    150
                );


                if (
                    popout
                ) {


                    if (
                        cardElement
                            ._popoutTimeout
                    ) {

                        clearTimeout(

                            cardElement
                                ._popoutTimeout
                        );
                    }


                    popout
                        .classList
                        .add(
                            'show-popout'
                        );


                    cardElement
                        ._popoutTimeout =

                        setTimeout(
                            () => {

                                popout
                                    .classList
                                    .remove(
                                        'show-popout'
                                    );

                            },
                            1800
                        );
                }
            }
        )

        .catch(
            (
                err
            ) => {

                console.error(

                    'Gagal menyalin rekening:',

                    err
                );
            }
        );
}


// ==========================================
// 9. MUSIC CONTROL
// ==========================================

const audio =

    document.getElementById(
        'weddingMusic'
    );


const musicBtn =

    document.getElementById(
        'musicToggleBtn'
    );


if (
    audio &&
    musicBtn
) {


    audio.volume =
        0.3;


    let isPlaying =
        false;


    function playAudio() {


        if (
            isPlaying
        ) {

            return;
        }


        audio
            .play()

            .then(
                () => {

                    isPlaying =
                        true;


                    musicBtn
                        .classList
                        .remove(
                            'paused'
                        );
                }
            )

            .catch(
                (
                    err
                ) => {

                    console.log(

                        'Autoplay ditahan browser:',

                        err
                    );
                }
            );
    }


    function pauseAudio() {


        audio
            .pause();


        isPlaying =
            false;


        musicBtn
            .classList
            .add(
                'paused'
            );
    }


    const urlParams =

        new URLSearchParams(
            window.location.search
        );


    if (
        urlParams
            .get(
                'playMusic'
            ) ===
        'true'
    ) {

        playAudio();
    }


    function startMusicOnInteraction() {


        playAudio();


        window
            .removeEventListener(

                'touchstart',

                startMusicOnInteraction
            );


        window
            .removeEventListener(

                'click',

                startMusicOnInteraction
            );


        const container =

            document.getElementById(
                'scrollContainer'
            );


        if (
            container
        ) {

            container
                .removeEventListener(

                    'scroll',

                    startMusicOnInteraction
                );
        }
    }


    window
        .addEventListener(

            'touchstart',

            startMusicOnInteraction,

            {

                once:
                    true
            }
        );


    window
        .addEventListener(

            'click',

            startMusicOnInteraction,

            {

                once:
                    true
            }
        );


    const container =

        document.getElementById(
            'scrollContainer'
        );


    if (
        container
    ) {

        container
            .addEventListener(

                'scroll',

                startMusicOnInteraction,

                {

                    once:
                        true
                }
            );
    }


    musicBtn
        .addEventListener(

            'click',

            (
                event
            ) => {


                event
                    .stopPropagation();


                if (
                    isPlaying
                ) {

                    pauseAudio();

                } else {

                    playAudio();
                }
            }
        );
}


// ==========================================
// 10. RESPONSIVE CANVAS HP + AUTO FIT DESKTOP
// ==========================================

function makeCanvasFullScreen() {

    const canvas =
        document.querySelector(
            '.main-wrapper .card-canvas'
        );

    if (!canvas) {
        return;
    }

    // ==========================================
    // HP - TETAP FULLSCREEN
    // ==========================================

    if (window.innerWidth <= 576) {

        canvas.style.transform = 'none';
        canvas.style.transformOrigin = 'center center';

        canvas.style.width = '100vw';
        canvas.style.height = `${window.innerHeight}px`;

        return;
    }


    // ==========================================
    // LAPTOP / DESKTOP - AUTO FIT
    // ==========================================

    const originalWidth = 480;
    const originalHeight = 750;

    // Jarak sedikit dari atas/bawah layar
    const paddingMargin = 20;

    const availableWidth =
        window.innerWidth - paddingMargin;

    const availableHeight =
        window.innerHeight - paddingMargin;


    // Hitung skala berdasarkan lebar dan tinggi layar
    const scaleX =
        availableWidth / originalWidth;

    const scaleY =
        availableHeight / originalHeight;


    // Ambil skala terkecil supaya tidak keluar layar
    // Maksimal 1 supaya tidak membesar melebihi ukuran asli
    const scale =
        Math.min(
            scaleX,
            scaleY,
            1
        );


    // Kembalikan ukuran asli canvas
    canvas.style.width = '';
    canvas.style.height = '';


    // Scale dari tengah
    canvas.style.transformOrigin =
        'center center';

    canvas.style.transform =
        `scale(${scale})`;
}


// Jalankan ketika ukuran browser berubah
window.addEventListener(
    'resize',
    makeCanvasFullScreen
);


// Jalankan saat halaman selesai dimuat
document.addEventListener(
    'DOMContentLoaded',
    makeCanvasFullScreen
);


// Jalankan langsung
makeCanvasFullScreen();

// ==========================================
// 11. SLIDESHOW THANK YOU
// ==========================================

document
    .addEventListener(

        'DOMContentLoaded',

        function () {


            const thankYouPhotos = [

                'foto pernikahan/foto1.jpeg',

                'foto pernikahan/foto2.jpeg',

                'foto pernikahan/foto3.jpeg',

                'foto pernikahan/foto5.jpeg'
            ];


            let currentPhotoIndex =
                0;


            let bgSlideTimer =
                null;


            const bg6Image =

                document
                    .getElementById(
                        'bg6'
                    );


            const thankYouSection =

                document
                    .querySelector(

                        '.scroll-target-block[data-bg="bg6"]'
                    );


            if (
                !bg6Image ||
                !thankYouSection
            ) {

                return;
            }


            function slideNextBackground() {


                currentPhotoIndex =

                    (
                        currentPhotoIndex +
                        1
                    )

                    %

                    thankYouPhotos
                        .length;


                bg6Image
                    .style
                    .transition =

                    'opacity 0.8s ease-in-out';


                bg6Image
                    .style
                    .opacity =

                    '0.2';


                setTimeout(
                    () => {


                        bg6Image.src =

                            thankYouPhotos[
                                currentPhotoIndex
                            ];


                        bg6Image
                            .style
                            .opacity =

                            '0.76';

                    },
                    400
                );
            }


            const container =

                document
                    .getElementById(
                        'scrollContainer'
                    );


            const observer =

                new IntersectionObserver(

                    (
                        entries
                    ) => {


                        entries
                            .forEach(
                                (
                                    entry
                                ) => {


                                    if (
                                        entry
                                            .isIntersecting
                                    ) {


                                        if (
                                            !bgSlideTimer
                                        ) {

                                            bgSlideTimer =

                                                setInterval(

                                                    slideNextBackground,

                                                    3500
                                                );
                                        }

                                    } else {


                                        if (
                                            bgSlideTimer
                                        ) {

                                            clearInterval(
                                                bgSlideTimer
                                            );


                                            bgSlideTimer =
                                                null;
                                        }
                                    }
                                }
                            );
                    },

                    {

                        root:
                            container,

                        threshold:
                            0.25
                    }
                );


            observer
                .observe(
                    thankYouSection
                );
        }
    );


// ==========================================
// 12. BACK TO HOME
// ==========================================

function scrollToTop() {

    const scrollContainer =
        document.getElementById(
            'scrollContainer'
        );

    if (!scrollContainer) {
        return;
    }

    if (
        window.weddingScrollState
    ) {

        window.weddingScrollState
            .targetScroll = 0;

        if (
            window.weddingScrollState.wheelRaf
        ) {

            cancelAnimationFrame(
                window.weddingScrollState.wheelRaf
            );

            window.weddingScrollState
                .wheelRaf = 0;
        }
    }

    scrollContainer.scrollTo({
        top: 0,
        behavior: 'smooth'
    });

    setTimeout(() => {

        scrollContainer.scrollTop = 0;

        if (
            window.weddingScrollState
        ) {

            window.weddingScrollState
                .targetScroll = 0;
        }

    }, 700);
}