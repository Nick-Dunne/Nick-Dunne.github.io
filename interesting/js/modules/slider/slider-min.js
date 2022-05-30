import Slider from './slider';

export default class MiniSlider extends Slider {
  constructor(container, next, prev, activeClass, animate, autoplay) {
    super(container, next, prev, activeClass, animate, autoplay);
  }

decorizeSlides(){
  //работаем с классом активности
  for(let i = 0; i < this.slides.length; i++){
   this.slides[i].classList.remove(this.activeClass);

   //ниже проверяем передавалось ли булиново значение по animate
    if(this.animate){
      this.slides[i].querySelector('.card__title').style.opacity = '.4';
      this.slides[i].querySelector('.card__controls-arrow').style.opacity = '0';
    }
  }
  //исправляем баг с лишними кнопками детьми
  //если активный класс не является кнопкой, то мы ему добавляем класс
  if(!this.slides[0].closest('button')){
    this.slides[0].classList.add(this.activeClass);
  }

  if(this.animate){
    this.slides[0].querySelector('.card__title').style.opacity = '1';
    this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
  }
}


nextSlide(){
 //лечим баг в одном из слайдеров
 if(this.slides[1].tagName == 'BUTTON' && this.slides[2].tagName){
  this.container.appendChild(this.slides[0]);
  this.container.appendChild(this.slides[1]);
  this.container.appendChild(this.slides[2]);
} else if(this.slides[1].tagName == 'BUTTON'){
  this.container.appendChild(this.slides[0]);
  this.container.appendChild(this.slides[1]);
}
//вылечили

//интересно. когда кликаем вперед мы просто будет вырывать получается текущий слайд и помещать его в конец родителя
this.container.appendChild(this.slides[0]);
this.decorizeSlides();
}


//гениальное решение слайдера!
  bindTriggers(){
    this.next.addEventListener('click', ()=>{
     this.nextSlide();
    });

    this.prev.addEventListener('click', ()=>{
//лечим тот же баг, запускаем цикл с конца массива
      for(let i = this.slides.length -1; i > 0; i--){
        if(this.slides[i].tagName !== 'BUTTON'){
        let active = this.slides[i];
        this.container.insertBefore(active, this.slides[0]);
        this.decorizeSlides();
        break;
        }
      }
    });
  }


  init() {
 try{   this.container.style.cssText = `
 display: flex;
 flex-wrap: wrap;
 overflow: hidden;
 align-items: flex-start;
`;

this.bindTriggers();
this.decorizeSlides();

let inter;
//заметь, что сдесь сделали стрелочную функцию, чтобы this имело правильный контекст...
const autoplay = ()=>{
 inter = setInterval(()=>{
   this.nextSlide();
 }, 1000);
};

if(this.autoplay){
 autoplay();

 this.container.addEventListener('mouseenter', (e)=>{
   clearInterval(inter);
 });
 this.container.addEventListener('mouseleave', (e)=>{
   autoplay();
 });
}}
catch(e){}
  }


}

/* //гениальное решение слайдера!
вынес для осмысления
bindTriggers(){
  this.next.addEventListener('click', ()=>{
    //интересно. когда кликаем вперед мы просто будет вырывать получается текущий слайд и помещать его в конец родителя
    this.container.appendChild(this.slides[0]);
    this.decorizeSlides();
  });

  this.prev.addEventListener('click', ()=>{
    //получаем последний. Когда клацнем назад. узнаем
    let active = this.slides[this.slides.length -1];
    this.container.insertBefore(active, this.slides[0]);
    this.decorizeSlides();
  });
} */
