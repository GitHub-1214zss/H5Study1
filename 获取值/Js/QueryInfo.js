function find() {
    /*获取值进行查找 去json里取值*/
    let name = document.getElementById("findName").value;
    let value = localStorage.getItem(name);
    let div = document.getElementById("result")
    /*判断值是否为空*/
    if (value!=null) {
        let json = JSON.parse(value);
        /*取值放入result*/
        let result = "姓名：" + json['name'] + "<br>电话号码: " + json['telephonenumber']+ "<br>email: " + json['email']+"<br>说明: "+json['Log']
        /*将div的内容改为result*/
        div.innerHTML = result
        /*控制台输出一下信息*/
        console.info(value)
    }else {
        div.innerHTML = "不存在的"
    }

}