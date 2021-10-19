//Обработчик событий, который отслеживает загрузку контента
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const btnOpenModal = document.querySelector('#btnOpenModal'),
          modalBlock = document.querySelector('#modalBlock'),
          closeModal = document.querySelector('#closeModal'),
          questionTitle = document.querySelector('#question'),
          formAnswers = document.querySelector('#formAnswers'),
          nextButton = document.querySelector('#next'),
          prevButton = document.querySelector('#prev'),
          sendButton = document.querySelector('#send'),
//объект, который содержит вопрос и ответ
          questions = [
            {
                question: "Какого цвета бургер?",
                answers: [
                    {
                        title: 'Стандарт',
                        url: './image/burger.png'
                    },
                    {
                        title: 'Черный',
                        url: './image/burgerBlack.png'
                    }
                ],
                type: 'radio'
            },
            {
                question: "Из какого мяса котлета?",
                answers: [
                    {
                        title: 'Курица',
                        url: './image/chickenMeat.png'
                    },
                    {
                        title: 'Говядина',
                        url: './image/beefMeat.png'
                    },
                    {
                        title: 'Свинина',
                        url: './image/porkMeat.png'
                    }
                ],
                type: 'radio'
            },
            {
                question: "Дополнительные ингредиенты?",
                answers: [
                    {
                        title: 'Помидор',
                        url: './image/tomato.png'
                    },
                    {
                        title: 'Огурец',
                        url: './image/cucumber.png'
                    },
                    {
                        title: 'Салат',
                        url: './image/salad.png'
                    },
                    {
                        title: 'Лук',
                        url: './image/onion.png'
                    }
                ],
                type: 'checkbox'
            },
            {
                question: "Добавить соус?",
                answers: [
                    {
                        title: 'Чесночный',
                        url: './image/sauce1.png'
                    },
                    {
                        title: 'Томатный',
                        url: './image/sauce2.png'
                    },
                    {
                        title: 'Горчичный',
                        url: './image/sauce3.png'
                    }
                ],
                type: 'radio'
            }
        ];


//обработчики событий на кнопку открытия и закрытия модального окна
    btnOpenModal.addEventListener('click', () => {
        modalBlock.classList.add('d-block');
        playTest();
    });

    closeModal.addEventListener('click', () => {
        modalBlock.classList.remove('d-block');
    });
//функция запуска тестирования

    const playTest = () => {
        const finalAnswers = [];
//переменная с номером вопроса
        let numberQuestion = 0;
//функция рендеринга ответов
        const renderAnswers = (index) => {
            questions[index].answers.forEach( answer => {
                const answerItem = document.createElement('div');
                answerItem.classList.add('answers-item','d-flex', 'justify-content-center');
                answerItem.innerHTML = `
                <input type="${questions[index].type}" id="${answer.title}" name="answer" class="d-none" value = "${answer.title}">
                <label for="${answer.title}" class="d-flex flex-column justify-content-between">
                <img class="answerImg" src="${answer.url}" alt="burger">
                <span>${answer.title}</span>
                </label>
                `;

                formAnswers.appendChild(answerItem);


            });
        };
//функция рендеринга вопросов и ответов        
        const renderQuestions = (indexQuestion) => {
            formAnswers.innerHTML = '';

            if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                questionTitle.textContent = `${questions[indexQuestion].question}`;
                renderAnswers(indexQuestion);
                nextButton.classList.remove('d-none');
                prevButton.classList.remove('d-none');
                sendButton.classList.add('d-none');
               
            }
            if (numberQuestion === 0) {
               prevButton.classList.add('d-none');
            }
            if (numberQuestion === questions.length) {
                nextButton.classList.add('d-none');
                prevButton.classList.add('d-none');
                sendButton.classList.remove('d-none');
                formAnswers.innerHTML = `
                <div class="form-group">
                <label for="numberPhone">Enter your number</label>
                <input type="phone" class="form-control" id="numberPhone">
              </div>
                `;
            }
            if (numberQuestion === questions.length + 1) {
                formAnswers.textContent = 'Спасибо за пройденный тест!';
                setTimeout(() => {
                    modalBlock.classList.remove('d-block');
                }, 2000);
            }
         };
//запуск (единожды) функции рендеринга
        renderQuestions(numberQuestion);  
        const checkAnswer = () => {
            const obj = {};

            const inputs = [...formAnswers.elements].filter((input) => input.checked || input.id === 'numberPhone');
            
            inputs.forEach ((input, index) => {
                if (numberQuestion >= 0 && numberQuestion <= questions.length - 1) {
                    obj[`${index}_${questions[numberQuestion].question}`] = input.value;
                }

                if (numberQuestion === questions.length) {
                    obj['Номер телефона'] = input.value;
                }

            });

            finalAnswers.push(obj);

        };
//обработчики событий кнопок nrxt/prev
        nextButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };
    
        prevButton.onclick = () => {
            numberQuestion--;
            renderQuestions(numberQuestion);
        };

        sendButton.onclick = () => {
            checkAnswer();
            numberQuestion++;
            renderQuestions(numberQuestion);
        };

       
    };

   

});



