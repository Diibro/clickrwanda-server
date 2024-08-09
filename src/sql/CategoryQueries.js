module.exports = {
     selectAll: `select c.category_id, c.category_name, c.category_icon, c.category_rank, count(a.ad_id) as total_adverts from category c left join sub_category s on c.category_id = s.parent_id left join  adverts a on a.sub_category_id = s.sub_id group by c.category_id, c.category_name order by c.category_rank asc;`,
     createCategory: `insert into category values (?, ?, ?,?)`,
     updateQuery: "update category set category_name = ?, category_icon = ?, category_rank = ? where category_id = ? ;",
     searchQuery: "select * from category where category_id = ?;",
     deleteQuery: "delete from category where category_id = ? ;",
     deleteSubs: "delete from sub_category where parent_id = ? ;",
     countAll: "select count(*) as total from category;"
}