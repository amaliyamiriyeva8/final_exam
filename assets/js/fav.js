
let js=document.querySelector(".js")
fetch("http://localhost:3000/fav")
.then(res=>res.json())
.then(data=>{
   data.forEach(element => {
       js.innerHTML+=`
       <div class="js-1">
               <img src=${element.img} alt=>
               <h1>${element.name}</h1>
               <p>$${element.price}</p>
               <button onclick="deleteEl(${element.id})">Delete</button>
           </div>
       `
   });
})


function deleteEl(id){
    axios.delete("http://localhost:3000/fav/"+id)
    .then(res=>
      window.location.reload()
      )
   }