const coins = document.querySelector('.coins');
const link = document.querySelector('.check-link');
const text = document.querySelector('.text_form');
const text_form = ['монета', 'монеты', 'монет'];
const checkCoins = document.querySelector('[name="5coins"]');
const market5 = document.querySelector('.market5');
const market7 = document.querySelector('.market7');
const market25 = document.querySelector('.market25');
const sale5 = document.querySelector('.sale5');
const sale3 = document.querySelector('.sale3');
const sale15 = document.querySelector('.sale15');
const thing3 = document.querySelector('.thing3');
const thing5 = document.querySelector('.thing5');
const thing15 = document.querySelector('.thing15');
const imgDevice = document.querySelectorAll('.device');
const imgCpu = document.querySelectorAll('.cpu');
const imgSoul = document.querySelectorAll('.soul')
const buttonsPictures = document.querySelector('.buttons__pictures');
const buttonProduction = document.querySelector('.production__button');
const coinImg = document.querySelector('.coin'); 
const productionText = document.querySelector('.production__text');
let x = 0;
let y = 0;

//Падежи монеток
function declOfNum(num, text_form) {  
    num = Math.abs(num) % 100; 
    let n1 = num % 10;
    if (num > 10 && num < 20) { return text_form[2]; }
    if (n1 > 1 && n1 < 5) { return text_form[1]; }
    if (n1 == 1) { return text_form[0]; }
    return text_form[2];
} 

//Подсчет денег
function bank(y){
    x += y ;
    if (x > 100){ 
        x -=y;
        alert('Количество монет ограничено. Вы не можете нацыганить более 100 монет biorobo')
    }
    checkButtons (x);
    text.textContent = declOfNum(x, text_form);
    coins.textContent = x;
    picCoin (x);
};

//Добавление значка монеток
function picCoin (coin){ 
    const t = document.querySelectorAll('.coin__img');
    for (let i = t.length - 1; i >= 0 ; i-- ){
        coinImg.removeChild(t[i]);
    }
    for (let i = 1; i <= coin ; i++ ){
    var img1 = document.createElement('img');
    img1.classList.add('coin__img');
    img1.src='img/coin.png';
    coinImg.appendChild(img1);}
    
};
// Кнопка нацыганить
link.addEventListener('click', function(evt){
    evt.preventDefault();

        if (checkCoins.checked) {  
            y = 5;
            } else {
                y = 1;                            
                }
        bank(y);
})

// Активация кнопок на рынке и в производстве
function checkButtons(x){
    if (x >= 5){
        market5.disabled = false;
    } else { market5.disabled = true }
    if (x >=7){
        market7.disabled = false;
    } else { market7.disabled = true }
    if (x >= 25){
        market25.disabled = false;
    } else { market25.disabled = true }
    //Кнопка производства
    if (x >=10){
        buttonProduction.disabled = false;
    } else { buttonProduction.disabled = true}
};
// Набор картинок для производства
let statusImg = {
    cpu: {
        desable: 'img/CpuDesable.png',
        enable: 'img/CpuEnable.png',
        active: 'img/CpuActive.png'
    },
    device: {
        desable: 'img/mehDesable.png',
        enable: 'img/mehEnable.png',
        active: 'img/mehActive.png'
    },
    soul: {
        desable: 'img/SoulDesable.png',
        enable: 'img/Soul.png',
        active: 'img/SoulActive.png'
    }

}
//Подсветка картинки наличия
function ItemsForImage (things, img){
    let pic = things.textContent;
    let nameObj = img[0].className;
    if(nameObj == 'soul'){
            img[0].src = statusImg[nameObj].desable;
            if (pic > 1){
                pic = 1;}
            } else{
                for (let i = 0; i < 4; i++){
                    img[i].src = statusImg[nameObj].desable;}
                    if (pic > 4){
                        pic = 4;
                    }
                }
                for(let i = pic - 1; i >= 0; i--){ 
                    img[i].src = statusImg[nameObj].enable;
                    }       
}

