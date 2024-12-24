module.exports = {
     getAllQuotations: `SELECT * FROM quotations`,
     search: `select * from quotations where quote_id = ?;`,
     addNew: 'insert into quotations values (?,?,?,?,?,?,?);',
     delete: 'delete from quotations where quote_id = ?;',
     searchType: `select * from quotations where quote_type like '%?%';`
     
}