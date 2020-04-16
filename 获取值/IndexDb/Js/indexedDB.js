let dbReq = indexedDB.open("indexedDB", 2)
dbReq.addEventListener("success", function () {
    console.info("数据库创建成功");
    /*获取result对象*/

}, false)

dbReq.addEventListener("error", function () {
    console.info("创建数据库失败")
})
//
// dbReq.onupgradeneeded = function (e) {
//     let db = e.target.result;
//
//
// }