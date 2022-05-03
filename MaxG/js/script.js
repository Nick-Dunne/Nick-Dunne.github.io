'use strict';
//управление видео
window.addEventListener('DOMContentLoaded', ()=>{

const play = document.querySelector('.about__play');
const video = document.querySelector('.about__video video');
play.addEventListener('click', ()=>{
    video.play();
    play.style.display = 'none';
    video.setAttribute('controls', '');
});
//управление видео окончено










});
