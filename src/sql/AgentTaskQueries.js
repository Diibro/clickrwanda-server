module.exports = {
     selectAll: "select task_name, assigned_agents, date_format(task_date,'%Y-%m-%d') as task_date, date_format(exp_date, '%Y-%m-%d') as exp_date, v_ids, amount  from agent_task order task_date desc;",
     insertOne: "insert into agent_task values (?,?,?,?,?)",
     update: "update agent_task set v_ids = ?, assigned_agents = ?, exp_date = ? where task_name = ? and task_date = ?",
     delete: "delete from agent_task where task_name = ? and task_date = ?;",
     selectByAgent: "select date_format(t.task_date, '%Y-%m-%d') as task_date, date_format(t.exp_date, '%Y-%m-%d') as exp_date, t.v_ids, t.amount from agent_task t where (JSON_LENGTH(t.assigned_agents) = 0 or JSON_CONTAINS(t.assigned_agents, ?)) and agent_type = ?;"
}