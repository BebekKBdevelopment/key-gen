function generateKey(){

let existingKey = localStorage.getItem("hub_key")
let expire = localStorage.getItem("hub_expire")
let now = Date.now()

if(existingKey && expire > now){
document.getElementById("keybox").innerText =
"Your key: " + existingKey
return
}

let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
let key = "GHB-"
for(let i=0;i<10;i++){
key += chars[Math.floor(Math.random()*chars.length)]
}
let expiration = now + (24*60*60*1000)
localStorage.setItem("hub_key",key)
localStorage.setItem("hub_expire",expiration)
document.getElementById("keybox").innerText =
"Your key: " + key
}
