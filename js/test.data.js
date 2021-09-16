//Добавляем тестовые данные для формы регистрации
const generateTestData = (function () {
    //Сознаем функцию-конструктор для создания обьекта с тестовыми данными
    const ExampleItem = function (name, phone, mail, course) {
        this.name = name;
        this.phone = phone;
        this.mail = mail;
        this.course = course;
    };

    //Создаем массив обьектов с тестовыми данными
    const testData = [
        new ExampleItem("Nick Drake", "+5 (380) 946-57-83", "drake@gmail.com", 'course-html'),
        new ExampleItem("Julia Cameron", "+7 (380) 876-56-53", "cameron@gmail.com", 'course-js'),
        new ExampleItem("Jessica Alba", "+3 (380) 566-57-32", "alba@gmail.com", 'course-wordpress'),
        new ExampleItem("John Black", "+8 (380) 877-59-13", "black@gmail.com", 'course-php'),
        new ExampleItem("Henry Adams", "+9 (380) 678-55-39", "adams@gmail.com", 'course-vue'),
        new ExampleItem("Ben Affleck", "+5 (380) 126-67-83", "affleck@gmail.com", 'course-wordpress'),
    ];

    //Фукция возвращает случайное целое число от 0 до max
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    //Функция вставки тестового примера данных в UI
    function insertInUI() {
        //Находим случайное число (от 0 до testData.length-1)
        const random = getRandomInt(testData.length);

        //Находим случайный элемент из массива testData
        const randomItem = testData[random];

        //Находим в разметке страницы 01-form.html  поля, в которые нужно подставить тестовые данные
        document.querySelector("#input-name").value = randomItem.name;
        document.querySelector("#input-phone").value = randomItem.phone;
        document.querySelector("#input-mail").value = randomItem.mail;
        document.querySelector("#input-course").value = randomItem.course;
    }

    return {
        init: insertInUI,
    };

})();



//Случайным образом выводим тестовые данные на страницу 01-form.html 
generateTestData.init();