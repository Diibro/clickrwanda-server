module.exports = {
     selectAll: "select * from plan_subscription;",
     insertOne: "insert into plan_subscription values(?,?,?,?,?,?,?,?,?);",
     update: "update plan_subscription set plan_type = ?, amount = ?, status = ?, exp_date = ? where plan_id = ? and user_id = ? and subscription_date = ?",
     selectByR_Id: "select * from plan_subscription where r_id = ? and status = 'Approved",
     selectByUserId: "select * from plan_subscription where user_id = ?"
}