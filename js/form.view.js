const formView = (function () {

    //Записываем в обьект DOMstrings все селекторы, которые нужны для работы приложения
    const DOMstrings = {
        form: "#registration-form",
        inputName: "#input-name",
        inputPhone: "#input-phone",
        inputMail: "#input-mail",
        inputCourse: "#input-course"
    };


    //Функция собирает данные из инпутов
    function getFormData() {
        return {
            name: document.querySelector(DOMstrings.inputName).value,
            phone: document.querySelector(DOMstrings.inputPhone).value,
            mail: document.querySelector(DOMstrings.inputMail).value,
            course: document.querySelector(DOMstrings.inputCourse).value
        };
    }

    console.log(document.querySelector(DOMstrings.inputCourse));
    console.log(document.querySelector(DOMstrings.inputCourse).value);

    //Очищаем поля ввода формы
    function clearFields() {
        const inputName = document.querySelector(DOMstrings.inputName);
        inputName.value = "";
        inputName.focus();
        document.querySelector(DOMstrings.inputPhone).value = "";
        document.querySelector(DOMstrings.inputMail).value = "";
    }

    //Возвращаем данные (методы) из form.view.js, чтобы иметь возвожность использовать их в других (внешних) файлах(скриптах)
    return {
        clearFields: clearFields,
        //Возвращаем введенные данные из инпутов формы
        getFormData: getFormData,
        //Функция возвращает обьект DOMstrings
        getDomStrings: function () {
            return DOMstrings;
        }
    };
})();