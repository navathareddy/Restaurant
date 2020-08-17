const bcrypt=require('bcrypt')
 async function hashPassword() {
     const salt= await bcrypt.genSalt(10);// basic value used -10
     const hashed=await bcrypt.hash('1234',salt)
     console.log(salt)
     console.log(hashed)
 }
 hashPassword()
 async function hashPasswords2() {
    const salt= await bcrypt.genSalt(10);// basic value used -10
    const hashed=await bcrypt.hash('1234',salt)
    console.log(salt)
    console.log(hashed)
}

 hashPasswords2();