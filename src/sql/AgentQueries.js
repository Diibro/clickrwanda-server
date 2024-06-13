module.exports = {
     selectAll: "select * from agents",
     countAll:"select count(*) as agents from agents",
     insertOne: "insert into agents(agent_id,a_name, a_email, a_phone, a_password, location,registration_date,active) values (?,?,?,?,?,?,?,?)",
     selectById: "select * from agents where agent_id = ?",
     selectByEmail: "select * from agents where a_email = ?",
     updateById: "update agents set a_name = ?,a_email = ?, a_phone = ?,a_password = ?, location = ?, active = ? where agent_id = ?",
     deleteById: "delete from agents where agent_id = ?",
}