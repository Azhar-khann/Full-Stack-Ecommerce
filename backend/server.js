require('dotenv').config();
const express = require('express');
const app = express();
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const pool = require('./db/connect_to_db');
const {passwordHash} = require('./utils/helper_functions');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const cors = require('cors');
const googleStrategy = require('passport-google-oauth20');
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PORT = process.env.PORT || 4000; // use either the host env var port (PORT) provided by Render or the local port (4000) on your machine

app.use(express.urlencoded({ extended: false }));
app.set('trust proxy', 1)

app.use(cors({
  origin: ['https://www.mykickspro.store','http://localhost:3000'],
  credentials: true  
}));

app.use(express.json());



const store = new session.MemoryStore();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 * 48, secure: process.env.SECURE = 'production', sameSite: 'None'},
    store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query('SELECT * FROM users where id = $1', [id], (error, results) => {
    done(null,results.rows[0])
  })
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const productsRouter = require('./routes/products')
app.use('/products', productsRouter);

const usersRouter = require('./routes/users')
app.use('/users',usersRouter);

const cartRouter = require('./routes/cart')
app.use('/cart', cartRouter)

const ordersRouter = require('./routes/orders')
app.use('/order', ordersRouter)





passport.use(new LocalStrategy(

  function(username, password, done) {

    pool.query('SELECT * FROM users where username = $1', [username], async (error, results) => {

      // if error looking up in database
      if (error) {
        console.log('from error')
        return done(error)
      }

      // if no user found
      if (results.rows.length === 0) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      
      const matchedPassword = await bcrypt.compare(password, results.rows[0].password);
      // if password is incorrect
      if (!matchedPassword){
        return done(null,false)
  
      }

      // if user found and password matches
      return done(null,results.rows[0])
      
    })

  }
));  


passport.use(new googleStrategy({
  callbackURL: '/google/redirect',
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET
  },(accessToken, refreshToken, profile, done) => {

    //const id = profile.id;
    console.log(profile)
    const email = profile.emails[0].value;
    const username = email.split('@')[0];
    const firstname = profile.name.givenName;
    const lastname = profile.name.familyName;

    pool.query('SELECT * FROM users where username = $1', [username], async (error, results) => {
      
      if (results.rowCount === 0) {

        await pool.query('INSERT INTO users (username, firstname, lastname) VALUES ($1, $2, $3)', [username, firstname,lastname])

        pool.query('SELECT * FROM users where username = $1', [username], (error, results) => {
          done(null,results.rows[0])
        })
        

      } else{
        done(null,results.rows[0])
      }
    })

  })
) 

app.get('/google',passport.authenticate('google',{
  scope:['profile','email']
}))

app.get('/google/redirect',passport.authenticate('google'), (req,res) => {
  console.log('you reached callback uri')
  res.redirect('https://www.mykickspro.store/')
}) 


app.get('/', (req, res) => {
  res.send('<h1>Hello from your Express.js server!!</h1>');
});
  
app.post("/register", async (req, res,next) => {
  const { firstName,lastName, username, password } = req.body;
  console.log(username)
  const hashPassword = await passwordHash(password,10)

  pool.query('INSERT INTO users (username, password, firstname, lastname) VALUES ($1, $2, $3, $4)', [username, hashPassword,firstName,lastName], (error, results) => {

    if (error) {
      console.log('error in server is:',error)
      res.status(500).send("Unable to create user!");
    }
    else{
      passport.authenticate("local")(req, res,next);
    
    }

  })
  

});

app.post('/login',passport.authenticate("local"), (req, res) => {
  res.status(201).send('user successfully logged in')
});

app.get('/loggedInUserInfo', (req, res) => {
  if (req.isAuthenticated()){
    const {id,firstname} = req.user;
    res.status(201).json({LoggedIn: true, id:id, firstname: firstname})
  } else{
    res.status(500).json({LoggedIn: false})
  }
})

app.get('/logout', (req, res) => {
  req.logout((err) => {
    if(err) {
      return res.send(err);
    }
    res.redirect('http://localhost:3000');
  });
});

// checkout api
app.post("/api/create-checkout-session",async(req,res)=>{
  const {products} = req.body;

  const lineItems = products.map((product)=>({
      price_data:{
          currency:"usd",
          product_data:{
            name:product.name
          },
          unit_amount:product.price * 100,
      },
      quantity:product.quantity
  }));

  const session = await stripe.checkout.sessions.create({
      payment_method_types:["card"],
      line_items:lineItems,
      mode:"payment",
      success_url:"https://serverurl.mykickspro.store/cart/user/checkout",
      cancel_url:"https://www.mykickspro.store/cart",
  });

  res.json({id:session.id})

})


app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});