
module.exports =  {
     selectAll: "select * from agent_payment",
     insertOne: "insert into agent values (?,?,?,?)",
     selectByAgentId: "select * from agent_payment where agent_id = ?",
     update: "update agent_payment set status = ?, amount = ? where agent_id = ? and date = ?"
}