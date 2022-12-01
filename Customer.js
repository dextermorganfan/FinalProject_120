let Logout_Button = document.getElementsByClassName("logout")[0]

let manager_add_buttons = document.getElementsByClassName("add_manager")

let delete_buttons = document.getElementsByClassName("delete_button")

let to_cart_buttons = document.getElementsByClassName("to_cart")

let cart = document.getElementsByClassName("cart")[0]

let container = document.getElementsByClassName("container")[0]

let totalLabel = document.getElementsByClassName("total")[0]

let checkout_button = document.getElementsByClassName("checkout")[0]

totalLabel.textContent = "Total : $0.00"

// Hiding the manager add buttons
if (localStorage.getItem("isManager") == "false") {
   for (let i = 0; i < manager_add_buttons.length; i++) {
      manager_add_buttons[i].style.display = "none"
   }
   for (let i = 0; i < delete_buttons.length; i++) {
      delete_buttons[i].style.display = "none"
   }
} else {
   for (let i = 0; i < to_cart_buttons.length; i++) {
      to_cart_buttons[i].style.display = "none"
   }
   cart.style.display = "none"
}

let Cart = []
let total = 0

function updateTotalLabel(updated) {
   totalLabel.textContent = `Total : $${Math.round((updated + Number.EPSILON) * 100) / 100}`
}

// when the customer clicks checkout button
checkout_button.onclick = function(){

   if (Cart.length > 0) {
      
      location.href = "Checkout.html"

      let jsonified = JSON.stringify(Cart)
      localStorage.setItem("Cart",jsonified)

      localStorage.setItem("Total", total)

   } else {
      alert("You must have at least 1 item in your cart to checkout.")
   } 
   
}

// when you click on add to cart
for (let i = 0; i < to_cart_buttons.length; i++) {
   to_cart_buttons[i].onclick = function() {
      
      if (Cart.length == 0) {
         cart.style.left = "10px"
         total = 0
      }

      let cart_item_original = document.getElementsByClassName("cart_item")[0]
      let cart_item_clone = cart_item_original.cloneNode(true)

      let name = cart_item_clone.children[2]
      let price = cart_item_clone.children[3]
      let calories = cart_item_clone.children[5]
      let delete_button = cart_item_clone.children[4]
      let image = cart_item_clone.children[1]

      name.textContent= to_cart_buttons[i].parentElement.children[2].textContent
      calories.textContent = to_cart_buttons[i].parentElement.children[3].textContent
      price.textContent = to_cart_buttons[i].parentElement.children[4].textContent
      image.src = to_cart_buttons[i].parentElement.children[1].src

      cart_item_clone.style.display = "flex"

      delete_button.onclick = function() {
         for (let i = 0; i < Cart.length; i++) {
            if (name.textContent == Cart[i].item_name) {
               total -= Number(price.textContent)
               updateTotalLabel(total)
               Cart.splice(i, 1)
               if (Cart.length == 0) {
                  cart.style.left = "-500px"
                  total = 0
               }
               break
            }
         }
         cart_item_clone.remove()
      }
      
      container.appendChild(cart_item_clone)

      // pushing new item into Cart
      let newItem = {item_name : name.textContent, item_price : Number(price.textContent), item_image : image.src}
      Cart.push(newItem)

      // update total
      for (let i = 0; i < Cart.length; i++) {
         total += Number(price.textContent)
         updateTotalLabel(total)
         break 
      }

   }
}

// logout button functionality
Logout_Button.onclick = function(){
   window.location.href = "index.html"
}