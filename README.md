<h1 style="text-align: center;">Crypto App - личный кабинет для взаимодействия с криптокошельками и возможностью обмена валют
</h1>

<img style="text-align: center; max-width: 600px;"
src="https://github.com/din366/images/blob/main/readme%20images/crypto-app/single-bill-desktop.jpg" alt="project image">

<a href="https://crypto-wallet-bice.vercel.app" style="text-align: center;">Развернутое приложение на Vercel</a>

----------------------
:red_circle: Тестовый аккаунт:
### логин: admin
## пароль: developer
----------------------

:warning:
Из-за ограничений Vercel при работе api с папкой tmp некорректно отрабатывает добавление нового кошелька и переводы между кошельками/между валютами.
Также из-за отсутствия поддержки websocket в vercel - неактивно "Изменение курса в режиме реального времени".

## Что может приложение:

<ol>
    <li>Осуществление авторизации пользователя с получением токена для возможности повторного открытия приложения без необходимости авторизации.</li>
    <li>Получение всех существующих счетов аккаунта</li>
    <li>Открытие нового счета внутри аккаунта</li>
    <li>Получение детальных данных о счете: баланс, даты открытия, последней транзакции, списка всех транзакций, отображение динамики изменения баланса за последние 6 месяцев</li>
    <li>Возможность осуществлять перевод средств между счетами аккаунта</li>
    <li>Получение изменений курса валют в режиме реального времени посредством websocket</li>
    <li>Получение данных о всех текущих валютах аккаунта</li>
    <li>Возможность совершать обмен валюты внутри аккаунта</li>
    <li>Присутствует мобильная версия для возможности использования приложения на разных устройствах</li>
</ol>

## Используемые подходы и инструменты:

<ol>
  <li>React</li>
  <li>Redux/Toolkit</li>
  <li>Redux Thunk</li>
  <li>Formik</li>
  <li>Axios</li>
  <li>Recharts - отображение диаграмм</li>
  <li>Scss</li>
  <li>Vite</li>
</ol>

## Подробнее о реализации проекта:

<h3 style="text-decoration: underline">Основа:</h3>

<p>- Данный проект реализован на базе Vite + React + Redux/thunk/p>
<p>- Для обращения к api приложения использовался Axios/p>
<p>- Стили написаны с нуля при помощи SCSS, присутствуют глобальные переменные стиля для возможности дальнейшего масштабирования проекта</p>

<h3 style="text-decoration: underline">Страница логина:</h3>

<p>- На странице реализовано стандартное окно логина. Форма логина использует formik. На фронте реализована проверка простых ошибок для уменьшения нагрузки на сервер 
с отображением ошибки в конкретной строке ввода. При отправке неверных данных логина или пароля на сервер появляется информация об ошибочно введенных данных (данная информация приходит с сервера).</p>
<p>- В хедере после логина появляется иконка пользователя с возможностью логаута.</p>

<img style="text-align: center; max-width: 600px;"
src="https://github.com/din366/images/blob/main/readme%20images/crypto-app/login.gif" alt="project image">

<h3 style="text-decoration: underline">Страница аккаунта:</h3>

<p>- На данной странице представлены все кошельки на текущем аккаунте. На данной странице реализована возможность сортировки по определенным параметрам.</p>

<p>- Также есть возможность открыть новый счет (при открытии нового счета отправляется запрос на сервер и сервер возвращает все текущие счета с только что созданным)</p>

<p>- Каждый счет представлен следующей информацией: номер счета, текущий баланс, дата открытия счета, дата последней транзакции.</p>

<img style="text-align: center; max-width: 600px;"
src="https://github.com/din366/images/blob/main/readme%20images/crypto-app/bills.gif" alt="project image">

<h3 style="text-decoration: underline">Страница счета:</h3>

<p>- На странице представлены детальная информация о счете: номер счета, текущий баланс, дата открытия и дата последней транзакции.</p>
<p>- Присутствует отображение динамики изменения баланса на счете за последние 6 месяцев.</p>
<p>- История переводов содержит последние 100 транзакций (для уменьшения нагрузки на UI рендер был ограничен 100 элементами при помощи селектора)</p>
<p>- Имеется возможность перевода средств между счетами аккаунта. Для удобства выбора в форме присутствуют все счета пользователя, а также сразу отображается текущий баланс каждого аккаунта.</p>
<p>- При отправке данных формы также присутствуют проверки как на фронте, так и на бэке. Каждая ошибка обрабатывается с последующим отображением в UI.</p>

<img style="text-align: center; max-width: 600px;"
src="https://github.com/din366/images/blob/main/readme%20images/crypto-app/singleBill.gif" alt="project image">

<h3 style="text-decoration: underline">Страница обмена валют:</h3>

<p>- На странице представлено изменение курса в режиме реального времени. Эти данные обновляются посредством websocket. Обновление происходит каждую секунду.</p>
<p>- Также представлены все валюты, которые есть на аккаунте.</p>
<p>- Есть возможность обмена данных валют внутри аккаунта.</p>
<p>- В форме также реализована обработка всех ошибок с отображением данных в UI</p>

<img style="text-align: center; max-width: 600px;"
src="https://github.com/din366/images/blob/main/readme%20images/crypto-app/exchange.gif" alt="project image">

<h3 style="text-decoration: underline">Мобильная верстка:</h3>

<p>Для мобильных устройств реализован удобный и интуитивно понятный интерфейс. При совершении каких-либо операций реализовано отображение попап окна с уведомлением для улучшений UX.</p>

<img style="text-align: center; max-width: 600px; max-height: 600px;"
src="https://github.com/din366/images/blob/main/readme%20images/crypto-app/mobile.gif" alt="project image">

<p>Для работы с приложением:</p>

## сборка приложения
### `npm run dev`

- запуск осуществляется по адресу [http://localhost:5173/](http://localhost:5173/)

### Для тестирования всех возможностей приложения необходимо запустить backend-api локально (файлы api - https://github.com/maksim-leskin/c-money-api). 
### При запуске локально, в текущем проекте, в файле src/globalVars.js необходимо изменить параметр isLocal на значение true;