module.exports = {
     selectAll: "select * from blogs limit ? offset ?;",
     selectOne: "select * from blogs where id = ?;",
     selectByCategory: "select * blogs where category = ?;",
     addOne: "insert into blogs (title, content, category, publication_date) values (?,?,?,?)",
     updateOne: "update blogs set title = ?, content = ?, category = ? where id = ?;",
     deleteOne:"delete from blogs where id = ?",
     countAll: "select count(*) as total from blogs;"
}