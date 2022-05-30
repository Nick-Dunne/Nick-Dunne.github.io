import Slider from './slider';


export default class MainSlider extends Slider {
  constructor(btns, prev, next) {
    super(btns);
    this.prev = document.querySelectorAll(prev);
    this.next = document.querySelectorAll(next);

  }
  //методы
  //in 'n'будет +1 или -1 , то есть куда двигать
  showSlides(n) {
    if (n > this.slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = this.slides.length;
    }
    //скрыли все

    Array.from(this.slides).forEach(slide => {
      slide.style.display = 'none';
      slide.classList.add('animated', 'fadeIn');
    });
    //нужный нам элемент показываем
    this.slides[this.slideIndex - 1].style.display = 'block';

    //ниже до двуслэша у нас конструкция для т.з. (не касается паттерна слайдеров)
    //блок хэнсон должен показываться на нужной странице спустя 3 секунды. Мы просто получили элемент со страницы, сразу записав его в статическое свойство будущего экземпляра. Подумалось мне, а где же конструктор - ведь туда мы записываем свойства. Однако туда мы записываем динамические в том числе. А где угодно - можно записать статические. Вообще можно было записать в константу и без трай... ну это пример.
    //да и мы сейчас проверяем, на всякий случай, а вдруг элемент не будет на странице - дабы не было ошибки. Ведь сайт-то у нас многостраничный.
    //на нужной нам странице показываем хэнлес
    //но сперва скроем
    //на всякий случай трай
    //игра с классами тоде непонятно, я бы просто добавил появление и все
    try {
      this.hanson = document.querySelector('.hanson');
      this.hanson.style.opacity = 0;

      if (n === 3) {
        this.hanson.classList.add('animated');
        setTimeout(() => {
          this.hanson.classList.add('slideInUp');
          this.hanson.style.opacity = 1;
        }, 3000);
      } else {
        this.hanson.classList.remove('slideInUp');
      }
    } catch (e) {
      console.log(e);
    }
    //выше функционал дополнительный и не касается паттерна слайдера


  }
  //метод, отвечающий за переключение слайдов (в n будет передавать +1 или -1)
  plusSlides(n) {
    this.showSlides(this.slideIndex += n);
  }

  //вешаем обработчик событий на кнопку
  render() {
    //нюансы многостраничности, всегда все надо проверять...
    if (this.container) {
      this.btns.forEach(item => {
        item.addEventListener('click', () => {
          //поскольку сладер у нас по тз, по крайней мере в одном решении, переключаеся только в одну сторону - то пишем единичку
          this.plusSlides(1);
        });

        //добавим штуку,что если нажмет на определенную кнопку (которую мы находим смотри как), то будет первый слайд
        item.parentNode.previousElementSibling.addEventListener('click', (e) => {
          e.preventDefault();
          this.slideIndex = 1;
          this.showSlides(this.slideIndex);
        });
      });
      //кнопки вперед и назад на второй странице html

     this.next.forEach(btn=>{
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.plusSlides(1);
        console.log('3');
      });
     });

      this.prev.forEach(btn=>{
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          this.plusSlides(-1);
        });
      });
    //кнопки вперед и назад на второй странице html окончены

      //и передаем инициализацию
      this.showSlides(this.slideIndex);
    }




  }

};
