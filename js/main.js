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
let isAnimating = false;
const faqItems = document.querySelectorAll('.faq-content .faq-item');
const dots = document.querySelectorAll('.dot');

function showSlide(index, direction = 1) {
    if (isAnimating) return;
    
    const prevIndex = currentFaqIndex;
    
    // Handle index boundaries
    if (index >= faqItems.length) {
        index = 0;
    } else if (index < 0) {
        index = faqItems.length - 1;
    }
    
    if (index === prevIndex) return;
    
    isAnimating = true;
    
    // Remove all animation classes
    faqItems.forEach(item => {
        item.classList.remove('slide-out-left', 'slide-out-right', 'slide-in-left', 'slideInFromRight');
    });
    
    // Update dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[index].classList.add('active');
    
    const currentItem = faqItems[prevIndex];
    const nextItem = faqItems[index];
    
    // Determine animation direction
    if (direction > 0) {
        // Going forward: current slides out left, next slides in from right
        currentItem.classList.add('slide-out-left');
        nextItem.classList.remove('active');
        nextItem.style.display = 'block';
        nextItem.classList.add('active');
    } else {
        // Going backward: current slides out right, next slides in from left
        currentItem.classList.add('slide-out-right');
        nextItem.classList.remove('active');
        nextItem.style.display = 'block';
        nextItem.classList.add('slide-in-left');
        nextItem.classList.add('active');
    }
    
    // After animation completes
    setTimeout(() => {
        currentItem.classList.remove('active', 'slide-out-left', 'slide-out-right');
        currentItem.style.display = 'none';
        nextItem.classList.remove('slide-in-left');
        currentFaqIndex = index;
        isAnimating = false;
    }, 500);
}

function changeSlide(direction) {
    const newIndex = currentFaqIndex + direction;
    showSlide(newIndex, direction);
}

function currentSlide(index) {
    const direction = index > currentFaqIndex ? 1 : -1;
    showSlide(index, direction);
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

