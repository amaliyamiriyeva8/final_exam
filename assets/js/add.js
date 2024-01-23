
let name=document.querySelector("#name")
let price=document.querySelector("#price")
let image=document.querySelector("#image")
let file=document.querySelector("#file")
let form=document.querySelector("form")
let p1=document.querySelector("#p1")
let p2=document.querySelector("#p2")
let p3=document.querySelector("#p3")
let table=document.querySelector("table")

fetch("http://localhost:3000/exam")
.then(res=>res.json())
.then(data=>{
    data.forEach(element => {
        table.innerHTML+=`
        <tr>
        <td>${element.id}</td>
        <td>${element.price}</td>
        <td>${element.name}</td>
        <td><button style="background-color: lightblue;"  onclick="deleteEl(${element.id})">delete</button></td>
          </tr>
        ` 
    });
    
})

function deleteEl(id){
    axios.delete("http://localhost:3000/exam/"+id)
    .then(res=>
      window.location.reload()
      )
   }

   file.addEventListener("input",(e)=>{
    let file=e.target.files[0]
   if(file){
    let reader=new FileReader()
    reader.readAsDataURL(file)
    reader.onload=()=>{
        image.src=reader.result
        image.style.width="70px"
        image.style.height="70px"
    }}
   })



   form.addEventListener("submit",(e)=>{
    e.preventDefault()

    const all=[file,price,name]
    const pEl=[p1,p2,p3]
    all.forEach((element,index) => {
        if(element.value){
            pEl[index].style.display="none"
        }
        else{
            pEl[index].style.display="block"
        }
    });
    if(all.every(element=>element.value)){
    axios.post("http://localhost:3000/exam",{
    img:image.src,
    price:price.value,
    name:name.value
    }
   ) .then(res=>
    window.location="./index.html" 
     )
   
   }})
