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
const keys = require('./keys')
const googleStrategy = require('passport-google-oauth20')

app.use(express.urlencoded({ extended: false }));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true  
}));

app.use(express.json());



const store = new session.MemoryStore();

app.use(
  session({
    secret: "D53gxl41G",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 300000000, secure: false, domain: 'localhost', path: '/',secure: false },
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
  clientID: keys.google.cliendId,
  clientSecret: keys.google.clientSecret
  },(accessToken, refreshToken, profile, done) => {

    const id = profile.id
    console.log(profile)
    const firstname = profile.name.givenName;
    const lastname = profile.name.familyName;

    pool.query('SELECT * FROM users where id = $1', [id], (error, results) => {

      if (results.rowCount === 0) {
        pool.query('INSERT INTO users (id, firstname, lastname) VALUES ($1, $2, $3)', [id, firstname,lastname])
        done(null,{id,firstname,lastname})

      } else{
        done(null,results.rows[0])
      }
    })

  })
) 

app.get('/google',passport.authenticate('google',{
  scope:['profile']
}))

app.get('/google/redirect',passport.authenticate('google'), (req,res) => {
  console.log('you reached callback uri')
  res.redirect('http://localhost:3000')
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



app.listen(4000, () => {
  console.log('Server listening on port 4000');
});