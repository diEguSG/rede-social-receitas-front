const token = localStorage.getItem("@token-usuario");

if(!token){
    window.location.replace("../index.html");
}

console.log(token);