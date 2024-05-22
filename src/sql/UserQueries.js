module.exports = {
     selectAll: "select * from users",
     createUser: "insert into users (user_id, full_name, username, user_email, user_phone, user_password, profile_image, reg_date, user_location, user_type) values (?, ?, ?, ?, ?,?,?,?,?,?)",
     updateQuery: "update users set full_name = ?, username = ?, user_email = ?, user_phone = ?, profile_image = ?, user_location = ?, website = ?  where user_id = ? ",
     searchQuery: "select user_id, full_name, username, user_email, user_phone, profile_image, user_location, user_type,date_format(reg_date, '%Y-%m-%d') as reg_date, rating from users where user_id = ?",
     deleteQuery: "delete from users where user_id = ? ",
     seachEmail: "select * from users where user_email = ?",
     searchByid: "select * from users where user_id = ? ",
     updateUserRating: "update users set rating = ? where user_id = ?",
     getUserViews: "select sum(a.ad_views) as total_views from adverts a inner join users u on a.ad_user_id = u.user_id where u.user_id = ?;",
     getBestViewedUsers: "select u.user_id, u.username, u.full_name, u.profile_image, u.user_phone, sum(a.ad_views) as total_views, count(a.ad_id) as total_ads from users u inner join adverts a on u.user_id = a.ad_user_id group by u.user_id having total_ads > 1 order by total_views desc limit ?;",
     getUserAdsTotal: "select count(*) as total_ads from adverts where ad_user_id = ?",
     getBestSellers: "select u.user_id, u.username, u.full_name,u.profile_image, u.user_phone, p.plan_name, sum(a.ad_views) as total_views, count(a.ad_id) as total_ads from users u inner join payment_plan p on u.ad_plan_id = p.plan_id inner join adverts a on u.user_id = a.ad_user_id group by u.user_id where p.plan_name like '%premium%' or p.plan_name like '%urgent%' or p.plan_name like '%featured%';",
     changePassword: "update users set user_password = ? where user_id = ? ;"
}