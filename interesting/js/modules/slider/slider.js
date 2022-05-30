//делаем супер общий класс - чтобы потом можно было наследовать
//как ты понимаешь - это прототип. В него мы запихиваем все, что может пригодится всем слайдерам у нас на страницах сайта, а дальше создаем отдельный файл для каждого слайдера и наследуем то, что нам нужно
export default class Slider {
  //надо описать будущий слайдер
  //после передачи объекта, мы его деструктуризировали. А еще сказали, что если объекта не будет, то будет пустота, во избежание ошибки. А еще, как видишь, каждому ключу задали значение по умолчанию, чтобы в дальнейшем мы могли не передавать какой-нибудь лишний аргумент, во измежание ошибок
  //паттерн таков, что мы в главный шаблон или прототип заном все свойства, которые могут пригодится
  //а в наследуемых классах уже работаем с методами... пока что так вижу
  constructor({
    container = null,
    btns = null,
    next = null,
    prev = null,
    activeClass = null,
    animate = false,
    autoplay = false
  } = {}) {
    this.container = document.querySelector(container);
    //slides могли бы передать аргументом, но можем достать иначе/ хотя как показала практика - лучше так не делать
    try{ this.slides = this.container.children;} catch(e){}
    this.btns = document.querySelectorAll(btns);
    this.prev = document.querySelector(prev);
    this.next = document.querySelector(next);
    this.activeClass = activeClass;
    this.animate = animate;
    this.autoplay = autoplay;
    this.slideIndex = 1;
  }


}

/* //ниже первый вариант для одной страницы, который мы позже переписали
//класс мы можем сразу экспортировать
//да вроде так можно было и раньше...
export default class Slider{
  //надо описать будущий слайдер (передаем страницы, где он будет работать. и триггеры)
  constructor(page, btns){
    this.page = document.querySelector(page);
    //slides могли бы передать аргументом, но можем достать иначе
    this.slides = this.page.children;
    this.btns = document.querySelectorAll(btns);
    this.slideIndex = 1;
  }
//методы
  //in 'n'будет +1 или -1 , то есть куда двигать
  showSlides(n){
    if(n > this.slides.length){
      this.slideIndex = 1;
    }
    if(n < 1){
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
    try{
      this.hanson = document.querySelector('.hanson');
      this.hanson.style.opacity = 0;

      if(n === 3){
        this.hanson.classList.add('animated');
        setTimeout(()=>{
          this.hanson.classList.add('slideInUp');
          this.hanson.style.opacity = 1;
        }, 3000);
      } else{
        this.hanson.classList.remove('slideInUp');
      }
    }catch(e){
      console.log(e);
    }
    //выше функционал дополнительный и не касается паттерна слайдера


  }
//метод, отвечающий за переключение слайдов (в n будет передавать +1 или -1)
  plusSlides(n){
    this.showSlides(this.slideIndex += n);
  }

//вешаем обработчик событий на кнопку
  render(){
    this.btns.forEach(item => {
      item.addEventListener('click', ()=>{
        //поскольку сладер у нас по тз, по крайней мере в одном решении, переключаеся только в одну сторону - то пишем единичку
        this.plusSlides(1);
      });

          //добавим штуку,что если нажмет на определенную кнопку (которую мы находим смотри как), то будет первый слайд
    item.parentNode.previousElementSibling.addEventListener('click', (e)=>{
      e.preventDefault();
      this.slideIndex = 1;
      this.showSlides(this.slideIndex);
    });
    });
    //и передаем инициализацию
    this.showSlides(this.slideIndex);
  }


}
 */
