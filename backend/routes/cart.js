const express = require('express');
const cartRouter = express.Router();
const pool = require('../db/connect_to_db');
const validateCreditCard = require('../utils/helper_functions').validateCreditCard
const createOrder = require('../utils/helper_functions').createOrder


const query = `select name,size,price,image_path from cart join product_sizes 
    on cart.product_size_id = product_sizes.id 
    join products
    on  product_sizes.product_id = products.id 
    where user_id = $1 `

//get items in users cart
cartRouter.get('/user' , (req, res) => {

    const id = req.user.id;
        
    const query = `select cart.product_size_id, name,size,price,cart.quantity,image_path from cart join product_sizes 
    on cart.product_size_id = product_sizes.id 
    join products
    on  product_sizes.product_id = products.id 
    where user_id = $1`

    pool.query(query, [id], (error, results) => {

        if (error) {
          return res.status(500).send('Internal Server Error' );
        }

        if (results.rowCount === 0) {
            return res.status(404).send( 'cart not found' );
        }

        res.status(200).json(results.rows)
    })
});

//add products in user's cart
cartRouter.post('/user' , (req, res) => {

    const {product_size_id,quantity} = req.body;

    pool.query('insert into cart (user_id,product_size_id,quantity) values($1,$2,$3)', [req.user.id,product_size_id,quantity], (error, results) => {

        if (error) {
          return res.status(500).send('Internal Server Error' );
        }

        res.status(200).send('product successsfully added in user cart')
    })
});

// change product in user's cart
cartRouter.put('/user/:user_id/:existing_product_size_id/:new_product_size_id' , (req, res) => {

    const user_id  = req.params.user_id;
    const existing_product_size_id = req.params.existing_product_size_id;
    const new_product_size_id = req.params.new_product_size_id;

    pool.query(`UPDATE cart SET product_size_id = $1 WHERE user_id = $2 and product_size_id = $3`, [new_product_size_id, user_id, existing_product_size_id], (error, results) => {

        if (error) {
          return res.status(500).send('Internal Server Error' );
        }

        if (results.rowCount === 0) {
            return res.status(404).send('cart not found' );
        }

        res.status(200).send(`user's cart updated successfully`)
    })
});

// delete product from user's cart
cartRouter.delete('/user/:product_size_id' , (req, res) => {

    const user_id  = req.user.id;
    const existing_product_id = req.params.product_size_id;

    pool.query(`delete from cart where user_id = $1 and product_size_id = $2`,[user_id,existing_product_id],  (error, results) => {

        if (error) {
          return res.status(500).send('Internal Server Error' );
        }

        if (results.rowCount === 0) {
            return res.status(404).send( 'cart not found' );
        }

        res.status(200).send('cart deleted successfully')
    })
});


cartRouter.get('/user/checkout', (req, res) => {

    console.log('user id=',req.user.id)
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    pool.query(query, [req.user.id], (error, results) => {

        if (results.rowCount === 0) {
            return res.status(404).send( 'no items in cart' );
        }
        else {
            return createOrder(req.user.id,formattedDate,res);          
        }

    })
})

module.exports = cartRouter;