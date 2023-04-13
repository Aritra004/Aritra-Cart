import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSetting={
    databaseURL: "https://shopping-ce95b-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app=initializeApp(appSetting);
const database=getDatabase(app);
const shoppinCart=ref(database, "Items");
// console.log(app);

const input=document.getElementById("input-field");
const button=document.getElementById("add-button");
const shoppingList=document.getElementById("shopping-list");

button.addEventListener("click", function(){
    let inputvalue=input.value;

    push(shoppinCart,inputvalue);

    console.log(`${inputvalue} added to database`);

    clearInput();

    // shoppingList.innerHTML += `<li>${inputvalue}</li>`;
})

onValue(shoppinCart, function(snapshot){
    if(snapshot.exists()){
    let itemArray=Object.entries(snapshot.val());

    console.log(itemArray);

    shoppingList.innerHTML="";

    for(let i=0;i<itemArray.length;i++){
        let currentItem=itemArray[i]
        let currentId=currentItem[0]
        let currentitemValue=currentItem[1]

        // shoppingList.innerHTML += `<li>${currentitemValue}</li>`;
        let itemId=currentId[0]
        let itemValue=currentItem[1]
        let newel=document.createElement("li")
        newel.textContent=itemValue
        newel.addEventListener("click", function(){
           let exactLocation=ref(database, `Items/${currentId}`)
            remove(exactLocation);
        })
        shoppingList.append(newel)
    }
   }else{
    shoppingList.innerHTML="No Items here..."
   }
})

function clearInput(){
    input.value="";
}