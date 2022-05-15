

function getOrders(){
    var user=JSON.parse(sessionStorage.getItem("user"));
    fetch('../api/Users/'+user._id)
    .then(res => {
        if(res!=null)
        return res.json();
        else if (res.status==204)
        throw new Error("status code is:"+res.status);
    })
.then(data=>
    {
        if(data){
            data.orders.forEach(order=>showOrder(order));
        }
    }
    )
}

function showOrder(order) {

  var element = document.getElementById("temp-row");
   var cln = element.content.cloneNode(true);

     cln.querySelector(".products").id=order._id;
    cln.querySelector(".quntitydate").innerHTML = order.orderDate;
    cln.querySelector(".price").innerText = "price:" + order.orderSum + "$";
     cln.querySelector(".amount").innerText = order.orderItems.length;
     order.orderItems.forEach((p)=>{
        var prod = document.createElement("option");
        prod.innerHTML = "מוצרים:  "+ p.productId.p_name + "  כמות:   " + p.Quantity
        cln.getElementById(order._id).appendChild(prod);
     })
 document.getElementById("items").appendChild(cln);
}
