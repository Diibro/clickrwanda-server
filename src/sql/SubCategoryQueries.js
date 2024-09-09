module.exports = {
     selectAll: "select s.sub_id, s.sub_name,s.fields, c.category_id, c.category_name, c.category_icon, count(a.ad_id) as total_ads from sub_category s inner join category c on s.parent_id = c.category_id inner join adverts a on a.sub_category_id = s.sub_id group by s.sub_id;",
     categorySearch: "select c.sub_id, c.sub_name,c.fields, c.parent_id, count(a.ad_name) as sub_ads from sub_category c left join adverts a on a.sub_category_id = c.sub_id  where parent_id = ? group by c.sub_id;",
     addQuery: "insert into sub_category values (?, ?, ?)",
     updateQuery: "update sub_category set sub_name = ?, fields = ? where sub_id = ? ;",
     searchQuery: "select * from sub_category where sub_id = ?;",
     deleteQuery: "delete from sub_category where sub_id = ? ;" 
}