document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Portfolio Website', 'font-size: 20px; font-weight: bold; color: #6366f1;');
    console.log('%cDibuat dengan ❤️ oleh Jimmi Iskandar', 'font-size: 14px; color: #8b5cf6;');

    // NAVBAR SCROLL EFFECT
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // MOBILE MENU
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => navMenu.classList.toggle('active'));
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => navMenu.classList.remove('active'));
        });
    }

    // SMOOTH SCROLL
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 70;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }
        });
    });

    // SCROLL ANIMATION
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => observer.observe(section));

    // PROJECT GALLERY
    const projectsData = [
        {
            title: "Nama Proyek 1",
            images: [
                { url: "images/project1-screenshot1.jpg", caption: "Tampilan halaman utama" },
                { url: "images/project1-screenshot2.jpg", caption: "Fitur dashboard" },
                { url: "images/project1-screenshot3.jpg", caption: "Tampilan mobile responsive" }
            ]
        },
        {
            title: "Nama Proyek 2",
            images: [
                { url: "images/project2-screenshot1.jpg", caption: "Interface aplikasi" },
                { url: "images/project2-screenshot2.jpg", caption: "Fitur utama" }
            ]
        },
        {
            title: "Nama Proyek 3",
            images: [
                { url: "images/project3-screenshot1.jpg", caption: "Halaman landing page" },
                { url: "images/project3-screenshot2.jpg", caption: "Admin panel" }
            ]
        }
    ];

    let currentProjectIndex = 0;
    let currentImageIndex = 0;

    window.openGallery = function (projectIndex) {
        currentProjectIndex = projectIndex;
        currentImageIndex = 0;
        const modal = document.getElementById('galleryModal');
        const project = projectsData[projectIndex];
        document.getElementById('galleryTitle').textContent = project.title;
        updateGalleryImage();
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    window.closeGallery = function () {
        const modal = document.getElementById('galleryModal');
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    function updateGalleryImage() {
        const project = projectsData[currentProjectIndex];
        const image = project.images[currentImageIndex];
        document.getElementById('galleryImage').src = image.url;
        document.getElementById('galleryCaption').textContent = image.caption;
        document.getElementById('galleryCounter').textContent =
            `Gambar ${currentImageIndex + 1} dari ${project.images.length}`;
    }

    window.nextImage = function () {
        const project = projectsData[currentProjectIndex];
        currentImageIndex = (currentImageIndex + 1) % project.images.length;
        updateGalleryImage();
    };

    window.prevImage = function () {
        const project = projectsData[currentProjectIndex];
        currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
        updateGalleryImage();
    };

    const modal = document.getElementById('galleryModal');
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target.id === 'galleryModal') closeGallery();
        });
    }

    document.addEventListener('keydown', e => {
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') closeGallery();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });
});
