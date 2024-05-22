module.exports = {
     add: "insert into web_views values(?,?,?,?)",
     findAll: "select * from web_views",
     findUserVisits: "select * from web_views where v_id = ?;"
}