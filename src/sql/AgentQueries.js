module.exports = {
     selectAll: "select * from agents",
     insertOne: "insert into agents values (?,?,?,?)",
     selectById: "select from agents where agent_id = ?",
     selectByEmail: "select from agents where email = ?",
     updateById: "update agents set email = ?, password = ? where agent_id = ?",
     deleteById: "delete from agents where agent_id = ?"
}