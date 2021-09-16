const formController = (function (modelCtrl, uiForm) {

    //Функция для прослушки событий на странице form.controller.js
    function setupEventListener() {
        //Получаем из form.view.js обьект со всеми селекторами, которые нужны для работы приложения
        const DOM = uiForm.getDomStrings();

        //Отправка формы, нажатие на кнопку "Оформить заявку", запускаем функцию sendDataForm
        document.querySelector(DOM.form).addEventListener("submit", sendDataForm);
    }

    //Функция срабатывает при отправке формы регистрации
    function sendDataForm(event) {
        //Отменяем отправку формы и перезагрузку страницы
        event.preventDefault();

        //Запускаем на выполнение метод getFormData() из form.view.js, который вернет обьект с введенными данными из инпутов регистрационной формы
        const input = uiForm.getFormData();
        console.log("sendDataForm -> input", input);

        //Проверяем на пустые поля, если хоть одно поле пустое, форму с данными не отправляем
        if (input.name !== "" && input.phone !== "" && input.mail !== "") {
            //Добавляем полученные данные из формы регистрации (заявки) в модель (берем данные из input)
            modelCtrl.addRequest(input.name, input.phone, input.mail, input.course);

            modelCtrl.test();
            //Сохраняем данные заявки в localStorage
            modelCtrl.addDataToStorage();
            //Очищаем поля ввода формы после ее отправки
            uiForm.clearFields();

            //Выводим тестовые данные для заполнения формы регистрации после отправки формы
            generateTestData.init();
        }
    }

    return {

        //Возвращаем функцию для прослушки событий setupEventListener как метод init
        init: function () {
            console.log("Start!");
            setupEventListener();
        }
    };

})(modelController, formView);


//Запускаем функцию для прослушки событий в form.controller.js как метод init
formController.init();