// Подсветка выбранных кнопок на производстве
buttonsPictures.addEventListener('click', function(e){
        if (e.target.classList.contains('device')){
             
             if (e.target.src.indexOf(statusImg.device.enable) != -1){
             e.target.src = statusImg.device.active;} else {
             if (e.target.src.indexOf(statusImg.device.active) != -1){
                e.target.src = statusImg.device.enable;}}      
        }; 
        if (e.target.classList.contains('cpu')){
            if (e.target.src.indexOf(statusImg.cpu.enable) != -1){
                e.target.src = statusImg.cpu.active;} else {
                if (e.target.src.indexOf(statusImg.cpu.active) != -1){
                   e.target.src = statusImg.cpu.enable;}}
        };
        if (e.target.classList.contains('soul')){
            if (e.target.src.indexOf(statusImg.soul.enable) != -1){
            e.target.src = statusImg.soul.active;} else {
                if (e.target.src.indexOf(statusImg.soul.active) != -1){
                   e.target.src = statusImg.soul.enable;}}
        };
        dev(buttonsPictures);
}) 

function dev (buttons){
    let dev = 0;
    let cpu = 0;
    let soul = 0;
    for (let i = 0; i < buttons.children.length; i++){
        if (buttons.children[i].className == 'device') { 
            if (buttons.children[i].src.indexOf(statusImg.device.active) != -1) { dev++; 
            }
        }
    } 
    for (let i = 0; i < buttons.children.length; i++){
        if (buttons.children[i].className == 'cpu') { 
            if (buttons.children[i].src.indexOf(statusImg.cpu.active) != -1)  {cpu++; }
        }
    }
    for (let i = 0; i < buttons.children.length; i++){
        if (buttons.children[i].className == 'soul') { 
            if (buttons.children[i].src.indexOf(statusImg.soul.active) != -1)  {soul++;} 
        }
    }
};


// Кнопки магазина
market5.addEventListener('click', function(){
    buttonMarket (-5, thing3, sale3);   
    ItemsForImage (thing3, imgCpu);
});

market7.addEventListener('click', function(){
    buttonMarket (-7, thing5, sale5);
    ItemsForImage (thing5, imgDevice);
});

market25.addEventListener('click', function(){
    buttonMarket (-25, thing15, sale15); 
    ItemsForImage (thing15, imgSoul);
});

//Отнимает монеты, прибавляет кол-во на складе
function buttonMarket (price, thing, sale){
    y = price;;
    ++thing.textContent;
    sale.disabled = false;
    bank(y);
}

// Подсчет штук на складе
function itemsInStock(thing, y, sale, img){
    if(thing.textContent > 0){
        bank (y);
        sale.disabled = false;
        if (x < 100 - y){
            --thing.textContent;
            
            ItemsForImage (thing, img);

            if(thing.textContent == 0){
                sale.disabled = true;
            }
        }
    } else {sale.disabled = true}
    
};

//Кнопки на складе
sale3.addEventListener('click', function(){
    itemsInStock(thing3, 3, sale3, imgCpu );  
});

sale5.addEventListener('click', function(){
    itemsInStock (thing5, 5, sale5, imgDevice)
});

sale15.addEventListener('click', function(){
    itemsInStock (thing15, 15, sale15, imgSoul)
});



//Кнопка производства
buttonProduction.addEventListener('click', function(){
    y = -10;;
    bank(y);
});

let kitTextProduction = [2, 3, 4, 'и'];
productionText.textContent = '';

const nameRadioFront=document.getElementsByName('question-one');
const nameRadioSex=document.getElementsByName('question-two');
const manImage = document.querySelector('.man');

const imagesRobo = {
    front:{
        male:{
            desable:'img/FrontMaleDesable.png',
            enable:'img/FrontMaleEnable.png',
            active:'img/FrontMaleActive.png',
        },
        famale:{
            desable:'img/FrontFamaleDesable.png',
            enable:'img/FrontFamaleEnable.png',
            active:'img/FrontFamaleActive.png',

        }
    },
    designer: {
        male:{
            desable:'img/DesignerMaleDesable.png',
            enable:'img/DesignerMaleEnable.png',
            active:'img/DesignerMaleActive.png',
        },
        famale:{
            desable:'img/DesignerFamaleDesable.png',
            enable:'img/DesignerFamaleEnable.png',
            active:'img/DesignerFamaleActive.png',
        }
    }
}

for(let i = 0; i < 2; i++){
    nameRadioFront[i].addEventListener('click', function(){
        
    
        if (nameRadioFront[i].value == 'frontend'){
                const imgMan = document.createElement('img');
                
                imgMan.src = imagesRobo.front.male.desable;
                manImage.appendChild(imgMan);
            
        } else{ imgMan.src='/img/man.png';
        manImage.appendChild(imgMan);

        }
        })
}

function radioCheck() {
    for (var i = 0; i < nameRadioFront.length; i++) {
      if (nameRadioFront[i].checked) {
        
      }
    }
  }

