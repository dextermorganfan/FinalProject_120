let add_UI = document.getElementsByClassName("AddUI")[0]
let input_name = document.getElementsByClassName("input_name")[0].children[0]
let input_image = document.getElementsByClassName("input_image")[0].children[0]
let input_price = document.getElementsByClassName("input_price")[0].children[0]
let input_calories = document.getElementsByClassName("input_calories")[0].children[0]
let add_button = document.getElementsByClassName("add_button")[0]
let close_button = document.getElementsByClassName("close")[0]
let add_manager_buttons = document.getElementsByClassName("add_manager")

let category
let ui_visible = false

let inputs = []

// putting all inputs in array
inputs.push(input_name)
inputs.push(input_price)
inputs.push(input_calories)

// making add ui not visible when started
add_UI.style.display = "none"

let beverage_table_head = document.getElementsByClassName("beverage_table_head")[0]
let burger_table_head = document.getElementsByClassName("burger_table_head")[0]
let condiment_table_head = document.getElementsByClassName("condiment_table_head")[0]
let mcbakery_table_head = document.getElementsByClassName("mcbakery_table_head")[0]
let coffee_table_head = document.getElementsByClassName("coffee_table_head")[0]


// when page opens, load all the items stored in localstorage

function loadItems(arr, tbl_head, category) {

   for (index in arr) { 

      let original = document.getElementsByClassName("item")[0]
      let clonedOriginal = original.cloneNode(true)
      
      let name = clonedOriginal.children[0].children[2]
      let calories = clonedOriginal.children[0].children[3]
      let image = clonedOriginal.children[0].children[1]
      let price = clonedOriginal.children[0].children[4]
      let delete_button = clonedOriginal.children[0].children[5]

      name.textContent = arr[index].product_name
      calories.textContent = arr[index].product_calories
      price.textContent = arr[index].product_price
      image.src = arr[index].product_image

      delete_button.onclick = function() {
         for (item in arr) {
            if (name.textContent.toLowerCase() == arr[item].product_name.toLowerCase()) {
               arr.splice(item,1)
            }
         }
         clonedOriginal.remove()
         localStorage.setItem(category,JSON.stringify(arr))
      }
      
      clonedOriginal.style.display = "inline-block"
      tbl_head.appendChild(clonedOriginal)
   }

}

if (!localStorage.Beverages) {
   localStorage.setItem("Beverages", "")
}

if (!localStorage.Burgers) {
   localStorage.setItem("Burgers", "")
}

if (!localStorage.Condiments) {
   localStorage.setItem("Condiments", "")
}

if (!localStorage.McBakery) {
   localStorage.setItem("McBakery", "")
}

if (!localStorage.Coffee) {
   localStorage.setItem("Coffee", "")
}


let Beverages

if (localStorage.getItem("Beverages") == "" ) {
   Beverages = []
} else {
   Beverages = JSON.parse(localStorage.getItem("Beverages"))
}

let Burgers

if (localStorage.getItem("Burgers") == "") {
   Burgers = []
} else {
   Burgers = JSON.parse(localStorage.getItem("Burgers"))
}

let Condiments

if (localStorage.getItem("Condiments") == "" ) {
   Condiments = []
} else {
   Condiments = JSON.parse(localStorage.getItem("Condiments"))
}

let McBakery

if (localStorage.getItem("McBakery") == "" ) {
   McBakery = []
} else {
   McBakery = JSON.parse(localStorage.getItem("McBakery"))
}

let Coffee

if (localStorage.getItem("Coffee") == "" ) {
   Coffee = []
} else {
   Coffee = JSON.parse(localStorage.getItem("Coffee"))
}

// loading items for each

if (Beverages.length != 0) {
   loadItems(Beverages,beverage_table_head,"Beverages")
} 

if (Burgers.length != 0) {
   loadItems(Burgers,burger_table_head,"Burgers")
}

if (Condiments.length != 0) {
   loadItems(Condiments,condiment_table_head,"Condiments")
}

if (McBakery.length != 0) {
   loadItems(McBakery,mcbakery_table_head,"McBakery")
}

if (Coffee.length != 0) {
   loadItems(Coffee,coffee_table_head,"Coffee")
}

// clear the input fields

function clearInputFields() {
   input_name.value = ""
   input_price.value = ""
   input_calories.value = ""
}


// add a menu item

function addMenuItem(arr,table_head,category) {
   arr.push({product_name : input_name.value, product_calories : input_calories.value, product_image : input_image.value, product_price : Number(input_price.value) })
   
   let original = document.getElementsByClassName("item")[0]
   let clonedOriginal = original.cloneNode(true)
   
   let name = clonedOriginal.children[0].children[2]
   let calories = clonedOriginal.children[0].children[3]
   let image = clonedOriginal.children[0].children[1]
   let price = clonedOriginal.children[0].children[4]
   let delete_button = clonedOriginal.children[0].children[5]

   name.textContent = input_name.value
   calories.textContent = input_calories.value
   price.textContent = input_price.value
   image.src = input_image.value

   delete_button.onclick = function() {
      for (item in arr) {
         if (name.textContent.toLowerCase() == arr[item].product_name.toLowerCase()) {
            arr.splice(item,1)
         }
      }
      clonedOriginal.remove()
      localStorage.setItem(category,JSON.stringify(arr))
   }
   
   clonedOriginal.style.display = "inline-block"
   table_head.appendChild(clonedOriginal)

   localStorage.setItem(category, JSON.stringify(arr))

}


function HideUI() {
   ui_visible = false
   add_UI.style.display = "none"
}


// the add button inside of the add ui
add_button.onclick = function() {
   for (input in inputs) {
      if (inputs[input].value == "") {
         alert("1 or more of your inputs is blank")
         break
      } else {
         // if the inputs arent blank
         if (category == "Beverages") {
            addMenuItem(Beverages,beverage_table_head,"Beverages")
            HideUI()
            break
         } else if (category == "Burgers") {
            addMenuItem(Burgers, burger_table_head, "Burgers")
            HideUI()
            break
         } else if (category == "Condiments") {
            addMenuItem(Condiments, condiment_table_head, "Condiments")
            HideUI()
            break
         } else if (category == "McBakery") {
            addMenuItem(McBakery, mcbakery_table_head, "McBakery")
            HideUI()
            break
         } else if (category == "Coffee") {
            addMenuItem(Coffee, coffee_table_head, "Coffee")
            HideUI()
            break
         }
      }
   }
}
// the close inside of the add ui
close_button.onclick = function() {
   ui_visible = false
   add_UI.style.display = "none"
}

// making plus next to categories clickable
for (let i = 0; i < add_manager_buttons.length; i++) {
   add_manager_buttons[i].onclick = function() {
      clearInputFields()
      category = add_manager_buttons[i].id
      if (!ui_visible) {
         ui_visible = true
         add_UI.style.display = "flex"
         console.log(category)
      } else {
         ui_visible = false
         add_UI.style.display = "none"
      }
   }
}
