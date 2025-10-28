// ==========================================
// DATA PROYEK - GANTI DENGAN DATA ANDA
// ==========================================
const projectsData = [
    {
        title: "Rental DVD Iskandar",
        images: [
            {
                url: "images/project1/Project1.png", // GANTI: Path ke gambar proyek
                caption: "Halaman Login" // GANTI: Deskripsi gambar
            },
            {
                url: "images/project1/project1-2.png",
                caption: "Halaman Registrasi"
            },
            {
                url: "images/project1/project1-1.png",
                caption: "Halaman Dashboard"
            },
            {
                url: "images/project1/project1-6.png",
                caption: "Halaman Checkout"
            },
            {
                url: "images/project1/project1-5.png",
                caption: "Dashboard Edit untuk admin"
            },
            {
                url: "images/project1/project1-3.png",
                caption: "Halaman halaman edit"
            }
        ]
    },
    {
        title: "Quotation Management System",
        images: [
            {
                url: "images/project2/login.png",
                caption: "Hamalan Login"
            },
            {
                url: "images/project2/2.png",
                caption: "Dashboard utama"
            }
            ,
            {
                url: "images/project2/3.png",
                caption: "Customer Master"
            },
            {
                url: "images/project2/4.png",
                caption: "Employee Master"
            },
            {
                url: "images/project2/5.png",
                caption: "Item Master"
            },
            {
                url: "images/project2/6.png",
                caption: "Customer Master"
            },
            {
                url: "images/project2/7.png",
                caption: "Transaction"
            },
            {
                url: "images/project2/8.png",
                caption: "Report"
            },
            {
                url: "images/project2/9.png",
                caption: "Report Data Customer"
            },
            {
                url: "images/project2/10.png",
                caption: "Report Market Chart"
            },
            {
                url: "images/project2/11.png",
                caption: "Report Market LineChart"
            },
            {
                url: "images/project2/12.png",
                caption: "Report Data Role"
            }
        ]
    },
    {
        title: "SPK CV.Farros Sablon",
        images: [
            {
                url: "images/project3/Login.png",
                caption: "Halaman login"
            },
            {
                url: "images/project3/1.png",
                caption: "Dashnoard SPKFarros"
            }
            ,
            {
                url: "images/project3/2.png",
                caption: "Karyawan Master"
            },
            {
                url: "images/project3/3.png",
                caption: "Kriteria Master"
            },
            {
                url: "images/project3/4.png",
                caption: "Alternatif Master"
            },
            {
                url: "images/project3/5.png",
                caption: "Seleksi"
            },
            {
                url: "images/project3/6.png",
                caption: "Report Master"
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
//console.log('%c🚀 Portfolio Website', 'font-size: 20px; font-weight: bold; color: #6366f1;');
console.log('%cDibuat dengan ☕🚬 oleh Jimmi Iskandar', 'font-size: 14px; color: #8b5cf6;'); // GANTI: Nama Anda

// ==========================================
// LOADING SCREEN - Hilangkan loading setelah page siap
// ==========================================
window.addEventListener('load', () => {
    // Semua resource sudah loaded
    document.body.classList.add('loaded');
    console.log('%c✅ Website loaded successfully!', 'color: #10b981; font-weight: bold;');
});
