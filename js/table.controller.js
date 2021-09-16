const tableController = (function (modelCtrl, uiTable) {
    //Получаем из table.view.js обьект со всеми селекторами, которые нужны для работы приложения
    const DOM = uiTable.getDomStrings();

    //Массив обьектов всех заявок, которые хранятся в LocalStorage (которые мы вводим на странице формы регистрации 01-form.html и записываем в data)
    const requestsFromStorage = modelCtrl.data.allRequests;


    //Находим в разметке контейнер со всеми заявками tbody с tr
    const reguestsContainer = document.querySelector(DOM.requestsContainer);

    //Фильтр для курсов (контейнер для курсов select c options)
    const filterCourses = document.querySelector(DOM.filterCourses);

    //Верхняя панель фильтров статусов заявок
    const filterStatusesTop = document.querySelector(DOM.filterStatusTop);

    //Все элементы (ссылки) с верхней панели фильтров статусов заявок
    const filterStatusesTopItems = document.querySelectorAll(DOM.filterStatusTopItem);

    //Левая панель фильтров статусов заявок
    const filterStatusesLeft = document.querySelector(DOM.filterStatusLeft);

    //Все элементы (ссылки) с левой панели фильтров статусов заявок
    const filterStatusesLeftItems = document.querySelectorAll(DOM.filterStatusLeftItem);


    //Записываем значение фильтров для статуса и курса (по умолчанию: статус:все, курсы: все)
    const filter = {
        status: "all",
        course: "all"
    };

    //Обьект со статусами заявок и их количеством
    const statuses = {
        new: 0,
        current: 0,
        finished: 0,
        archive: 0
    };

    //Массив статусов заявок: ["new", "current", "finished", "archive"]
    const statusesKeys = Object.keys(statuses);

    //В обьекте с заявками проверяем каждый элемент, смотрим, совпадает ли его статус с одим из элементов массива статусов заявок и  считаем количество всех совпадений
    function calculateRequestsStatuses(requests) {

        // сброс предыдущих значений
        //statusesKeys.map(key => statuses[key] = 0);
        for (let key in statuses) {
            statuses[key] = 0;
        }

        requests.forEach(function (item, index) {
            statuses[item.status] += 1;
        });
    }

    //Отображаем количество заявок по разным статусам на странице всех заявок
    function showStatusesAmount() {

        filterStatusesLeftItems.forEach(function (item, index) {
            const elementStatus = item.dataset.status;
            if (statuses[elementStatus]) {
                item.firstElementChild.classList.remove("hidden");
                item.firstElementChild.textContent = statuses[elementStatus];
            }
        });
    }

    //Функция работает при клике на выбранный элемент, получает значение статуса у этого элемента и сохраняет это значение в фильтр, отображает на странице данные, согласно фильтру выбранного значения 
    function handleStatusClick(e) {
        e.preventDefault();
        const element = e.target.closest("[data-status]"); // определяем, что клик был по элементу или его детям

        const newStatus = element.dataset.status; // получаем значение статуса у элемента, по которому был клик (то что мы задавали в разметке)

        filter.status = newStatus; // сохраняем новое значение в фильтр 

        const filteredRequests = filterRequests(requestsFromStorage, filter); // получаем отфильтрованный массив согласно новому фильтру
        uiTable.renderListRequests(filteredRequests); // отображаем новые данные на странице 

        setActiveLeftFilter(newStatus);

        setActiveTopFilter(newStatus);
    }

    //На левой панеле фильтров статусов ячейке со статусом, равным статусу выбраннной ячейки на верхней панеле фильтров статусов, задаем активный класс, у всех остальных ячеек убираем активный класс
    function setActiveLeftFilter(currentdStatus) {
        //Находим элемент с классом "active" и удаляем у элемента этот класс
        const activeItem = filterStatusesLeft.querySelector(".active");
        if (activeItem) {
            activeItem.classList.remove("active");
        }

        //Задаем выбранному элементу активный класс
        filterStatusesLeft.querySelector(`[data-status="${currentdStatus}"]`).classList.add("active");
    }

    //На верхней панеле фильтров статусов ячейке со статусом, равным статусу выбраннной ячейки на левой панеле фильтров статусов, задаем фокусировку (item:active)
    function setActiveTopFilter(currentdStatus) {
        filterStatusesTop.querySelector(`[data-status="${currentdStatus}"]`).focus();
    }

    //Отслеживаем событие клика по верхней панеле фильтров статусов заявок и передаем функцию фильтрации и отображения элементов на странице по выбранному параметру
    filterStatusesTop.addEventListener("click", handleStatusClick);

    //Отслеживаем событие клика по левой панеле фильтров статусов заявок и передаем функцию фильтрации и отображения элементов на странице по выбранному параметру
    filterStatusesLeft.addEventListener("click", handleStatusClick);

    //Отслеживаем событие клика по панеле фильтров курсов
    filterCourses.addEventListener("change", function (e) {
        e.preventDefault();
        const newCourse = e.target.value; // получаем значение продукта. Это значение как раз выбранного элемента списка селекта (то что мы настраивали для каждого option) 
        filter.course = newCourse; // сохраняем новое значение в фильтр  
        const filteredRequests = filterRequests(requestsFromStorage, filter); // получаем отфильтрованный массив согласно новому фильтру
        uiTable.renderListRequests(filteredRequests); // отображаем новые данные на странице  
        calculateRequestsStatuses(filteredRequests);
        showStatusesAmount();
    });


    //функция filterRequests будет принимать два аргумента: исходный массив с заявками requestsи объект со значениями фильтров filter. Принцип работы функции следующий: берем значение статуса и, если оно отлично от all, оставляем в массиве только заявки с соответствующим статусом. Далее, берем значение продукта и, если оно отлично от all, оставляем в массиве только заявки с соответствующим продуктом. То есть сначала в исходном массиве оставили заявки с указанным статусом, потом уже в обновленном массиве оставили заявки с указанным продуктом (получается двойная фильтрация данных). 

    function filterRequests(requests, filter) {
        let filteredRequests = requests;

        if (filter.status !== "all") {
            filteredRequests = filteredRequests.filter(request => request.status === filter.status);
        }

        if (filter.course !== "all") {
            filteredRequests = filteredRequests.filter(request => request.course === filter.course);
        }

        return filteredRequests;
    }

    return {
        //Возвращаем функцию для прослушки событий setupEventListener как метод init
        init: function () {
            //Вывод списка заявок из LocalStorage на страницу
            uiTable.renderListRequests(requestsFromStorage),
                calculateRequestsStatuses(requestsFromStorage),
                showStatusesAmount()
        }
    };


})(modelController, tableView);


tableController.init();