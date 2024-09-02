module.exports = {
     add: "insert into web_views values(?,?,?,?,?)",
     findAll: "select * from web_views",
     findUserVisits: "select * from web_views where v_id = ?;",
     selectByType: "select * from web_views where v_type = ?;",
     selectByRef: "select * from web_views where r_id = ?;",
     countShopAdVisits: "select count(*) as total from web_views where v_id in (select ad_id from adverts where ad_user_id = ?);",
     countShopVisits: "select count(*) as total from web_views where v_id = ?;",
     countAdImpressions: "select count(*) as total from web_views where date_format(v_date, '%Y-%m-%d') > ?",
     countFromDate: "select count(*) as total from web_views where date_format(v_date, '%Y-%m-%d') >= ?;",
}