'use strict'

window.addEventListener('DOMContentLoaded', () => {

    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');
          
    function hideTabContent() {
        tabsContent.forEach(item => {
            //item.style.display = 'none';
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        })

        tabs.forEach(tab => {
            tab.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        //tabsContent[i].style.display = 'block';
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;
        
        if (target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if (item == target) {
                    hideTabContent();
                    showTabContent(i);
                }
            });        
        }
    })

    hideTabContent();
    showTabContent();

    //Timer

    const deadline = '2022-01-31';
    function getRemainingTime(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(total / (1000 * 60 * 60 * 24)),
            hours = Math.floor((total / (1000 * 60 * 60)) % 24 - 3),
            minutes = Math.floor((total / 1000 / 60) % 60),
            seconds = Math.floor((total / 1000)) % 60;

        return {
            total,
            days,
            hours,
            minutes,
            seconds
        }
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        }
        else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

            updateClock();
        function updateClock() {
            const lastTime = getRemainingTime(endtime); 
            days.innerHTML = getZero(lastTime.days);
            hours.innerHTML = getZero(lastTime.hours);
            minutes.innerHTML = getZero(lastTime.minutes);
            seconds.innerHTML = getZero(lastTime.seconds);

            if (timeInterval <= 0) {
                clearInterval(timeInterval);
            }
        }    
    }

    setClock('.timer', deadline);

    //Modal

    const btnsOpenModalWindow = document.querySelectorAll('[data-modal]'),
          modalWindow = document.querySelector('.modal'),
          modalWindowStyle = window.getComputedStyle(modalWindow),
          btnCloseModalWindow = document.querySelector('[data-close]');
    
    // btnsOpenModalWindow.forEach((item, i) => {
    //     item.addEventListener('click', (event) => {
    //         //modalWindowStyle.display = 'block';
    //         //modalWindow.style.display = 'block';
    //         modalWindow.classList.add('show');
    //         modalWindow.classList.remove('hide');
    //         //modalWindow.classList.toggle('show');
    //         document.body.style.overflow = 'hidden';    //блокировка прокрутки открытии модального окна
    //     })            
    // })

    // btnCloseModalWindow.addEventListener('click', (event) => {
    //     //modalWindow.style.display = 'none';
    //     modalWindow.classList.add('hide');
    //     modalWindow.classList.remove('show');
    //     //modalWindow.classList.toggle('show');
    //     document.body.style.overflow = '';
    // })

    function openModal() {
        modalWindow.classList.add('show');
        modalWindow.classList.remove('hide');
        document.body.style.overflow = 'hidden';    //блокировка прокрутки открытии модального окна
        //clearInterval(openModalTime);
    }

    btnsOpenModalWindow.forEach((item, i) => {
        item.addEventListener('click', openModal);       
    })

    function closeModal() {
        modalWindow.classList.add('hide');
        modalWindow.classList.remove('show');
        document.body.style.overflow = '';
    }

    btnCloseModalWindow.addEventListener('click', closeModal);

    modalWindow.addEventListener('click', (event) => {
        if (event.target === modalWindow || event.target.classList.contains('modal__close')) {
            closeModal();
        }
    })

    document.addEventListener('keydown', (event) => {
        //проверяем условие - нажата ли кнопка Esc и открыто ли окно, т.е. есть ли в налчии у него класс show
        if (event.code === 'Escape' && modalWindow.classList.contains('show')) {
            closeModal();
        }
    })

    //const openModalTime = setInterval(openModal, 500000);

    function showModalByScroll () {
        //если прокрученная часть + видимая часть больше либо равно концу документа
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Вариант Петровича
    //селектор можно указывать родитель пробел потомок как в этом примере. И в итоге вставляем в потомок новый элемент div
    //добавлен остаточный параметр classes
    class MenuCard {
        constructor(src, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
        }

        //Исходный вариант
        // render() {
        //     const element = document.createElement('div');
        //     element.innerHTML = `<div class="menu__item">
        //                              <img src=${this.src} alt=${this.alt}>
        //                              <h3 class="menu__item-subtitle">${this.subtitle}</h3>
        //                              <div class="menu__item-descr">${this.descr}</div>
        //                              <div class="menu__item-divider"></div>
        //                              <div class="menu__item-price">
        //                                  <div class="menu__item-cost">Цена:</div>
        //                                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        //                              </div>
        //                          </div>`;
        //     this.parent.append(element);
        // }

        render() {
            const element = document.createElement('div');
            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                element.classList.add(this.classes);
            }else {
                this.classes.forEach(className => element.classList.add(className));
            }
            element.innerHTML = `
                                <img src=${this.src} alt=${this.alt}>
                                <h3 class="menu__item-subtitle">${this.subtitle}</h3>
                                <div class="menu__item-descr">${this.descr}</div>
                                <div class="menu__item-divider"></div>
                                <div class="menu__item-price">
                                    <div class="menu__item-cost">Цена:</div>
                                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                </div>`;
            this.parent.append(element);
        }
    }

    new MenuCard('img/tabs/vegy.jpg', 
                 'vegy', 
                 'Меню "Фитнес"',
                 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                 '229',
                 '.menu .container',
                 'menu__item', 'big').render();
    new MenuCard('img/tabs/elite.jpg',
                 'elite',
                 'Меню "Премиум"',
                 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                 '550',
                 '.menu .container',
                 'menu__item').render();
    new MenuCard('img/tabs/post.jpg', 
                 'post', 
                 'Меню "Постное"',
                 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                 '430',
                 '.menu .container').render();

    //Forms
    const forms = document.querySelectorAll('form');
    const message = {
        //load: 'Загрузка...',
        load: 'img/form/spinner.svg',
        success: 'Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        postData(item);
    })

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 

            //let statusMessage = document.createElement('div');
            let statusMessage = document.createElement('img');
            statusMessage.classList.add('status');
            //statusMessage.textContent = message.load;
            statusMessage.src = message.load;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `
            //form.appendChild(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);  //вставляет новый блок в форму после последнего элемента - afterend
            
            //вариант 1 - отправка данных через FormData
            const formData = new FormData(form);    //получает данные из формы (элементы input) и формирует словарь внутри себя для передачи данных
            const object = {};
            //преобразуем данные из FormData в словарь
            formData.forEach((value, key) => {
                object[key] = value;
            })

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(object)    //преобразуем словарь в Json-объект
            })
            .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(() => {
                showThanksModal(message.failure);
            })
            .finally(() => {
                form.reset();
            });
        })
    }

    function showThanksModal(message) {
        //получаем ссылку на текущий объект с классом modal__dialog
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');  //прячем его
        openModal();    //открываем модальное окно
        const newModalDialog = document.createElement('div');   //создаем новый модальный диалог с классом modal__dialog
        newModalDialog.classList.add('modal__dialog');
        newModalDialog.innerHTML = `
                                    <div class="modal__content">
                                        <div data-close class="modal__close">×</div>
                                        <div class="modal__title">${message}</div>
                                    </div>    
        `;
        document.querySelector('.modal').append(newModalDialog);    //добавляем в структуру с классом .modal новый диалог
        
        setTimeout(() => {
            newModalDialog.remove();    //удаляем текущий диалог через 4 секунды
            prevModalDialog.classList.add('show');  //делаем видимым старый диалог
            prevModalDialog.classList.remove('hide');
            closeModal();               //закрываем диалог
        }, 2000);    
    }

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
    
})