'use strict'

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import  tabs from './modules/tabs';
import  cards from './modules/cards';
import  calc from './modules/calc';
import  forms from './modules/forms';
import  modal from './modules/modal';
import  slider from './modules/slider';
import  timer from './modules/timer';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    
    const modalTimerId = setTimeout(()=> openModal('.modal', modalTimerId), 300000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    cards();
    calc();
    forms('form', modalTimerId);
    modal('[data-modal]', '.modal', modalTimerId);
    timer('.timer', '2022-06-01');      
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });

    // //тестовый GET-запрос на сервер с Json-данными через промисы
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    // .then(response => response.json())
    // .then(json => console.log(json));

    // //тестовый POST-запрос на сервер с JSON-данными через промисы
    // fetch('https://jsonplaceholder.typicode.com/posts', {
    //     method: 'POST',
    //     headers: {
    //         'Content-type': 'application-json'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(json => console.log(json))
    
    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));

})