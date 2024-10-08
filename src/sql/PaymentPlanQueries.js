module.exports = {
     getAll: "select * from payment_plan",
     addPaymentPlan : 'insert into payment_plan values(?,?, ?, ?,?,?,?,?)',
     deleteById: 'delete from payment_plan where plan_id=?',
     updateById: 'update payment_plan set plan_name = ?, plan_amount = ?, description = ?, Plan_type = ?, location = ?, plan_icon = ?, active = ?  where plan_id = ?',
     searchByName: 'select * from payment_plan where plan_name = ?',
     searchById: 'select * from payment_plan where plan_id =?'
}