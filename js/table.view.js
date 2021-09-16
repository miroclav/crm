const tableView = (function () {

    //Записываем в обьект DOMstrings все селекторы, которые нужны для работы приложения
    const DOMstrings = {
        status: '[data-status]',
        row: '[data-row]',
        requestsContainer: "#requests-list", //tdbody таблица с рядами, в которых отображены данные по заявкам (контейнер для всех заявок)
        filterCourses: "#inputGroupSelect01", //select c options  (контейнер для курсов)
        filterStatusLeft: ".left-panel__navigation", // ссылки на фильтр заявок по статусу (левая панель)
        filterStatusLeftItem: ".left-panel__navigation a", //Все элементы (ссылки) с верхней панели фильтров статусов заявок
        filterStatusTop: "#filter-status-top", // ссылки на фильтр заявок по статусу (верхняя панель)
        filterStatusTopItem: "#filter-status-top a" //Все элементы (ссылки) с верхней панели фильтров статусов заявок
    };


    //Создаем html-разметку для отображения каждой новой заявки из формы на странице всех заявок
    function renderListRequests(requests) {
        //Находим контейнер, где в разметке страницы всех заявок будут отображаться полученные из хранилища заявки
        const requestsContainer = document.querySelector(DOMstrings.requestsContainer);

        //Удаляем старые данные со страницы, оставляем контейнер для заявок пустым 
        requestsContainer.innerHTML = "";

        requests.forEach(function (request) {
            //Создаем шаблон для отображения полученной из хранилища заявки на странице всех заявок
            requestTemplate = `
        <tr>
        <th scope="row">${request.id + 1}</th>
        <td>${new Date(request.date).toLocaleDateString()}</td>
        <td>${getProductName(request.course)}</td>
        <td>${request.name}</td>
        <td>${request.mail}</td>
        <td>${request.phone}</td>
        <td data-edit style="text-align: center">${setStatusTemplate(request.status)}</td>
        <td>
            <a href="03-crm-edit-bid.html?id=${request.id}">Редактировать</a>
        </td>
    </tr>
        `;

            //Вставляем шаблон новой заявки в контейнер заявок в конец
            requestsContainer.insertAdjacentHTML('beforeend', requestTemplate);

        });
    }


    //Возращаем текстовое значение курса 
    function getProductName(course) {
        switch (course) {
            case 'course-html':
                return 'Курс по верстке';
            case 'course-js':
                return 'Курс по JavaScript';
            case 'course-vue':
                return 'Курс по VUE JS';
            case 'course-php':
                return 'Курс по PHP';
            default:
                return 'Курс по WordPress';
        }
    }


    //Изменяем  дизайн статуса заказа: цвет и надпись (в зависиммости от преданного статуса)
    function setStatusTemplate(status) {
        switch (status) {
            case 'new':
                return '<div class="badge badge-pill badge-danger">Новый</div>';
            case 'current':
                return '<div class="badge badge-pill badge-warning">В работе</div>';
            case 'pending':
                return '<div class="badge badge-pill badge-pending">Ожидается оплата</div>';
            case 'finished':
                return '<div class="badge badge-pill badge-finished">Завершенный</div>';
            default:
                return '<div class="badge badge-pill badge-success">Удаленный</div>';
        }
    }







    //Возвращаем данные (методы) из table.view.js, чтобы иметь возвожность использовать их в других (внешних) файлах(скриптах)
    return {
        //Отображаем заявки на странице 
        renderListRequests: renderListRequests,

        //Функция возвращает обьект DOMstrings с селекторами, которые нужны для работы приложения
        getDomStrings: function () {
            return DOMstrings;
        }
    };
})();