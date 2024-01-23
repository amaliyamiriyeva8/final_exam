let list=document.querySelector("#list")
let navs=document.querySelector(".navs")
let js=document.querySelector(".js")
let search=document.querySelector("#search")
let sort=document.querySelector("#sort")
let firstArr=[]
let secondArr=[]

list.addEventListener("click",()=>{
    if(navs.style.display!="block"){
        navs.style.display="block"
    }
    else{
        navs.style.display="none"
    }
})
 function crud(){
 fetch("http://localhost:3000/exam/")
 .then(res=>res.json())
 .then(data=>{
     js.innerHTML="";
    secondArr=data
    firstArr=firstArr.length || search.value ? firstArr : data
    axios.get("http://localhost:3000/fav")
    .then(fav=>{
        firstArr.forEach(element => {
            if(fav.data.find(favEl=>favEl.id===element.id)){
                js.innerHTML+=`
                <div class="js-1">
                        <img src=${element.img} alt=>
                        <i class="bi bi-heart-fill" style="color: red;" onclick="deleteFav(${element.id})"></i>
                        <h1>${element.name}</h1>
                        <p>$${element.price}</p>
                        <button onclick="deleteEl(${element.id})">Delete</button>
                    </div>
                `
            }
            else{
                js.innerHTML+=`
                <div class="js-1">
                        <img src=${element.img} alt=>
                        <i class="bi bi-heart" onclick="addFav(${element.id})"></i>
                        <h1>${element.name}</h1>
                        <p>$${element.price}</p>
                        <button onclick="details(${element.id})">Details</button>
                    </div>
                `
            }
        }); 
    })
   
 })
}
crud()

search.addEventListener("input",(e)=>{
   firstArr=secondArr
   firstArr=firstArr.filter((element)=>
   element.name.toLocaleLowerCase().includes(e.target.value.toLocaleLowerCase())
   )
   crud()
})

sort.addEventListener("change",(e)=>{
    if(e.target.value==="as"){
       firstArr.sort((a,b)=>a.price -b.price)
    }
    else if(e.target.value==="des"){
       firstArr.sort((a,b)=>b.price -a.price)
    }
    else{
        firstArr=[]
    }
    crud()
})

function details(id){
    window.location=`./details.html?id=${id}`
}


 function deleteFav(id){
  axios.delete("http://localhost:3000/fav"+id)
  .then(res=>
    window.location.reload()
    )
 }

function addFav(id){
    fetch("http://localhost:3000/exam/"+id)
    .then(res=>res.json())
    .then(data=>{
        axios.post("http://localhost:3000/fav/",data)
    })
}

let fav=document.querySelector("#fav")

fav.addEventListener("click",()=>{
    window.location="./fav.html"
})

let add=document.querySelector("#add")

add.addEventListener("click",()=>{
    window.location="./add.html"
})