module.exports = {
     add: "insert into web_views values(?,?,?,?,?)",
     findAll: "select * from web_views",
     findUserVisits: "select * from web_views where v_id = ?;",
     selectByType: "select * from web_views where v_type = ?;",
     selectByRef: "select * from web_views where r_id = ?;"
}