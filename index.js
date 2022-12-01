let Database = [

   {Username : "manager", Password: "manager"}

]

let minimumPasswordLength = 5

let username_input = document.getElementsByClassName("u")[0]
let password_input = document.getElementsByClassName("p")[0]

let SignUpButton = document.getElementsByClassName("signup")[0]
let LogInbutton = document.getElementsByClassName("login")[0]

function resetInputfields() {
   username_input.value = ""
   password_input.value = ""
}

function checkLengthOfInputs() {
   if (password_input.value.length <= minimumPasswordLength || username_input.value.length <= 0) {

      if (username_input.value.length <= 0) {
         alert("Your username is too short.")
         resetInputfields()
      } else {
         alert("Your password is too short.")
         resetInputfields()
      }

      return false

   } else {
      return true
   }
}

function addUserDataToDatabase(username,password) {
   let newUserData = {Username : username, Password : password}
   Database.push(newUserData)
   console.log(Database)
   alert("You have successfully signed up! You may now login!")
   resetInputfields()
}

function checkIfAlreadyInDatabase(username,password,buttonClicked) {

   for (let userData = 0; userData < Database.length; userData++) {

      if (buttonClicked == "signUp") {

         if (Database[userData].Username.toLowerCase() != username.toLowerCase()) {
            addUserDataToDatabase(username,password)
            break
         } else {
            break
         }

      } else {

         if (username.toLowerCase() == Database[userData].Username.toLowerCase()) {
            if (password == Database[userData].Password) {
               alert("You have sucessfully logged into your account.")
               if (username  == "manager") {
                  localStorage.setItem("isManager", true)
                  window.location.href = "menu.html"
               } else {
                  localStorage.setItem("user", username)
                  localStorage.setItem("isManager", false)
                  window.location.href = "menu.html"
               }
               resetInputfields()
               break
            }
         }
      }

   }

   if (Database.length <= 0 && buttonClicked == "logIn") {
      alert(`The username you provided '${username}', wasn't found in our database. Try signing up instead.`)
      resetInputfields()
   }

   if (Database.length <= 0 && buttonClicked == "signUp") { 
      addUserDataToDatabase(username,password)
      console.log("No need to check, the database is empty!")
   }
}

SignUpButton.onclick = function() {
   if (checkLengthOfInputs()) {
      checkIfAlreadyInDatabase(username_input.value,password_input.value,"signUp")
   }
}

LogInbutton.onclick = function() {
   if (checkLengthOfInputs()) {
      checkIfAlreadyInDatabase(username_input.value,password_input.value,"logIn")
   }
}
