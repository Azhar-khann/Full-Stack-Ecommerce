const express = require('express');
const productsRouter = express.Router();
const pool = require('../db/connect_to_db')


// get all products
productsRouter.get('/' , (req, res) => {
    pool.query('SELECT * FROM products', (error, results) => {
        if (error) {
          return res.status(500).send('Internal Server Error' );
        }
        res.status(200).json(results.rows)
    })
});


//get product by id
productsRouter.get('/:id' , (req, res) => {

  const id = parseInt(req.params.id)
  const query = `SELECT products.id, brand, name, category, gender, price, image_path, description,size, product_sizes.id as product_size_ids  FROM products
  JOIN product_sizes ON products.id = product_sizes.product_id WHERE products.id = $1`

  pool.query(query, [id], (error, results) => {
    if (error) {
      return res.status(500).send(error );
    }
    if (results.rows.length === 0) {
      return res.status(404).send('Product not found' );
    }
    /* const productSizeIds = results.rows.map(product => product.product_size_ids);
    res.status(200).json({...results.rows[0], product_size_ids:productSizeIds}) */

    const productSizeIds = {};
    for (let i = 0; i < results.rows.length; i++) {
      productSizeIds[results.rows[i].size] = results.rows[i].product_size_ids;
    }

    res.status(200).json({...results.rows[0], size:undefined, product_size_ids:productSizeIds}) 

  })
});


//get product based on category
/* productsRouter.get('/category/:category' , (req, res) => {

  const category = req.params.category

  pool.query('SELECT * FROM products where category = $1', [category], (error, results) => {
      if (error) {
        res.status(500).send('Internal Server Error' );
      }
      if (results.rows.length === 0){
        return res.status(404).send('No products found for the specified category');
      }
      res.status(200).json(results.rows)
  })
}); */

// filter products based on brand,category or gender
productsRouter.get('/:filter/:name' , (req, res) => {

  const {filter,name} = req.params

  pool.query(`SELECT * FROM products where ${filter} = $1`, [name], (error, results) => {
      if (error) {
        res.status(500).send('Internal Server Error' );
      }
      if (results.rows.length === 0){
        return res.status(404).send('No products found');
      }
      res.status(200).json(results.rows)
  })
});


// create product
productsRouter.post('/' , (req, res) => {

  const {brand,name,category,gender,price,image} = req.body;

  pool.query('INSERT INTO products (brand,name,category,price,image) VALUES ($1, $2, $3, $4, $5)', [brand,name,category,gender,price,image], (error, results) => {
      if (error) {
        return res.status(500).send('Internal Server Error' );
      }
      res.status(200).send('product successfully added')
  })
});


//update a product name or category or price or brand or image or gender
productsRouter.put('/:id' , (req, res) => {

  const id  = req.params.id;
  const column = Object.keys(req.body)[0];
  const newValue = req.body[column];

  pool.query(`UPDATE products SET ${column} = $1 WHERE id = $2`,[newValue, id], (error, results) => {
      if (error) {
        return res.status(500).send('Internal Server Error' );
      }

      if (results.rowCount === 0) {
        return res.status(404).send('Product not found' );
      }
      res.status(200).send(` product's ${column} updated successfully`)
  })
});

// delete a product
productsRouter.delete('/:id' , (req, res) => {

  const id  = req.params.id;

  pool.query(`delete from products where id = $1`,[id], (error, results) => {
      if (error) {
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      if (results.rowCount === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({message:'product deleted successfully'})
  })
});



module.exports = productsRouter;