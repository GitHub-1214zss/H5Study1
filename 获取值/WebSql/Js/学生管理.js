let db = openDatabase("stuDB",'1',"学生信息管理",1024*1024*3);
function createTable() {
    //开启事务
    db.transaction(function (tx) {
        tx.executeSql('create table stu20200407',[],function (tx,rs) {
        console.info('创建表成功')
        },
            function (tx,error) {
            console.info('创建失败'+error.message)

            })

    })
}