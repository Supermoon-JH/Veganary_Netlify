// 전역 변수 설정
let data;
let keyword;

window.onload = function () {
    //search 라는 id 가진 태그에 change 이벤트 부여
    document.getElementById('search').addEventListener('change', (e) => {
        keyword = e.target.value // input 에다가 입력하면 전역변수 keyword 값이 바꿔지도록 하는 부분
    });
    // search_btn 라는 id 가진 태그에 click 이벤트 부여
    document.getElementById('search_btn').addEventListener('click', () => {
        Search(); // 클릭하면 옆에 함수 호출
    });

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "/vegan/py/data_backup.xlsx", true);
    xhr.responseType = "blob";
    xhr.onload = function (e) {
        let file = this.response;
        let reader = new FileReader();
        if (reader.readAsBinaryString) {
            reader.onload = function (e) {
                let workbook = XLSX.read(e.target.result, {type: 'binary'});
                let firstSheet = workbook.SheetNames[0];
                let excelRows = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[firstSheet]);
                data = excelRows
            };
            reader.readAsBinaryString(file);
        }
    };
    xhr.send();
}

// 검색하는 함수
function Search() {
    // 일단 변수 선언 (값은 할당 x)
    let items;
    // 이미 검색을 한번 해서 검색 결과값이 화면에 있으면 지워주고 없으면 새로 만들어서 진행.
    if (!document.getElementById('items')) {
        items = document.createElement('div')
        items.setAttribute('id', 'items')
    } else {
        document.getElementById('items').remove()
        items = document.createElement('div')
        items.setAttribute('id', 'items')
    }

    for (let i = 0; i < data.length; i++) {
        if (data[i].prd_name.split(' ').includes(keyword)) {
            let item = document.createElement('div')
            item.setAttribute('class', 'item')

            let prd_name = document.createElement('p')
            prd_name.innerHTML = data[i].prd_name
            prd_name.style.fontWeight = 'bold'

            let prd_price = document.createElement('p')
            prd_price.innerHTML = data[i].prd_price + ' 원'
            prd_price.style.textAlign = 'right'
            prd_price.style.fontSize = '12px'

            let prd_detail = document.createElement('p')
            prd_detail.innerHTML = data[i].prd_detail
            prd_detail.style.maxHeight = '100px'
            prd_detail.style.overflow = 'scroll'

            let prd_img = document.createElement('img')
            prd_img.setAttribute('src', data[i].prd_img)
            item.appendChild(prd_img)
            item.appendChild(prd_name)
            item.appendChild(prd_price)
            item.appendChild(prd_detail)
            items.appendChild(item)
        }
    }

    document.getElementById('result').appendChild(items)

}
