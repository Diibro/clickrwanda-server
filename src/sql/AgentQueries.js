module.exports = {
     selectAll: "select * from agents order by agent_id desc",
     countAll:"select count(*) as agents from agents;",
     countAllAgents: "select count(*) as total from agents where agent_type = ?",
     countNewAgents: "select count(*) as total from agents where agent_type = ? and date_format(registration_date, '%Y-%m-%d') = ?;",
     insertOne: "insert into agents(agent_id,a_name, a_email, a_phone, a_password, location,registration_date,active, verified, social_links,agent_type ) values (?,?,?,?,?,?,?,?,?,?,?)",
     selectById: "select * from agents where agent_id = ?",
     selectByEmail: "select * from agents where a_email = ? and agent_type = ?",
     updateById: "update agents set a_name = ?,a_email = ?, a_phone = ?,a_password = ?, location = ?, active = ?, verified = ?, social_links = ? where agent_id = ?",
     deleteById: "delete from agents where agent_id = ?",
}