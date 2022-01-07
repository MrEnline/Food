'use strict'

window.addEventListener('DOMContentLoaded', () => {
    const tabs = require('./modules/tabs'),
          cards = require('./modules/cards'),
          calc = require('./modules/calc'),
          forms = require('./modules/forms'),
          modal = require('./modules/modal'),
          slider = require('./modules/slider'),
          timer = require('./modules/timer');
    
    tabs();
    cards();
    calc();
    forms();
    modal();
    slider();
    timer();      

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