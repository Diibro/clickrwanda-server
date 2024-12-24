module.exports = {
     insertOne: "insert into commission_ads values (?,?,?,?,?)",
     countAll: 'select count(*) as total from commission_ads;',
     countNew: "select count(*) as total from commission_ads where  date_format(registration_date, '%Y-%m-%d') = ?;",
     countByAgent: "select count(*) as total from commission_ads where r_id = ?",
     findByAgent: "select a.ad_id,a.ad_name, a.ad_price,a.ad_image, ca.commission, a.ad_date, a.status from adverts a inner join commission_ads ca on a.ad_id = ca.ad_id where ca.r_id = ?;",
     selectBySubCategory: "select a.ad_id, a.ad_name, a.ad_image, a.ad_price, date_format(a.ad_date,'%Y-%m-%d %H:%i:%s') as ad_date, a.contact, a.ad_discount, u.full_name,u.user_id, u.username, u.user_location, u.profile_image,u.user_phone, u.user_email, u.verified, ca.commission, count(w.v_id) as ad_views from commission_ads ca inner join adverts a on a.ad_id = ca.ad_id inner join users u on a.ad_user_id = u.user_id left join web_views w on a.ad_id = w.v_id where u.active is true and a.status = 'Approved' and a.sub_category_id = ? group by a.ad_id  order by a.ad_rank desc, a.ad_date desc limit ? offset ?;  "
}