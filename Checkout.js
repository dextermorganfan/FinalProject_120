let card_button = document.getElementsByClassName("card")[0]
let cash_button = document.getElementsByClassName("cash")[0]

let payout_option_label = document.getElementsByClassName("payout-text")[0]
let total_label = document.getElementsByClassName("total-text")[0]
total_label.textContent = "Total : $" + localStorage.Total

let tip_input = document.getElementsByClassName("tip")[0]

let container = document.getElementsByClassName("container")[0]

let checkout_button = document.getElementsByClassName("checkout-button")[0]

let tip = 0

let payout_option = null

let Cart = JSON.parse(localStorage.Cart)
console.log(Cart)

checkout_button.onclick = function() {
   if (payout_option) {
      alert("Your order has been completed succesfully!")
      if (tip != 0) {
         localStorage.Total = Math.round(Number(localStorage.getItem("Total")) + Number(tip))
      }
      window.location.href = "Receipt.html"
   } else {
      alert("Select a payment option...")
   }
}

for (let i = 0; i < Cart.length; i++){
   let info = Cart[i]

   let container_item = document.getElementsByClassName("container-item")[0]
   let container_item_clone = container_item.cloneNode(true)

   container_item_clone.style.display = "flex"

   container_item_clone.children[1].src = info.item_image
   container_item_clone.children[2].textContent = info.item_name
   container_item_clone.children[3].textContent = "$" + info.item_price

   container.appendChild(container_item_clone)

}

tip_input.addEventListener("input", function(){
   if (tip_input.value == "") {
      tip = 0
   } else {
      tip = tip_input.value
   }
   total_label.textContent = "Total : $" + Math.round(Number(localStorage.getItem("Total")) + Number(tip))
})

card_button.onclick = function() {
   payout_option = "card"
   payout_option_label.textContent = "Payout Option : " + "Card"
}

cash_button.onclick = function() {
   payout_option = "cash"
   payout_option_label.textContent = "Payout Option : " + "Cash"
}