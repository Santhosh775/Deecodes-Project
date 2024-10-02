const hamburgerIcon = document.getElementById('hamburger-icon');
const tabLinks = document.getElementById('Tablinks');
let isMenuOpen = false;

hamburgerIcon.addEventListener('click', () => {

    tabLinks.style.display = isMenuOpen ? 'none' : 'block';

    if (isMenuOpen) {
        hamburgerIcon.src = './public/menu-bar.png';
        hamburgerIcon.style.width = '25px'; 
        hamburgerIcon.style.height = '30px';
    } else {
        hamburgerIcon.src = './public/letter-x.png'; 
        hamburgerIcon.style.width = '15px'; 
        hamburgerIcon.style.height = '15px';
    }

    isMenuOpen = !isMenuOpen;
});

document.addEventListener('click', function(event) {
    let dropdowns = document.querySelectorAll('.dropdown-content');
    dropdowns.forEach(dropdown => {
        if (!event.target.closest('.dropdown')) {
            dropdown.style.display = 'none';
        }
    });
});

document.querySelectorAll('.dropdown').forEach(dropdown => {
    dropdown.addEventListener('click', function(event) {
        let content = this.querySelector('.dropdown-content');
        if (event.target.tagName.toLowerCase() === 'a') {
            return;
        }
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    });
});

let currentIndex = 0;
let isPlaying = true; // Start playing by default
let slideInterval = setInterval(nextSlide, 5000); // Start the slider
const slides = document.querySelectorAll('.slide');
const slideContents = document.querySelectorAll('.slide-content');
const circles = [document.getElementById('circle1'), document.getElementById('circle2')];

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        slideContents[i].classList.remove('active');
        circles[i].classList.remove('bi-circle-fill');
        circles[i].classList.add('bi-circle');
    });

    slides[index].classList.add('active');
    slideContents[index].classList.add('active');
    circles[index].classList.remove('bi-circle');
    circles[index].classList.add('bi-circle-fill');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
}

document.getElementById('playPauseIcon').addEventListener('click', function() {
    isPlaying = !isPlaying;
    this.classList.toggle('bi-play-circle', !isPlaying);
    this.classList.toggle('bi-pause-circle', isPlaying);

    if (isPlaying) {
        slideInterval = setInterval(nextSlide, 5000); // Resume the slider
    } else {
        clearInterval(slideInterval); // Pause the slider
    }
});

document.getElementById('chevronRight').addEventListener('click', nextSlide);
document.getElementById('chevronLeft').addEventListener('click', prevSlide);

// Event listeners for circle navigation
circles.forEach((circle, i) => {
    circle.addEventListener('click', () => {
        currentIndex = i;
        showSlide(currentIndex);
        if (isPlaying) {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000); 
        }
    });
});

// Start the slider initially
showSlide(currentIndex);

document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
