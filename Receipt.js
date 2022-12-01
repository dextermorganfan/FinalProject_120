let parsedCart = JSON.parse(localStorage.Cart)

let display = document.getElementsByClassName("display")[0]

let total = document.getElementsByClassName("total")[0]

let date = document.getElementsByClassName("date")[0]

let dateactual = new Date()

let hour = dateactual.getHours()
let minute = dateactual.getMinutes()

date.textContent = `You completed your order on ${dateactual}`

total.textContent = "Total ~ $" + localStorage.Total

for (let i = 0; i < parsedCart.length; i++) {
   let receiptItem = document.getElementsByClassName("receipt-item")[0]
   let receiptItemClone = receiptItem.cloneNode(true)
   
   receiptItemClone.style.display = "flex"

   receiptItemClone.children[0].textContent = parsedCart[i].item_name
   receiptItemClone.children[1].textContent = parsedCart[i].item_price

   display.appendChild(receiptItemClone)
}