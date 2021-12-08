window.onload = function () {

    console.log(2)
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "../javascript/vegan.xlsx", true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
        let file = this.response;
        let reader = new FileReader();
        if (reader.readAsBinaryString) {
            reader.onload = function (e) {

                ProcessExcel(e.target.result);
            };
            reader.readAsBinaryString(file);
        }
    };
    xhr.send();
}

function ProcessExcel(data) {
    let workbook = XLSX.read(data, {type: 'binary'});
    let firstSheet = workbook.SheetNames[0];
    let excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);

    let items = document.getElementById('items')

    for (let i = 0; i < excelRows.length; i++) {
        console.log(1)
        let item = document.createElement('div')
        item.setAttribute('class', 'item')

        let prd_name = document.createElement('p')
        prd_name.innerHTML = excelRows[i].prd_name
        prd_name.style.fontWeight = 'bold'

        let prd_price = document.createElement('p')
        prd_price.innerHTML = excelRows[i].prd_price + ' 원'
        prd_price.style.textAlign = 'right'
        prd_price.style.fontSize = '12px'

        let prd_detail = document.createElement('p')
        prd_detail.innerHTML = excelRows[i].prd_detail
        prd_detail.style.maxHeight = '100px'
        prd_detail.style.overflow = 'scroll'

        let prd_img = document.createElement('img')
        prd_img.setAttribute('src', excelRows[i].prd_img)
        item.appendChild(prd_img)
        item.appendChild(prd_name)
        item.appendChild(prd_price)
        item.appendChild(prd_detail)
        items.appendChild(item)
    }
}