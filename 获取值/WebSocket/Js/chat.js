let ws ;
function getConnection() {
    let username = document.getElementById("username").value;
    ws= new WebSocket("ws://localhost:8080/websocket/webChat/"+username);
    //建立连接时触发
    ws.onopen=function () {
        console.log("与服务器建立连接");
        let  cs2=document.getElementById("cs2");
        cs2.innerHTML="<p>"+username+"上线了</p>";
    }
    //关闭连接时触发
    ws.onclose=function () {
        console.log("与服务器断开连接");
    }
    //发送错误时触发
    ws.onerror=function () {
        console.log("与服务器连接发生错误");
    }
    //客户端接收服务器数据时触发
    ws.onmessage=function (message) {
        console.log("服务器传送过来的信息为："+message.data);
        let  cs=document.getElementById("cs");
        cs.innerHTML+="<p>"+message.data+"</p>";
    }
}
//关闭连接
function closeConnection() {
    ws.close(1000,"用户主动关闭");
}
//发送消息
function sendMsg() {
    //获取消息
    let mes = document.getElementById("ss").value;
    //获取聊天类型 群发 1  or 私聊 0
    let type=1;//群发
    let typeRadio = document.getElementsByName("sendType");
    for (let i=0;i<typeRadio.length;i++){
        if (typeRadio[i].checked){
            type=typeRadio[i].value;
        }
    }
    //获取私聊对象
    let sendWho =document.getElementById("sendWho").value;
    //消息组合
    let contend = mes+":"+type+":"+sendWho;
    //发送
    ws.send(contend);
    //清空消息
    document.getElementById("ss").value="";
}