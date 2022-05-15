
function user1() {

       var n= document.getElementById("name").value;
       var p= document.getElementById("password").value;

    fetch("../api/Users/" + n + "/" + p)
        .then(res => {
            if(res.ok && res!=null&&res.status==204){
                 alert("this user is undefined, enter user ");
                 
            }
            else
            if (res!=null&&res.ok) 
                return res.json();
          
        })
        .then(data => {
            if (data) {
                sessionStorage.clear();
                sessionStorage.setItem("user", JSON.stringify(data))
                alert("Hello to " + data.name);
                window.location.href = "homePage.html";
            }
        })
};


function enterUser() {
    console.log("in user");
    let user = {
       name: document.getElementById("name").value,
       password: document.getElementById("password").value,
       email: document.getElementById("email").value      
    };
    console.log(user, "user");
    fetch("../api/Users", {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(response => {
        if (response.ok){
            alert("הפרטים עודכנו בהצלחה");
        }
        else{
            alert("Your details do not meet the legal requirements");
            response.json().then(error => {alert(JSON.stringify(error.errors)); });
        }
            
    });
}

function loadHomePage() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    document.getElementById("hello").textContent = document.getElementById("hello").textContent + user.name;
}

function update() {
    let user = JSON.parse(sessionStorage.getItem('user'));
        document.getElementById("name").value = user.name
        document.getElementById("password").value= user.password
        document.getElementById("email").value= user.email
}

function edit() {
    let user = JSON.parse(sessionStorage.getItem('user'));
    user.email=document.getElementById("name").value 
    user.password=document.getElementById("password").value 
    user.name=document.getElementById("email").value    

    let updateuser = JSON.parse(sessionStorage.getItem("user"));
     document.getElementById("hello").value + user.name;

    fetch("../api/Users/" + updateuser._id, {
        method: 'PUT',
        body: JSON.stringify(user),
        headers: {
            'Content-Type': 'application/json; charset=utf-8 '
        },

    }).then(res => res.json())
        .then(data => {
            alert(user.name + "נשמר בהצלחה!");
            sessionStorage.setItem('user', JSON.stringify(user));
            window.location.href = "homePage.html";

        })
        ;

}

