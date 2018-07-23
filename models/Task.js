var db = require('../dbconnection');

var Task = {
    getAllTasks: function (callback) {
        return db.query("Select * from notice order by NoticeId desc", callback);
    },
    getTaskById: function (id, callback) {
        return db.query("select * from notice where NoticeId=?", [id], callback);
    },
    addTask: function (Task, callback) {
        return db.query("Insert into notice(Title, Content, Url, LastUser, LastModefied) values(?,?,?,'admin',sysdate())", [Task.Title, Task.Content, Task.Url], callback);
    },
    deleteTask: function (id, callback) {
        return db.query("delete from notice where NoticeId=?", [id], callback);
    },
    updateTask: function (id, Task, callback) {
        return db.query("update notice set Title=?, Content=?, Url=? where NoticeId=?", [Task.Title, Task.Content, Task.Url, id],callback);
    },
    deleteAll: function (item, callback) {

        var delarr = [];
        for (i = 0; i < item.length; i++) {

            delarr[i] = item[i].Id;
        }
        return db.query("delete from task where Id in (?)", [delarr], callback);
    },
    searchTasks: function (searchText, callback) {
        return db.query("Select * from notice where title like concat('%', '"+ searchText +"', '%') or content like concat('%', '"+searchText+"', '%') order by NoticeId desc", callback);
    }
};
module.exports = Task;