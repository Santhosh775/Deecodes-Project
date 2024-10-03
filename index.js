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

document.getElementById('toggleDropdown').addEventListener('click', function() {
        const dropdownList = document.querySelector('.dropdown-list');
        dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
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

const sliderContainer = document.querySelector('.slider-container');
const playPauseIcon = document.getElementById('playPauseIcon');
const chevronLeft = document.getElementById('chevronLeft');
const chevronRight = document.getElementById('chevronRight');
const circle1 = document.getElementById('circle1');
const circle2 = document.getElementById('circle2');

let currentSlide = 0;
let isPlaying = true;
let slideInterval;

const startSlider = () => {
    slideInterval = setInterval(nextSlide, 5000); 
}


const stopSlider = () => {
    clearInterval(slideInterval);
}


const nextSlide = () => {
    currentSlide = (currentSlide + 1) % 2; 
    updateSliderPosition();
    updateIndicators();
}


const prevSlide = () => {
    currentSlide = (currentSlide - 1 + 2) % 2; 
    updateSliderPosition();
    updateIndicators();
}


const updateSliderPosition = () => {
    sliderContainer.style.transform = `translateX(-${currentSlide * 50}%)`; 
}


const updateIndicators = () => {
    if (currentSlide === 0) {
        circle1.classList.add('bi-circle-fill');
        circle1.classList.remove('bi-circle');
        circle2.classList.add('bi-circle');
        circle2.classList.remove('bi-circle-fill');
    } else {
        circle1.classList.add('bi-circle');
        circle1.classList.remove('bi-circle-fill');
        circle2.classList.add('bi-circle-fill');
        circle2.classList.remove('bi-circle');
    }
}

playPauseIcon.addEventListener('click', () => {
    if (isPlaying) {
        stopSlider();
        playPauseIcon.classList.replace('bi-pause-circle', 'bi-play-circle');
    } else {
        startSlider();
        playPauseIcon.classList.replace('bi-play-circle', 'bi-pause-circle');
    }
    isPlaying = !isPlaying;
});


chevronRight.addEventListener('click', () => {
    stopSlider();
    nextSlide();
    if (isPlaying) {
        startSlider(); 
    }
});


chevronLeft.addEventListener('click', () => {
    stopSlider();
    prevSlide();
    if (isPlaying) {
        startSlider(); 
    }
});

startSlider();


document.querySelector('.back-to-top').addEventListener('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
