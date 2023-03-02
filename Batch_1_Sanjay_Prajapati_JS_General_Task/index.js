function saveData() {
    let inputElementCollection = Array.from(document.body.firstElementChild.children).filter((element) => {
        return element instanceof HTMLInputElement;
    })

    let string = '';
    inputElementCollection.forEach((item, index) => {
        string += `<tr><td>${index + 1}</td><td>${item.value}</td></tr>`
    })

    document.querySelector('tbody').innerHTML = string
}
