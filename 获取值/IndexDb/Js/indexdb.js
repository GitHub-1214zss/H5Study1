function createTable() {
    let dbReq = indexedDB.open("mydb", 5)
    dbReq.addEventListener("success", function () {
        console.info("数据库创建成功");
        /*获取result对象*/

    }, false)

    dbReq.addEventListener("error", function () {
        console.info("创建数据库失败")
    })
    dbReq.onupgradeneeded = function (e) {
        let db = e.target.result;
        let dbName = "stus"
        let item = {
            keyPath: 'uId',
            autoIncrement: true
        };
        let store = db.createObjectStore(dbName, item)
        /*给表格创建索引*/
        store.createIndex("nameIndex", "name", {unique: false})
        store.createIndex("ageIndex", "age", {unique: false})
        console.info("创建表成功")
        /*关闭数据库*/
        db.close;

    }

}

function insert() {
    /*发送数据库请求*/
    let dbreq = indexedDB.open('mydb');//对数据库的操作不需要版本号
    dbreq.onsuccess = function (e) {
        let db = e.target.result;
        /*获取事务*/
        let tx = db.transaction("stus", "readwrite")
        /*从事务中获取仓库*/
        let store = tx.objectStore("stus")
        /*最后 插入数据*/
        let date = {
            "name": document.getElementById("name").value,
            "age": document.getElementById("age").value
        };
        let ansy = store.add(date);//这是一个异步操作
        ansy.onsuccess = function () {
            console.log("成功插入数据")

        };
        ansy.error = function () {
            console.log("插入数据失败")

        }

    }

}


/*indexDB创建索引*/

/*Evaluating the object store's key path did not yield a value.  主键必须自增 或者在添加时 增加字段 修改主键的值*/
function insertAll() {
    let dbreq = indexedDB.open('mydb');
    dbreq.onsuccess = function (e) {
        let db = e.target.result;
        let tx = db.transaction("stus", "readwrite")
        let store = tx.objectStore("stus")
        let data = [{
            "name": "1",
            "age": 1
        }, {
            "name": "2",
            "age": 2
        }, {
            "name": "3",
            "age": 3
        }];
        let ansy;//这是一个异步操作
        for (let i = 0; i < data.length; i++) {
            ansy = store.add(data[i])
        }
        ansy.onsuccess = function () {
            console.log("成功插入数据")

        };
        ansy.error = function () {
            console.log("插入数据失败")

        }
    }
}

function select() {
    let dbreq = indexedDB.open("mydb")
    dbreq.onsuccess = function (e) {
        let db = e.target.result;
        let tx = db.transaction("stus", "readonly")
        let store = tx.objectStore("stus")
        // console.info(store)
        let ansy = store.get(27)
        ansy.onsuccess = function (e) {
            // console.info(ansy)
            let date = ansy.result
            console.info(date)
            let name = date.name
            console.info(name)
            let age = date.age
            let content = document.getElementById("content")
            content.innerHTML = "<tr><td>" + name + "</td><td>" + age + "</td></tr>"
            db.close;
        }

    }

}

function find() {
    let dbreq = indexedDB.open("mydb")
    dbreq.onsuccess = function (e) {
        let db = e.target.result;
        let tx = db.transaction("stus", "readonly")
        let store = tx.objectStore("stus")
        let ymname = document.getElementById("name").value
        let ansy = store.index("nameIndex")
        let ansyData = ansy.get(ymname)
        ansyData.onsuccess = function (e) {
            let data = this.result
            let name = data.name
            let age = data.age
            let content = document.getElementById("content")
            content.innerHTML = "<tr><td>" + name + "</td><td>" + age + "</td></tr>"

        }

    }

}

function del() {
    let dbreq = indexedDB.open("mydb")
    dbreq.onsuccess = function (e) {
        let db = e.target.result;
        let tx = db.transaction("stus", "readonly")
        let store = tx.objectStore("stus")
        let ansy = store.delete(5)
        ansy.onsuccess = function (e) {
            db.close;
            console.log("清空")
        }

    }
}
function delAll() {
    let dbreq = indexedDB.open("mydb")
    dbreq.onsuccess = function (e) {
        let db = e.target.result;
        let tx = db.transaction("stus","readwrite")
        let store = tx.objectStore("stus")
        let ansy = store.clear(5)
        ansy.onsuccess = function (e) {
            db.close;
            /*清空成功*/
            console.log("清空")
        }

    }
}
function cursonSelect(){
    let dbreq = indexedDB.open("mydb")
    dbreq.onsuccess = function (e) {
        let db = e.target.result;
        let tx = db.transaction("stus","readwrite")
        let store = tx.objectStore("stus")
        let cursonReq = store.openCursor()
        let html = ""
        cursonReq.onsuccess = function () {
            let curson = this.result
            let content = document.getElementById("content")
            if(curson)
            {
                let name= curson.value.name
                let age  = curson.value.age
                html += "<tr><td>" + name + "</td><td>" + age + "</td></tr>"
                curson.continue();
            }else {
                console.log("遍历结束")
            }
            content.innerHTML = html
            db.close();
        }

    }
}
function cursonDel(){
    let dbreq = indexedDB.open("mydb")
    dbreq.onsuccess = function (e) {
        let db = e.target.result;
        let tx = db.transaction("stus","readwrite")
        let store = tx.objectStore("stus")
        let cursonReq = store.openCursor()
        cursonReq.onsuccess = function () {
            let curson = this.result
            if(curson) {
                let ymname = document.getElementById("name").value
                if(curson.value.name==ymname){
                   curson.delete()
                   console.log("删除成功")
               }
               curson.continue()
            }else {
                console.log("遍历结束")
            }
            db.close();
        }

    }
}
function cursonUpdate() {
    let dbreq = indexedDB.open("mydb")
    dbreq.onsuccess = function (e) {
        let db = e.target.result;
        let tx = db.transaction("stus","readwrite")
        let store = tx.objectStore("stus")
        let cursonReq = store.openCursor()
        cursonReq.onsuccess = function () {
            let curson = this.result
            if(curson) {
                let ymname = document.getElementById("name").value
                if(curson.value.name==ymname){
                    curson.update({
                        uId:curson.key,
                        name:"测试",
                        age:curson.value.age
                    })
                    console.log("更新成功")
                }
                curson.continue()
            }else {
                console.log("用户不存在")
                console.log("遍历结束")
            }
            db.close();
        }

    }

}
