document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.js-input');
    const resultField = document.querySelector('.js-result');
    const submitBtn = document.querySelector('.js-submit');
    const errorMsg = document.querySelector('.js-error');

    submitBtn.addEventListener('click', () => {
        const regexpHyperlinkHttp = /https?:\/\/(((?:[-\w]+\.)?([-\w]+)\.\w+)|(localhost))(?:\.\w+)?\/?.*/ig;

        let inputValue = input.value;
        const xhr = new XMLHttpRequest();

        inputValue = inputValue.startsWith('http') ? inputValue : `http://${inputValue}`;

        if (inputValue.match(regexpHyperlinkHttp)) {
            errorMsg.classList.remove('show');

            xhr.open('GET', `/shorten?url=${inputValue}`);
            xhr.send();
            xhr.onreadystatechange = function() {
                if (this.readyState !== 4) return;

                if (this.status !== 200) {
                    alert( 'ошибка: ' + (this.status ? this.statusText : 'запрос не удался') );
                    return;
                } else {
                    const result = JSON.parse(this.responseText);
                    resultField.innerHTML = result.value;
                    clearField(input)
                }
            }
        } else {
            errorMsg.classList.add('show');
            clearField(resultField);
        }
    });
});

function clearField(field) {
    if (field.value) {
        field.value = ''
    } else {
        field.innerHTML = ''
    }
}
