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
