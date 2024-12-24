
module.exports = {
     selectAll: "select * from agent_commission;",
     insertOne: "insert into agent_commission values (?,?,?,?,?);",
     selectByAgent: "select * from agent_commission where agent_id = ?;",
     selectByDate: "select * from agent_commission where c_date = ?;",
     selectByType: "select * from agent_commission where c_type = ?;",
     selectByDateAndType: "select * from agent_commission where c_type = ? and c_date = ?"
}