module.exports = {
     selectAll: "select date_format(s.subscription_date, '%Y-%m-%d' ) as subscription_date,s.plan_type, s.exp_date,s.amount,s.status, s.payment_id, p.plan_name, a.a_name, u.username  from plan_subscription s inner join users u on s.user_id = u.user_id inner join payment_plan p on p.plan_id = s.plan_id left join agents a on a.agent_id = s.r_id;",
     insertOne: "insert into plan_subscription values(?,?,?,?,?,?,?,?,?);",
     // update: "update plan_subscription set plan_type = ?, amount = ?, status = ?, exp_date = ? where plan_id = ? and user_id = ? and subscription_date = ?",
     update: "update plan_subscription set status = ? where payment_id = ?",
     selectByR_Id: "select * from plan_subscription where r_id = ? and status = 'Approved';",
     selectByUserId: "select * from plan_subscription where user_id = ?"
}