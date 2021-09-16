const modelController = (function () {

    //Создаем конструктор для формы регистрации заявок
    const Request = function (id, name, phone, mail, course, status, date) {
        this.id = id;
        this.name = name;
        this.phone = phone;
        this.mail = mail;
        this.course = course;
        this.status = status;
        this.date = date;
    };

    //Функция записи новой заявки
    function addRequest(name, phone, mail, course) {
        let date = new Date();
        let status = 'new';
        let ID = 0;

        //Создаем ID, проверяем массив заявок allRequests на наличие в нем элементов, если массив пустой (заявок нет еще), то ID первого элемента равно нулю  (ID = 0)
        if (data.allRequests.length > 0) {
            //Рассчитываем ID каждого нового элемента как индекс предыдущего + 1
            const lastIndex = data.allRequests.length - 1;
            ID = data.allRequests[lastIndex].id + 1;
        }

        //Создаём объект новой заявки
        const newRequest = new Request(ID, name, phone, mail, course, status, date);

        //Записываем новую заявку (объект) в структуру данных data
        data.allRequests.push(newRequest);

        //Возвращаем новый (добавленный) объект заявки
        return newRequest;
    }


    // Передаем данные о заявках из data в LocalStorage
    function addDataToStorage() {
        //Передаем в LocalStorage массив обьектов со всеми полученными заявками
        localStorage.setItem("allRequests", JSON.stringify(data.allRequests));
    }

    const data = {

        //Все заявки из формы регистрации храним в localStorage в виде массива обьектов
        allRequests: JSON.parse(localStorage.getItem("allRequests")) || [],
    };


    return {
        //Возвращаем массив обьектов заявок формы регистрации из localStorage
        data,
        addRequest: addRequest,
        addDataToStorage: addDataToStorage,
        test: function () {
            console.log(data);
        }
    };


})();