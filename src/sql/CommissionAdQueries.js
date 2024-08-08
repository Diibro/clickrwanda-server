module.exports = {
     insertOne: "insert into commission_ads values (?,?,?,?,?)",
     countAll: 'select count(*) as total from commission_ads;',
     countNew: "select count(*) as total from commission_ads where  date_format(registration_date, '%Y-%m-%d') = ?;",
     countByAgent: "select count(*) as total from commission_ads where r_id = ?",
     findByAgent: "select a.ad_id,a.ad_name, a.ad_price,a.ad_image, ca.commission, a.ad_date, a.status from adverts a inner join commission_ads ca on a.ad_id = ca.ad_id where ca.r_id = ?;"
}