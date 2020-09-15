# CRUD
Creating an application to manage interaction between 3 collection and CRUD over the same.

# DB details
Three tables are there

1. user_details
    column names - user_id, name, email, bio, password

2. business_detail
    column names - business_id, user_id, name, email, reg_no

3. product_details
    column names - product_id, user_id, business_id, name, mrp, description, is_business, is_user, is_delete

# How to run the project

1. install node
2. db used mysql
3. git clone the project
4. run npm install
5. nodemon index.js