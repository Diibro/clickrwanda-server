module.exports = {
     selectAll: "select id, title, content, category, date_format(publication_date,'%Y-%m-%d') as publication_date from blogs order by id desc, publication_date desc limit ? offset ? ;",
     selectOne: "select id, title, content, category, date_format(publication_date,'%Y-%m-%d') as publication_date from blogs where id = ?;",
     selectByCategory: "select id, title, content, category, date_format(publication_date,'%Y-%m-%d') as publication_date from blogs where category LIKE CONCAT('%', ?, '%') order by id desc, publication_date desc;",
     addOne: "insert into blogs (title, content, category, publication_date) values (?,?,?,?)",
     updateOne: "update blogs set title = ?, content = ?, category = ? where id = ?;",
     deleteOne:"delete from blogs where id = ?",
     countAll: "select count(*) as total from blogs;"
}