document.addEventListener('DOMContentLoaded', function () {
    const input = document.querySelector('.js-input');
    const resultField = document.querySelector('.js-result');
    const submitBtn = document.querySelector('.js-submit');

    submitBtn.addEventListener('click', () => {
        const inputValue = input.value;
        const xhr = new XMLHttpRequest();

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
            }
        }
    });
});
