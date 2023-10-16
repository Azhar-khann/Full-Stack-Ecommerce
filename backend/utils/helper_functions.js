const bcrypt = require("bcrypt");
const cardValidator = require('credit-card-validator');
const creditcard =  require('creditcard.js');
const pool = require('../db/connect_to_db');
const { use } = require("passport");

// Create password hashing function below:
const passwordHash = async (password, saltRounds) => {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash
  } catch (err) {
    console.log(err);
  }
  return null
};

function groupDataByOrderId(inputJson) {
  return inputJson.reduce((result, item) => {
    const { order_id, ...rest } = item;
    if (!result[order_id]) {
      result[order_id] = { order_id, items: [] };
    }
    result[order_id].items.push(rest);
    return result;
  }, {});
}

function validateCreditCard(cardNumber, expirationMonth, expirationYear, cvv) {

  return creditcard.isValid(cardNumber) && creditcard.isExpirationDateValid(expirationMonth, expirationYear) && creditcard.isSecurityCodeValid(cardNumber,cvv);

}

async function createOrder(user_id,date,res) {

  const addorder =`insert into orders(user_id,date) values($1,$2);`
  
  const addOrderDetails = `WITH recent_order AS (
    SELECT user_id, order_id
    from orders
    order by order_id desc
    limit 1
  )
  
  INSERT INTO order_details (order_id, user_id, product_size_id, quantity) 
  SELECT order_id, cart.user_id, cart.product_size_id, cart.quantity
  FROM cart,recent_order
  WHERE recent_order.user_id = cart.user_id;`

  const addUserAdress = `insert into user_address(user_id,address,address2,city,zip,email)
  values($1,$2,$3,$4,$5,$6)`
  
  const deleteFromCart = `DELETE FROM cart WHERE user_id = $1;`

  try {

    await pool.query(addorder, [user_id,date])

    await pool.query(addOrderDetails)

    //await pool.query(addUserAdress,[user_id,address,address2,city,zip,email])

    await pool.query(deleteFromCart, [user_id])

    res.redirect('https://www.mykickspro.store/thankyou')

  } catch (error) {
    throw error;
  }

}
  




module.exports = {
  passwordHash,
  groupDataByOrderId,
  validateCreditCard,
  createOrder
};