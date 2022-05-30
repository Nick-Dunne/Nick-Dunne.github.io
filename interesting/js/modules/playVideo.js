export default class VideoPlayer {
  constructor(triggers, overlay) {
    this.btns = document.querySelectorAll(triggers);
    this.overlay = document.querySelector(overlay);
    this.close = this.overlay.querySelector('.close');
    //ниже мы используем "this.onPlayerStateChange", однако используем в другом классе, поэтому надо бы его "жестко привязать"
    this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
  }

  bindTriggers() {

    this.btns.forEach((btn, i) => {
      //ниже реализум функционал, когда втрая кнопка на странице по умолчанию неактивна, до тех пор...
      try{
        const blockedElem = btn.closest('.module__video-item').nextElementSibling;
      if(i % 2 === 0){
        blockedElem.setAttribute('data-disabled', 'true');
      }
      } catch(e){};
      //

      btn.addEventListener('click', () => {
        if(!btn.closest('.module__video-item') || (btn.closest('.module__video-item').getAttribute('data-disabled') !== 'true')){
              //поскольку по тех заданию мы не можем кликать на другие кнопки до тех пор, пока не просмотрим видео, нам нужно разграничить кнопки на активные и неактивные. фиксируем
        this.activeBtn = btn;
        //если плеер уже был вызван, то нам нужно просо показать модальое окено
        //мы это делаем, чтобы постоянно не создавался новый экземпляр объекта при клике на кнопку
        //и чтобы видео можно было отключать
        if (document.querySelector('iframe#frame')) {
          this.overlay.style.display = 'flex';
          //тут можно сделать еще одну проверку. Если мы клацаем на другую кнопку, но плеер уже создан - то плеер все равно нужно пересоздать
          if(this.path !== btn.getAttribute('data-url')){
            this.path = btn.getAttribute('data-url');
            this.player.loadVideoById({videoId: this.path});
          }
        } //если нет
        else {
          //запускаем метод по созданию плеера
          //сперва давай достанем арл из кнопки (это заморочки тз)
          this.path = btn.getAttribute('data-url');
          this.createPlayer(this.path);
        }
        }

      });
    });
  }

  //закрываем окно
  bindCloseBtn() {
    this.close.addEventListener('click', () => {
      this.overlay.style.display = 'none';
      //но теперь надо еще и остановить видео (читай документацию или консоль-дир)
      this.player.stopVideo();
    });
  }
  createPlayer(url) {
    this.overlay.style.display = 'flex';
    //ниже код из документации АПИ Ютуб по созданию плеера
    // в новый экземпляр класса передается как аргумент 'frame', это id-шник, изачально должен быть предусмотрен в верстке (это есть в документации)
    this.player = new YT.Player('frame', {
      height: '100%',
      width: '100%',
      videoId: `${url}`,
      events: {
        //берем дату из документации, на нумжно не допускать открытие других видео, до тех пор, пока не будет просмотрено предыдущее
        'onStateChange': this.onPlayerStateChange
      }
    });
  }

  //описываем метод, который будет вызван для свойства 'onStateChange' (работа с документацией)
  onPlayerStateChange(state){
    try{
    //получаем изначально заблокированный эелемент (второе видео)
    const blockedElem = this.activeBtn.closest('.module__video-item').nextElementSibling;
    //получим иконку из активной кнопки для послдующей ее передачи
    const playBtn = this.activeBtn.querySelector('svg').cloneNode(true);
    if(state.data === 0){
     //доп проверка и удаление затемняющего класса
     if(blockedElem.querySelector('.play__circle').classList.contains('closed')){
      blockedElem.querySelector('.play__circle').classList.remove('closed');
      //удаляем ненужную иконку, а затем ставим нужную
      blockedElem.querySelector('svg').remove();
      blockedElem.querySelector('.play__circle').appendChild(playBtn);
      //добавялем нужный текст
      blockedElem.querySelector('.play__text').textContent = 'play video';
      //и дальнейшие изменения согласно т.з.
      blockedElem.querySelector('.play__text').classList.remove('attention');
      blockedElem.style.opacity = 1;
      blockedElem.style.filter = 'none';

      //снимаем блок
      blockedElem.setAttribute('data-disabled', 'false');
     }

    }
    }catch(e){}
  }

  init() {

    //из-за многостраничности - постоянно нужны проверки
    if(this.btns.length > 0){
      //ниже будет код из документации АПИ Ютуба / выполняем подключение
    const tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    //
    this.bindTriggers();
    this.bindCloseBtn();
    }
  }
}
