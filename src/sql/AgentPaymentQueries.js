
module.exports =  {
     selectAll: "select * from agent_payment order by p_date desc",
     insertOne: "insert into agent_payment values (?,?,?,?)",
     selectByAgentId: "select * from agent_payment where agent_id = ? order by p_date desc",
     update: "update agent_payment set status = ?, amount = ? where agent_id = ? and date = ?"
}