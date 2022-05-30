export default class Download{
  constructor(triggers){
    this.btns = document.querySelectorAll(triggers);
    this.path = 'assets/img/mainbg.jpg';
  }

  downloadItem(path){
    //для скачивания файла нам нуджна ссылка с артибутом download. В верстке у нас ее нет, пожтому мы ее сэмулируем
    const link = document.createElement('a');
    link.setAttribute('href', path);
    link.setAttribute('download', 'nice_picture');

    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  init(){
    this.btns.forEach(item =>{
      item.addEventListener('click', ()=>{
        this.downloadItem(this.path);
      });
    });
  }
}
