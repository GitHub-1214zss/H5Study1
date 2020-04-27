//得到实例

function getConnection() {
    let name = document.getElementById("username").value;
    // alert(name)
    let ws = new WebSocket("ws://localhost:8080/websocket/webskt2/"+name)
    //建立连接时触发
    ws.onopen = function () {
        console.log("成功建立连接")

    }


    ws.onerror = function () {
        console.log("建立连接出错")

    }
    //接受服务器消息时触发
    ws.onmessage = function (message) {
        console.log(message.data)

    }
    ws.onclose = function () {
        console.log("关闭连接")

    }


}
function closeConnection() {
    // ws.close(); 不带参关闭
    ws.close(1000, "客户端主动关闭")
}