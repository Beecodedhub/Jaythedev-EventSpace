const menuCont = document.querySelector('.menu-cont');
const openNav = document.querySelector('.fa-bars');

menuCont.addEventListener("click", () => {
  const nav = document.querySelector("nav");
  openNav.classList.toggle("fa-xmark");
  nav.classList.toggle('open');
});

// Set the date we're counting down to
let countDownDate = new Date("Dec 2, 2023 15:37:25").getTime();

// Update the count down every 1 second
let countDown = setInterval(() => {

  // Get today's date and time
  let now = new Date().getTime();

  // Find the distance between now and the count down date
  let distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));
  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result
  document.querySelector(".day").innerHTML = days;
  document.querySelector(".hour").innerHTML = hours;
  document.querySelector(".minute").innerHTML = minutes;
  document.querySelector(".second").innerHTML = seconds;
  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(countDown);
    document.querySelector(".countdown").innerHTML = "JaytheDev Event EXPIRED";
  }
}, 1000);

const galleryContainer = document.querySelector('.speaker-container');
const galleryCtrlsContainer = document.querySelector('.gallery-ctrls');
const galleryCtrls = ['prev', 'next'];
const speakerItem = document.querySelectorAll('.speaker-item');

class Carousel {
  constructor(container, items, ctrls){
    this.carouselContainer = container;
    this.carouselCtrls = ctrls;
    this.carouselArray = [...items];
  }

  updateGallery(){
    this.carouselArray.forEach(el => {
      el.classList.remove('speaker-item-1');
      el.classList.remove('speaker-item-2');
      el.classList.remove('speaker-item-3');
      el.classList.remove('speaker-item-4');
      el.classList.remove('speaker-item-5');
    });

    this.carouselArray.slice(0, 5).forEach((el , i) => {
      el.classList.add(`speaker-item-${i + 1}`);
    });
  }

  setCurrentState(direction){
    if(direction.className === 'gallery-ctrls-prev'){
      this.carouselArray.unshift(this.carouselArray.pop());
    } else {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }

  setControls(){
    this.carouselCtrls.forEach(control => {
      galleryCtrlsContainer.appendChild(document.createElement('button')).className = `gallery-ctrls-${control}`;
      document.querySelector(`.gallery-ctrls-${control}`).innerText = control;
    });
  }

  useControls(){
    const triggers = [...galleryCtrlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener('click', e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
}

const imageCarousel = new Carousel(galleryContainer,speakerItem, galleryCtrls);
imageCarousel.setControls();
imageCarousel.useControls();