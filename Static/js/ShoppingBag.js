window.addEventListener('load', (event) => {
    getBag();

})
function getBag() {
    var items = [];
    items = JSON.parse(sessionStorage.getItem('cart'));
    if (items) {
        items.forEach(p => {
            showBag(p);
        });
    }
    else { alert("you have no items in your bag!") 
    window.location.href = "../HTML/Products.html";
}
}

var count = 0;
var totalAmount = 0;
function showBag(p) {
    var element = document.getElementById("temp-row");
    var cln = element.content.cloneNode(true);
    /*document.getElementsByTagName("tbody");*/
    count = count + p.Quantity;
    totalAmount = totalAmount + p.products.price * p.Quantity;
    cln.querySelector(".image").src = "../img/" + p.products.img;
    cln.querySelector(".descriptionColumn").innerText = p.products.des;
    cln.querySelector(".availabilityColumn").innerHTML = cln.querySelector(".availabilityColumn").innerHTML;
    cln.querySelector(".qantityColumn").innerHTML = "כמות" + p.Quantity;
    cln.querySelector(".priceColumn").innerText = "price:" + p.products.price + "$";
    cln.querySelector(".expandoHeight").addEventListener("click", () => {
        removeItem(p);
    });


    document.querySelector(".tbody").appendChild(cln);
    document.getElementById("itemCount").innerText = count;
    document.getElementById("totalAmount").innerText = totalAmount;
}

function removeItem(prodToDelet) {

    var element = [];
    var element2 = [];
    element = JSON.parse(sessionStorage.getItem('cart'));
    element.forEach(prodNotToDelet => {
        if (prodNotToDelet.products._id != prodToDelet.products._id)
            element2.push(prodNotToDelet);
        else
            if (prodToDelet.Quantity > 1) {
                prodToDelet.Quantity--;
                element2.push(prodToDelet);
            }
    });
    sessionStorage.setItem('cart', JSON.stringify(element2));
    var c = JSON.parse(sessionStorage.getItem('count'));
    c = c - 1;
    sessionStorage.setItem('count', JSON.stringify(c));


    window.location.href = "";
    getBag();
    document.getElementById("itemCount").innerText = parseInt(document.getElementById("itemCount").innerText) - 1;
    document.getElementById("ItemsCountText").innerHTML = parseInt(document.getElementById("ItemsCountText").innerHTML) - 1;
    document.getElementById("totalAmount").innerText = totalAmount - prodToDelet.products.price;

}
function removeBag() {

}
function placeOrder() {
    var cart = [];
    cart = JSON.parse(sessionStorage.getItem('cart'));
    console.log(cart, "cart");
    if (cart.length == 0) {
        alert("אין מוצרים בסל")
        window.location.href = "../HTML/Products.html";
    }
    else {
        var itemOrders = [];
        for (let i = 0; i < cart.length; i++) {
            var itemOrder =
            {
                productId: cart[i].products._id,
                Quantity: cart[i].Quantity
            }
            itemOrders.push(itemOrder);

            var order = {
                orderDate: new Date(),
                orderSum: totalAmount,
                userId: JSON.parse(sessionStorage.getItem("user"))._id,
                orderItems: itemOrders
            }
            console.log(order, "order")
        }
        fetch("../api/Orders", {
            method: 'POST',
            headers: {
                'content-Type': 'application/json',
            },
            body: JSON.stringify(order),

        })
            .then(response => {
                console.log(response);
                if (response.ok && response.status == 200)
                    return response.json()
                else
                    throw new error(response.status);
            })
            .then(data => {
                if (data) {
                    console.log(data, "data");
                    alert("the order" + data._id + "succesfulled");
                    removeFromCart();
                    window.location.href = "Products.html";
                }
            })
            .catch(err => console.log(err))

    }
}

function removeFromCart() {
    var element = []
    element = JSON.parse(sessionStorage.getItem('cart'));
    element = [];
    sessionStorage.setItem('cart', JSON.stringify(element));
    sessionStorage.setItem('count', JSON.stringify(0));
}

