document.addEventListener("DOMContentLoaded", () => {
    $('.tab-btn-box').addEventListener("click",tabBtnHandler);
    getBestMenu();
})


function getBestMenu() {
    //class tab-btn-box;
    fetchManager({
        url: '/api/products/best',
        method: 'GET',
        headers: {'content-type': 'application/json'},
        callback: addBestMenuUi
    })
}

function addBestMenuUi(result) {
    result.json().then(menus => {
        menus.forEach((menu,i) => {
            $(".tab-btn-box").insertAdjacentHTML("beforeend", makeHtmlMenuBtn(menu,i));
            $(".tab-content-group-box").insertAdjacentHTML("beforeend", makeHtmlMenuTab(menu.products));
        })
        onRandomTab();
    })
}

function makeHtmlMenuTab(products) {
    let tabHtml =`    <li>
                        <ul class="tab-content-box">
                `;
    products.forEach(product =>{
        tabHtml += makeHtmlMenu(product)
    })
    tabHtml += `    </ul>
                </li>`
    return tabHtml;
}

function makeHtmlMenu(product) {
    const price = Number(product.price).toLocaleString('en');
    const html = `
                     <li>
                                <a class="thumbnail-box" href="#">
                                    <div class="thumbnail">
                                        <img src="${product.imgUrl}">
                                    </div>

                                    <dl class="content">
                                        <dt class="title">${product.title}</dt>
                                        <dd class="desc">${product.discribe}</dd>
                                        <dd class="price-wrapper">
                                            <span class="final-price">
                                                    <span class="number">${price}</span>
                                                    <span class="unit">원</span>
                                            </span>
                                        </dd>
                                    </dl>
                                </a>
                            </li>
                 `
    return html
}


function makeHtmlMenuBtn(menu,index) {
    const html = `  <li data-index="${index}">
                    <a data-category-id="&{menu.id}" href="#">${menu.title}</a>
                </li>`
    return html;
}


function onRandomTab() {
    const randomValue = Math.floor(Math.random() * 6);
    $(".tab-content-group-box").children[randomValue].classList.add("on");
    $(".tab-btn-box").children[randomValue].classList.add("on");
}

function tabBtnHandler(evt) {
    evt.preventDefault();
    offTab();
    onTab(evt.target.closest("li").dataset.index);
}

function onTab(index) {
    $(".tab-btn-box").children[index].classList.toggle("on");
    $(".tab-content-group-box").children[index].classList.add("on");
}

function offTab() {
    $(".tab-btn-box .on").classList.toggle("on");
    $(".tab-content-group-box .on").classList.toggle("on");
}
