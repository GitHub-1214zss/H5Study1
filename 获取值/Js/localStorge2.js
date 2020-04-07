function add() {
    /*通过id获取值*/
    let name = document.querySelector("#inputText1").value;

    let email = document.querySelector("#inputEmail2").value;

    let number = document.querySelector("#inputNumber3").value;

    let log = document.querySelector("#inputText4").value;
    /*获取json根据键值对*/
   let json = {"name": name, "email": email, "telephonenumber": number, "Log": log};
   /*将js值进行转化*/
    let value = JSON.stringify(json)
    /*存入*/
    localStorage.setItem(name, value)
}
