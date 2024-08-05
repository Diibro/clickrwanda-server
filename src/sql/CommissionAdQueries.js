module.exports = {
     insertOne: "insert into commission_ads values (?,?,?,?,?)",
     countAll: 'select count(*) as total from commission_ads;',
     countNew: "select count(*) as total from commission_ads where  date_format(registration_date, '%Y-%m-%d') = ?;"
}