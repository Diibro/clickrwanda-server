module.exports = {
     insertOne: "insert into commission_ads_clients values (?,?,?,?,?,?,?,?)",
     update: "update commission_ads_client set status = ? where name = ? and phone = ? and  ad_id = ? and date_format(contact_date, '%Y-%m-%d') = ?;",
     selectAll: "select c.name, c.phone, c.message, date_format(c.contact_date, '%Y-%m-%d') ad contact_date,c.status, a.ad_image, a.ad_name, a.contact, a.commission, a.ad_price, u.username,u.full_name, u.profile_image, ag.a_name, ag.agent_id from commission_ads_clients c inner join adverts a on a.ad_id = c.ad_id inner join users u on u.user_id = c.user_id left join agents ag on ag.agent_id = c.r_id order by c.contact_date desc;",
     selectByAgent: "select c.name, c.phone, c.message, date_format(c.contact_date, '%Y-%m-%d') ad contact_date,c.status, a.ad_image, a.ad_name, a.contact, a.commission, a.ad_price, u.username,u.full_name, u.profile_image, ag.a_name, ag.agent_id from commission_ads_clients c inner join adverts a on a.ad_id = c.ad_id inner join users u on u.user_id = c.user_id left join agents ag on ag.agent_id = c.r_id where c.status = 'Approved' and c.r_id = ? order by c.contact_date desc;",
     countAll: "select count(*) as total from commission_ads_clients;",
     countNew: "select count(*) as total from commission_ads_clients where date_format(contact_date, '%Y-%m-%d') = ?;"
}