// Basic front-end behaviors for the site

// Smooth scroll for nav buttons (if anchors exist later)
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', (e)=>{
      const text = e.target.textContent.trim().toLowerCase();
      const id = text.replace(/\s+/g,'-');
      const el = document.getElementById(id);
      if(el){
        el.scrollIntoView({behavior:'smooth'});
      }
    });
  });

  // Register button quick behavior
  const registerButtons = document.querySelectorAll('.register, .cta');
  registerButtons.forEach(b=> b.addEventListener('click', ()=>{
    // placeholder action — you can replace with modal or link
    window.location.href = '#register';
  }));
});
// FAQ Carousel functionality
let currentFaqIndex = 0;
const faqItems = document.querySelectorAll('.faq-item');
const dots = document.querySelectorAll('.dot');

function showSlide(index) {
    // Remove active class from all items and dots
    faqItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Handle index boundaries
    if (index >= faqItems.length) {
        currentFaqIndex = 0;
    } else if (index < 0) {
        currentFaqIndex = faqItems.length - 1;
    } else {
        currentFaqIndex = index;
    }
    
    // Add active class to current item and dot
    faqItems[currentFaqIndex].classList.add('active');
    dots[currentFaqIndex].classList.add('active');
}

function changeSlide(direction) {
    currentFaqIndex += direction;
    showSlide(currentFaqIndex);
}

function currentSlide(index) {
    currentFaqIndex = index;
    showSlide(currentFaqIndex);
}

// Auto-advance carousel every 5 seconds
let autoSlideInterval = setInterval(() => {
    changeSlide(1);
}, 5000);

// Pause auto-advance when user interacts
const carouselButtons = document.querySelectorAll('.carousel-btn, .dot');
carouselButtons.forEach(button => {
    button.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        // Resume auto-advance after 10 seconds of no interaction
        autoSlideInterval = setInterval(() => {
            changeSlide(1);
        }, 10000);
    });
});

