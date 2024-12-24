module.exports = {
     findAdReviews: "select message, name from reviews where ad_id = ?",
     findUserReviews: "select message, name from reviews where user_id = ?",
     addAdReview: "insert into reviews (id, message, user_id, ad_id, name, type, review_date) values (?, ?,?, ?, ?, ?, NOW())",
     addUserReview: "insert into reviews (id, message, user_id, name, type, review_date) values (?, ?, ?, ?,?, NOW())",
     deleteReview: 'delete from reviews where id = ?',
     findUserReviewsPerType: "select * from reviews where user-id = ? and type = ?;",
     selectAll: "select * from reviews"
     
}