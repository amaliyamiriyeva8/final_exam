let id=new URLSearchParams(window.location.search).get("id")
let js=document.querySelector(".js")

fetch("http://localhost:3000/exam/"+id)
 .then(res=>res.json())
 .then(element=>{
        js.innerHTML=`
        <div class="js-1">
                <img src=${element.img} alt=>
                <h1>${element.name}</h1>
                <p>$${element.price}</p>
            </div>
        `
 })
    ;