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

    const getResource = async (url) => {
        //fetch возвращает объект типа Promise после выполненного запроса на сервер и полученного ответа с него
        //await говорит нам о том, что надо дождаться результата выполнения операции, прежде чем выполнять код дальше
        const result = await fetch(url);
        if (!result.ok){
            throw new Error(`Could not fetch ${url}. Status: ${result.status}`)
        }
        return await result.json(); //у Promise есть метод json
    };

    //1-й способ формирования карточки путем получения данных с JSON-server
    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         })
    //         // data.forEach((obj) => {
    //         //     new MenuCard(obj.img, obj.altimg, obj.title, obj.descr, obj.price, '.menu .container').render();
    //         // })
    //     })

    //2-й способ формирования карточки путем получения данных с JSON-server
    // getResource('http://localhost:3000/menu').then(data => createCard(data));

    // function createCard(data) {
        
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         const element = document.createElement('div');
    //         element.classList.add('menu__item');
    //         element.innerHTML = `
    //                             <img src=${img} alt=${altimg}>
    //                             <h3 class="menu__item-subtitle">${title}</h3>
    //                             <div class="menu__item-descr">${descr}</div>
    //                             <div class="menu__item-divider"></div>
    //                             <div class="menu__item-price">
    //                                 <div class="menu__item-cost">Цена:</div>
    //                                 <div class="menu__item-total"><span>${price}</span> грн/день</div>
    //                             </div>`;
    //         document.querySelector('.menu .container').appendChild(element);
    //     })
    // }  
    
    //3-й способ - использование библиотеки axios (подключение в файле index.html)
    axios.get('http://localhost:3000/menu')
        .then(data => {
                    data.data.forEach(({img, altimg, title, descr, price}) => {
                        new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
                    })
                });

    //Forms
    const forms = document.querySelectorAll('form');
    const message = {
        //load: 'Загрузка...',
        load: 'img/form/spinner.svg',
        success: 'Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    }

    forms.forEach(item => {
        bindPostData(item);
    })

    //async говорит нам о том, что функция будет выполняться асинхронно
    //data - данные, которые отправляем на сервер
    const postData = async (url, data) => {
        //fetch возвращает объект типа Promise после выполненного запроса на сервер и полученного ответа с него
        //await говорит нам о том, что надо дождаться результата выполнения операции, прежде чем выполнять код дальше
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data 
        });

        return await result.json(); //у Promise есть метод json
    }

    function bindPostData(form) {
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
            // formData.forEach((value, key) => {
            //     object[key] = value;
            // })

            //преобразуем данные из FormData в JSON другим методом
            //метод fromEntries из массива массивов формирует объект в виде ключ-значение
            //метод stringify уже из объекта формирует JSON
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
//            .then(data => data.text()) данные преобразования не нужны, потому что они выполняются в функции postData
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

    //slider - мой вариант
    // const slider = document.querySelector('.offer__slider'),
    //       left = slider.querySelector('.offer__slider-prev'),
    //       right = slider.querySelector('.offer__slider-next'),
    //       current = slider.querySelector('#current'),
    //       total = slider.querySelector('#total'),
    //       allSlides = slider. querySelectorAll('.offer__slide');

    // function hideAllSlides() {
    //     allSlides.forEach(item => {
    //         item.classList.add('hide');
    //     })
        
    // }
    // hideAllSlides();

    // function showSlide(index = 0) {
    //     allSlides[index].classList.add('show', 'fade');
    //     allSlides[index].classList.remove('hide');
    // }
    // showSlide();
    
    // function changeSlide(upDownState) {
    //     let count = (+current.textContent) - 1;
    //     switch(upDownState) {
    //         case 1:
    //             if (count == 3){
    //                 count = 0;
    //             } else {
    //                 count++;
    //             }

    //             break;
    //         case 2:
    //             if (count == 0) {
    //                 count = 3
    //             } else {
    //                 count--;
    //             }
    //             break;
    //         default:
    //             return;        
    //     }
    //     hideAllSlides();
    //     showSlide(count);
    //     current.textContent = getZero(count + 1);
    // }

    // left.addEventListener('click', (event) => {
    //     changeSlide(2);
    // });

    // right.addEventListener('click', (event) => {
    //     changeSlide(1);
    // });

    //вариант Петровича - хороший пример. Взять на заметку
    // Slider
    let offset = 0;
    let slideIndex = 1;
    const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        prev = document.querySelector('.offer__slider-prev'),
        next = document.querySelector('.offer__slider-next'),
        total = document.querySelector('#total'),
        current = document.querySelector('#current'),
        slidesWrapper = document.querySelector('.offer__slider-wrapper'),
        width = window.getComputedStyle(slidesWrapper).width,
        slidesFields = slidesWrapper.querySelector('.offer__slider-inner');
    
    if (slideIndex < 10) {
        current.textContent = `0${slideIndex}`;
        total.textContent = `0${slides.length}`;
    }else {
        current.textContent = `${slideIndex}`;
        total.textContent = `${slides.length}`;
    };

    slidesFields.style.width = 100 * slides.length + '%';   //задаем ширину объекту .offer__slider-inner равную ширине всех элементов
    slidesFields.style.transition = '0.5s all';
    slidesFields.style.display = 'flex';    //устанавливаем разметку типа flex
    
    slidesWrapper.style.overflow = 'hidden'; //прячем то что должно быть спрятано

    slides.forEach(slide => {
        slide.style.width = width; //установим каждому элементу ширину полученную выше
    });

    slider.style.position = 'relative '; ///!!!

    const indicators = document.createElement('ol'),    //создадим список без элементов
          dots = [];
    indicators.classList.add('carousel-indicators');
    //можно добавить через инлайн-стили, а можно в css-файл. Это один из вариантов
    indicators.style.cssText = `
                                position: absolute;
                                right: 0;
                                bottom: 0;
                                left: 0;
                                z-index: 15;
                                display: flex;
                                justify-content: center;
                                margin-right: 15%;
                                margin-left: 15%;
                                list-style: none;
                                `;
    slider.append(indicators);

    for(let i=0; i < slides.length; i++) {
        const dot = document.createElement('li');   //создаем внунтренние элементы в списке
        dot.setAttribute('data-slide-to', i + 1);
        dot.style.cssText = `
                            box-sizing: content-box;
                            flex: 0 1 auto;
                            width: 30px;
                            height: 6px;
                            margin-right: 3px;
                            margin-left: 3px;
                            cursor: pointer;
                            background-color: #fff;
                            background-clip: padding-box;
                            border-top: 10px solid transparent;
                            border-bottom: 10px solid transparent;
                            opacity: .5;
                            transition: opacity .6s ease;
                            `;
        if (i == 0) {
            dot.style.opacity = `1`;
        }
        dots.push(dot); //добавим в общий массив все индикаторы для дальнейших манипуляций
        indicators.append(dot);
    }

    next.addEventListener('click', () => {
        //если смещение offset равно достигному концу в списке по горизонтали
        if (offset == getNumber(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += getNumber(width); //увеличиваем смещение на ширину одного элемента
        }

        slidesFields.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == slides.length) {
            slideIndex = 1;
            current.textContent = slideIndex;
        }else {
            slideIndex++;
        }

        setCurrentValue();
        setOpacityDot();
    })

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = getNumber(width) * (slides.length - 1);
        } else {
            offset -= getNumber(width);
        }

        slidesFields.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        }else {
            slideIndex--;
        }

        setCurrentValue();
        setOpacityDot();
    })

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const indexDot = e.target.getAttribute('data-slide-to');
            slideIndex = indexDot;
            offset = getNumber(width) * (slideIndex - 1);  //рассчитаем смещение
            slidesFields.style.transform = `translateX(-${offset}px)`;
            setCurrentValue();
            setOpacityDot();
        })
    })

    function setCurrentValue() {
        if (slides.length < 10) {
            current.textContent =  `0${slideIndex}`;
        } else {
            current.textContent =  slideIndex;
        }
    }

    function setOpacityDot() {
        dots.forEach(dot => dot.style.opacity = '.5');  //установим всем индикаторам прозрачность 50%
        dots[slideIndex - 1].style.opacity = 1;           //установим активному индикатору видимость равную 100%
    }

    function getNumber(str) {
        return +(width.replace(/\D/g, ''));
    }

    // showSlides(slideIndex);

    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }

    // function showSlides(n) {
    //     if (n > slides.length) {
    //         slideIndex = 1;
    //     }
    //     if (n < 1) {
    //         slideIndex = slides.length;
    //     }

    //     slides.forEach((item) => item.style.display = 'none');

    //     slides[slideIndex - 1].style.display = 'block'; // Как ваша самостоятельная работа - переписать на использование классов show/hide
        
    //     if (slides.length < 10) {
    //         current.textContent =  `0${slideIndex}`;
    //     } else {
    //         current.textContent =  slideIndex;
    //     }
    // }

    // function plusSlides (n) {
    //     showSlides(slideIndex += n);
    // }

    // prev.addEventListener('click', function(){
    //     plusSlides(-1);
    // });

    // next.addEventListener('click', function(){
    //     plusSlides(1);
    // });



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