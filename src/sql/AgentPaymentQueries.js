
module.exports =  {
     selectAll: "select p.p_date, p.amount, p.agent_id, p.status, a.a_phone, a.a_name from agent_payment p inner join agents a on p.agent_id = a.agent_id order by p_date desc",
     insertOne: "insert into agent_payment values (?,?,?,?)",
     selectByAgentId: "select * from agent_payment where agent_id = ? order by p_date desc",
     update: "update agent_payment set status = ?, amount = ? where agent_id = ? and date = ?"
}