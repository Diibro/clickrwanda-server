module.exports = {
     selectAll: "select * from agent_task order task_date desc;",
     insertOne: "insert into agent_task values (?,?,?,?,?)",
     update: "update agent_task set v_ids = ?, assigned_agents = ?, exp_date = ? where task_name = ? and task_date = ?",
     delete: "delete from agent_task where task_name = ? and task_date = ?;",
     selectByAgent: "select t.task_date, t.exp_date, t.v_id from agent_task t where ? in t.assigned_task"
}