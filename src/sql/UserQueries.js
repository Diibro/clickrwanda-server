module.exports = {
     selectAll: "select * from users where user_type <> 'admin';",
     createUser: "insert into users (user_id, user_email,full_name, username, user_phone, user_password, profile_image, reg_date, user_location, user_type,active,verified) values (?, ?,?, ?, ?,?,?,?,?,?,true,false)",
     createUserRef: "insert into users (user_id, user_email,full_name, username, user_phone, user_password, profile_image, reg_date, user_location, user_type,r_id,active, business_type) values (?, ?,?, ?, ?,?,?,?,?,?,?,true,?)",
     updateQuery: "update users set full_name = ?, username = ?, user_phone = ?, profile_image = ?, user_location = ?, website = ?, ad_plan_id = ?,active = ?, verified = ?  where user_id = ? ",
     searchQuery: "select user_id, full_name, username, user_email, user_phone, profile_image, user_location, user_type,date_format(reg_date, '%Y-%m-%d') as reg_date, rating,active, verified from users where user_id = ?;",
     deleteQuery: "delete from users where user_id = ? ",
     searchEmail: "select * from users where user_email = ?;",
     searchByid: "select * from users where user_id = ? ",
     updateUserRating: "update users set rating = ? where user_id = ?",
     getUserViews: "select sum(a.ad_views) as total_views from adverts a inner join users u on a.ad_user_id = u.user_id where u.user_id = ?;",
     getBestViewedUsers: "select u.user_id, u.username, u.full_name, u.profile_image, u.user_phone, u.verified, sum(a.ad_views) as total_views, count(a.ad_id) as total_ads from users u inner join adverts a on u.user_id = a.ad_user_id group by u.user_id having total_ads > 1 order by total_views desc limit ?;",
     getUserAdsTotal: "select count(*) as total_ads from adverts where ad_user_id = ?",
     getBestSellers: "select u.user_id, u.username, u.full_name,u.profile_image, u.user_phone, u.verified, p.plan_name, sum(a.ad_views) as total_views, count(a.ad_id) as total_ads from users u inner join payment_plan p on u.ad_plan_id = p.plan_id inner join adverts a on u.user_id = a.ad_user_id group by u.user_id order by u.verified desc limit ? offset ?;",
     changePassword: "update users set user_password = ? where user_id = ? ;",
     selectByR_Id: "select u.username, u.user_email, u.reg_date, u.active, count(a.ad_id) as total_ads  from users u left join adverts a on u.user_id = a.ad_user_id where r_id = ? group by u.user_id;",
     countAllUsers: "select count(*) as total from users where user_type = ?;",
     countNewUsers: "select count(*) as total from users where user_type = ? and date_format(reg_date, '%Y-%m-%d') = ?"
}