module.exports = {
     selectAll: "select * from banners order by createdAt desc",
     selectByType: "select * from banners where type = ? order by createdAt desc",
     insertOne: "insert into banners (name, type, srcLink, destLink, createdAt) values (?,?,?,?,?)",
     updateOne: "update banners set name = ?, type = ?, srcLink = ?, destLink = ?",
     deleteOne: "delete from banners where id = ?"
}
