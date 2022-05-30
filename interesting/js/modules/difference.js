export default class Difference{
    constructor(oldOfficer, newOfficer, items){
      //приняли два столбика
      //itemsЫ будем доставать как с того столбика, так и с этого
        this.oldOfficer = document.querySelector(oldOfficer);
        this.newOfficer = document.querySelector(newOfficer);
       try{ this.oldItems = this.oldOfficer.querySelectorAll(items);
        this.newItems = this.newOfficer.querySelectorAll(items);}
      catch(e){}
    }

    bindTriggers(typeOfficer, typeItems){
      let typeCounter = 0;
      typeOfficer.querySelector('.plus').addEventListener('click', ()=>{
        if(typeCounter !==  typeItems.length - 2){
          typeItems[typeCounter].style.display = 'flex';
          typeCounter++;
        }
        else {
          typeItems[typeCounter].style.display = 'flex';
          typeItems[typeCounter + 1].remove();
        }
      });

    }

    //метод по скрытию
    hideItems(typeItems){
      typeItems.forEach((item, i, arr)=>{
        if(i != arr.length - 1){
          item.style.display = 'none';
        }
      });
    }

    //метод для инициализации модуля
    init(){
      try{      this.hideItems(this.newItems);
        this.hideItems(this.oldItems);
        this.bindTriggers(this.oldOfficer, this.oldItems, this.oldCounter);
        this.bindTriggers(this.newOfficer, this.newItems, this.newCounter);}
      catch(e){}
    }
}
