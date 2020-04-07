// function add() {
//     let name = document.querySelector("#inputText1").value;
//     localStorage.setItem("name", name)
//     let email = document.querySelector("#inputEmail3").value;
//     localStorage.setItem("email", email)
//     let pwd = document.querySelector("#inputPassword2").value;
//     localStorage.setItem("Pwd", pwd)
//
// }
//
// function readAll() {
//     for (let i = 0; i < localStorage.length; i++) {
//         let key = localStorage.key(i);
//         let value = localStorage.getItem(key)
//         alert(value)
//     }
// }
//
// function remove() {
//     localStorage.removeItem("mykey");
// }
//
// function del() {
//     localStorage.clear()
// }
//
// window.addEventListener("storge", function (obj) {
//     console.info("原来的值" + obj.oldValue + "改变后的值" + obj.newValue)
// })