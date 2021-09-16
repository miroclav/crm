const editView = (function () {

    const DOMstrings = {
        requestContainer: ".card-body", //контейнер для редактируемой заявки
        coursesContainer: ".course-select", //контейнер для выбора курса
        statusesContainer: ".status-select", //контейнер для выбора  статуса заявки
        saveBtn: '[data-btn="save"]',
        deleteBtn: '[data-btn="delete"]',
        requestNumber: ".request-number",
        requestDate: ".request-date",
        requestName: ".request-name",
        requestMail: ".request-mail",
        requestPhone: ".request-phone"
    };

    //Создаем шаблон для вставки нужных данных в редактируемую заявку
    function renderEditableRequest(request) {

        const editableRequestContainer = document.querySelector(DOMstrings.requestContainer);

        editableRequestContainer.querySelector(DOMstrings.requestNumber).textContent = `Заявка № ${request.id+1}`;
        editableRequestContainer.querySelector(DOMstrings.requestDate).textContent = new Date(request.date).toLocaleString();
        editableRequestContainer.querySelector(DOMstrings.requestName).value = request.name;
        editableRequestContainer.querySelector(DOMstrings.requestMail).value = request.mail;
        editableRequestContainer.querySelector(DOMstrings.requestPhone).value = request.phone;
        editableRequestContainer.querySelector(DOMstrings.coursesContainer).value = request.course;
        editableRequestContainer.querySelector(DOMstrings.statusesContainer).value = request.status;
    }

    //Получаем данные из формы с редактируемой заявкой и возвращаем объект с данными, чтобы передать их в контроллер
    function getFormData() {
        return {
            id: document.querySelector(DOMstrings.requestNumber).textContent.split(" ")[2] - 1,
            course: document.querySelector(DOMstrings.coursesContainer).value,
            name: document.querySelector(DOMstrings.requestName).value,
            mail: document.querySelector(DOMstrings.requestMail).value,
            phone: document.querySelector(DOMstrings.requestPhone).value,
            status: document.querySelector(DOMstrings.statusesContainer).value
        };
    }

    return {
        //Отображаем редактируемую заявку на странице 
        renderEditableRequest: renderEditableRequest,
        getFormData: getFormData,

        //Функция возвращает обьект DOMstrings с селекторами, которые нужны для работы приложения
        getDomStrings: function () {
            return DOMstrings;
        }
    };

})();