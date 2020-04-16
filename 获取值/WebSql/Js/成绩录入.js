let db = openDatabase("ScoreDB", '1', "成绩管理", 1024 * 1024 * 3);

/*创建表*/
function createTable() {
    //开启事务
    db.transaction(function (tx) {
        /*执行sql*/
        tx.executeSql(
            'create table  if not exists score(id integer primary key, name text) ',
            [],
            function (tx, rs) {
                console.info('创建表成功')
            },
            /*回滚函数 错误*/
            function (tx, error) {
                console.info('创建失败' + error.message)

            })

    })
}

/*插入数据*/
function insert() {
    db.transaction(function (tx2) {
        let id = document.getElementById("id").value;
        let name = document.getElementById("name").value;
        tx2.executeSql(
            'insert into stu(id,name) values (?,?)',
            [id, name],
            function (tx2, rs2) {
                console.info('插入成功')
            },
            function (tx2, error) {
                console.info('插入失败' + error.message)

            }
        );

    });

}

function select() {
    db.transaction(function (tx3) {
        let content = document.getElementById("content");

        let id = document.getElementById("id").value;
        // let name = document.getElementById("name").value;
        tx3.executeSql(
            'select * from stu',
            [],
            function (tx3, rs3) {
                // console.log('查询结果')
                let len = rs3.rows.length;
                let html ="";
                for (let i = 0; i < len; i++) {
                    /*获取数据*/
                    let date = rs3.rows.item(i);
                    let id = date["id"]
                    let name = date["name"]
                    // console.info(id+":"+name)
                    html += "<tr><td>"+id+"</td><td>"+name+"</td></tr>";
                }
                content.innerText = html
            },
            function (tx3, error3) {
                console.info('失败' + error3.message)

            }
        );

    });
}
function update() {
    db.transaction(function (tx2) {
        let id = document.getElementById("id").value;
        let name = document.getElementById("name").value;
        tx2.executeSql(
            'update stu set name = ? where id = ?',
            [name, id],
            function (tx2, rs2) {
                console.info('更新成功')
            },
            function (tx2, error) {
                console.info('更新失败' + error.message)

            }
        );

    });

}
function del() {
    db.transaction(function (tx2) {
        let id = document.getElementById("id").value;
        let name = document.getElementById("name").value;
        tx2.executeSql(
            'delete from stu where id = ?',
            [id],
            function (tx2, rs2) {
                console.info('删除成功')
            },
            function (tx2, error) {
                console.info('删除失败' + error.message)

            }
        );

    });

}
