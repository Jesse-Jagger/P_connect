const bcrypt = require("bcrypt");

const enteredPassword = "TD@fabsince23"; 
const hashedPassword = "$2b$10$nlJscxnQdHPllAsj32oQdeKdpolsM/EMuuITyL9fA.IV8ELX6YNfS"; 

console.log("Checking password...");  // Debugging log

bcrypt.compare(enteredPassword, hashedPassword, (err, isMatch) => {
  if (err) {
    console.error("Error comparing passwords:", err);
  } else if (isMatch) {
    console.log("Passwords match! Login should work.");
  } else {
    console.log("Passwords do NOT match. Wrong password entered.");
  }
});

console.log("Script executed!");  // Another debugging log
