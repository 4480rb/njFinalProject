window.addEventListener('load', (event) => {
    getProducts();
    getCategory();
    document.getElementById("ItemsCountText").innerHTML = JSON.parse(sessionStorage.getItem("count"));
})



function getProducts() {
    fetch('../api/Product/')
        .then(res => res.json())
        .then(data => {
            data.forEach(d => showProduct(d));
        }
        )
};


function getProductsByCategory(id) {
     fetch('../api/Product/' + id)
    //  {
    //     method: 'GET',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    // })
    //     .then(response => {
    //         if (response.status == 200) {
    //             return response.json();
    //         } else {
    //             throw new Error("status Code is:" + response.status);
    //         }
    //     })
     .then(res=>res.json())
        .then(data => {
            document.getElementById("ProductList").innerHTML = "";
            var div = document.createElement('ProductList');
            div.setAttribute("id", "ProductList");
            document.body.appendChild(div);
            data.forEach(p => showProduct(p));
        });
}

var count = 0;
function showProduct(d) {
    count = count + 1;
    var element = document.getElementById("temp-card");
    var cln = element.content.cloneNode(true);
    var url = "../img/";
    cln.querySelector("img").src = url + d.img;
    cln.querySelector(".price").innerText = "price:" + d.price + "$";
    cln.querySelector(".description").innerText = d.des;
    cln.querySelector(".clickToAdd").addEventListener("click", () => {
        addToCart(d);
    });
    document.getElementById("counter").innerHTML = count;
    document.getElementById("ProductList").appendChild(cln);
}
function getCategory() {
    fetch('../api/Category')
        .then(result => result.json())
        .then(data => {
            data.forEach(d => showCategory(d));
        })
}
function showCategory(d) {
    var element = document.getElementById("temp-category");
    var cln = element.content.cloneNode(true);
    cln.querySelector(".OptionName").innerText = d.c_name;
    cln.querySelector(".opt").id = d._id;
    cln.querySelector(".opt").addEventListener("change", () => {
        if (document.getElementById(d._id).checked) {
            getProductsByCategory(d._id);
            count = 0;
        }
            
        else {
            window.location.herf = "/html/Products.html";
            document.getElementById("ProductList").innerHTML = "";
            count = 0;
        getProducts();}
    });
    document.getElementById('filters').appendChild(cln);
}



var c = 1;
function addToCart(prod) {
    let cart = [];
    if (JSON.parse(sessionStorage.getItem('count')) != null) {
        c = JSON.parse(sessionStorage.getItem('count'));
        c = c + 1;
    }
    sessionStorage.setItem('count', (c));
    if (JSON.parse(sessionStorage.getItem('cart')) != null)
        cart = JSON.parse(sessionStorage.getItem('cart'));

    let item = {
        "products": prod,
        "Quantity": 1,
    }
    let flag = false;
    if (cart.length > 0) {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].products._id == prod._id) {
                cart[i].Quantity++;
                flag = true;
            }
        }
    }
    if (flag != true)
        cart.push(item);
    sessionStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById("ItemsCountText").innerHTML = JSON.parse(sessionStorage.getItem('count'));
}

function removeFromCart() {
    var element = []
    element = JSON.parse(sessionStorage.getItem('cart'));
    element = [];
    sessionStorage.setItem('cart', JSON.stringify(element));
    sessionStorage.setItem('count', JSON.stringify(0));
}
