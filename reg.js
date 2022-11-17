let Database = []

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
   resetInputfields()
   alert("You have successfully signed up! You may now login.")
}

function checkIfAlreadyInDatabase(username,password,buttonClicked) {

   for (userData in Database) {

      if (buttonClicked == "signUp") {

         if (username.toLowerCase() == Database[userData].Username.toLowerCase()) {
            alert(`A user by the name '${username}', seems to already be in our database. Try again.`)
            resetInputfields()
            break
         } else {
            addUserDataToDatabase(username,password)
            console.log("Not in database")
            break
         }

      } else {

         if (username.toLowerCase() == Database[userData].Username.toLowerCase()) {
            if (password == Database[userData].Password) {
               alert("You have sucessfully logged into your account.")
               resetInputfields()
            } else {
               alert("The password given didn't match our records with the associated username. Try again.")
               resetInputfields()
            }
         } else {
            alert(`The username you provided '${username}', wasn't found in our database. Try signing up instead.`)
            resetInputfields()
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