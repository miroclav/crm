const editController = (function (modelCtrl, uiEdit) {

    //Получаем из edit.view.js обьект со всеми селекторами, которые нужны для работы приложения
    const DOM = uiEdit.getDomStrings();

    //Массив обьектов всех заявок, которые хранятся в LocalStorage (которые мы вводим на странице формы регистрации 01-form.html и записываем в data)
    const requestsFromStorage = modelCtrl.data.allRequests;

    //Получаем из localStorage Id для редактируемой заявки
    /* В адресной строке, которая помимо основного адреса может принимать дополнительные параметры, которые идут после вопросительного знака,
    в table.view при создании шаблона заявки к адресу ссылки добавляется id заявки. Достаем этот параметр из адресной строки с помощью специального объекта location, у которого есть свойство search. Именно в нем хранятся все параметры адресной строки, то есть все что идет после вопросительного знака. http://127.0.0.1:5501/03-crm-edit-bid.html?id=7 */
    const editableRequestId = parseInt(location.search.split('=')[1]);

    //В localStorage в массиве находим обьект, в котором Id совпадает с Id редактируемой заявки 
    const request = requestsFromStorage.find(item => item.id === editableRequestId);
    //Отображаем данные по редактируемой заявке на странице редактирования
    uiEdit.renderEditableRequest(request);



    document.querySelector(DOM.saveBtn).addEventListener('click', function () {
        // получаем обновленные данные из заявки
        const inputsFromEditableRequest = uiEdit.getFormData();
        console.log("editController -> inputsFromEditableRequest", inputsFromEditableRequest);
        // пересохранение заявки с обновлёнными данными
        for (let key in inputsFromEditableRequest) {
            request[key] = inputsFromEditableRequest[key];
        }

        // обновляем хранилище
        modelCtrl.addDataToStorage();
    });

    document.querySelector(DOM.deleteBtn).addEventListener('click', function () {
        // получаем обновленные данные из заявки
        const inputsFromEditableRequest = uiEdit.getFormData();
        console.log("editController -> inputsFromEditableRequest", inputsFromEditableRequest);
        // пересохранение заявки с обновлёнными данными
        for (let key in inputsFromEditableRequest) {
            request[key] = inputsFromEditableRequest[key];
        }
        request.status = "archive";
        // обновляем хранилище
        modelCtrl.addDataToStorage();
    });



    document.querySelector(DOM.saveBtn).addEventListener('click', saveEditableRequest);
    //document.querySelector(DOM.deleteBtn).addEventListener('click', deleteEditableRequest);

    function saveEditableRequest() {

    }


})(modelController, editView);