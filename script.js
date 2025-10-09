// ==========================================
// DATA PROYEK - GANTI DENGAN DATA ANDA
// ==========================================
const projectsData = [
    {
        title: "Nama Proyek 1",
        images: [
            {
                url: "images/project1-screenshot1.jpg", // GANTI: Path ke gambar proyek
                caption: "Tampilan halaman utama" // GANTI: Deskripsi gambar
            },
            {
                url: "images/project1-screenshot2.jpg",
                caption: "Fitur dashboard"
            },
            {
                url: "images/project1-screenshot3.jpg",
                caption: "Tampilan mobile responsive"
            }
        ]
    },
    {
        title: "Nama Proyek 2",
        images: [
            {
                url: "images/project2-screenshot1.jpg",
                caption: "Interface aplikasi"
            },
            {
                url: "images/project2-screenshot2.jpg",
                caption: "Fitur utama"
            }
        ]
    },
    {
        title: "Nama Proyek 3",
        images: [
            {
                url: "images/project3-screenshot1.jpg",
                caption: "Halaman landing page"
            },
            {
                url: "images/project3-screenshot2.jpg",
                caption: "Admin panel"
            }
        ]
    }
];

// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==========================================
// SMOOTH SCROLL & ACTIVE LINK
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offsetTop = target.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// ==========================================
// SCROLL ANIMATION - FADE IN ON SCROLL
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// ==========================================
// PROJECT GALLERY MODAL
// ==========================================
let currentProjectIndex = 0;
let currentImageIndex = 0;

function openGallery(projectIndex) {
    currentProjectIndex = projectIndex;
    currentImageIndex = 0;
    
    const modal = document.getElementById('galleryModal');
    const project = projectsData[projectIndex];
    
    document.getElementById('galleryTitle').textContent = project.title;
    
    updateGalleryImage();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function updateGalleryImage() {
    const project = projectsData[currentProjectIndex];
    const image = project.images[currentImageIndex];
    
    document.getElementById('galleryImage').src = image.url;
    document.getElementById('galleryImage').alt = image.caption;
    document.getElementById('galleryCaption').textContent = image.caption;
    document.getElementById('galleryCounter').textContent = 
        `Gambar ${currentImageIndex + 1} dari ${project.images.length}`;
}

function nextImage() {
    const project = projectsData[currentProjectIndex];
    currentImageIndex = (currentImageIndex + 1) % project.images.length;
    updateGalleryImage();
}

function prevImage() {
    const project = projectsData[currentProjectIndex];
    currentImageIndex = (currentImageIndex - 1 + project.images.length) % project.images.length;
    updateGalleryImage();
}

// Close modal when clicking outside
document.getElementById('galleryModal').addEventListener('click', (e) => {
    if (e.target.id === 'galleryModal') {
        closeGallery();
    }
});

// Keyboard navigation for gallery
document.addEventListener('keydown', (e) => {
    const modal = document.getElementById('galleryModal');
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') {
            closeGallery();
        } else if (e.key === 'ArrowRight') {
            nextImage();
        } else if (e.key === 'ArrowLeft') {
            prevImage();
        }
    }
});

// ==========================================
// LAZY LOAD IMAGES
// ==========================================
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c🚀 Portfolio Website', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cDibuat dengan ❤️ oleh [Nama Anda]', 'font-size: 14px; color: #8b5cf6;');
