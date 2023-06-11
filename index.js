const express = require("express");
const app = express();
app.use(express.static("UserAccountLogin"));
app.get("/", (request, response) => {
   response.sendFile(__dirname + "/UserAccountLogin/UserAccountInfo.html");
});
app.use(express.json());
app.post('/*', function (request, response, next) {
   console.log("Server recieved a post request at", request.url);

   next();
});
app.post('/newlog', function (request, response, next) {

   response.send("I got your POST request");

});
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://alexanderbrigham:FEbaj6ZUxe2FGlFr@cluster0.khz2pij.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,


   })
   .then(() => console.log('MongoDB Connected'))
   .catch(err => console.log(err));
app.post('/smt', (req, res) => {
   console.log(req.body);
   res.send('POST request received');
});
const UserSchema = new mongoose.Schema({
   username: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   balance: {
      type: Number,

      required: true
   }
});
const User = mongoose.model('User', UserSchema);
//clear db
/*
User.deleteMany({})
   .then(() => {
      console.log('All documents deleted');
   })
   .catch((err) => {
      console.error(err);
   });
*/
async function checkUsernameAndPassword(username1, password1) {

   const user = await User.findOne({
      username: username1
   });
   if (!user) {
      return false;
   }

   const isMatch = await bcrypt.compare(password1, user.password);
   if (isMatch) {
      return true;
   }
   return false;
}
app.post('/log', async (req, res) => {
   console.log('log');
   try {
      const user1 = {
         username,
         password,
         balance
      } = req.body;
      let userexists = await checkUsernameAndPassword(user1.user.username, user1.user.password);
      if (userexists) {
         app.use('/AccountBalance', express.static('AccountBalance'));
         res.status(201).send();
      } else {
         res.status(202).send();
      }
   } catch {
      res.status(500).send();
   }
});
app.post('/reg', async (req, res) => {
   console.log('reg');
   const user2 = {
      username,
      password,
      balance
   } = req.body;
   console.log(user2);
   console.log(user2.user.password);

   const user3 = await User.findOne({
      username: user2.user.username
   });
   if (user3) {
      res.json({
         message: 'username exists'
      });
      return;
   }


   const hashedPassword = await bcrypt.hash(user2.user.password, 10);

   let fbal = user2.user.balance;
   if (typeof fbal === 'string') {
      fbal = parseFloat(fbal);
   }


   const newUser = new User({
      username: user2.user.username,
      password: hashedPassword,
      balance: fbal
   });
   await newUser.save();

   const users = await User.find({});
   console.log(users)
   res.json({
      message: 'User created successfully.'
   });
});
app.post('/getbal', async (req, res) => {
   console.log('getbal');
   let t = req.body;
   console.log(t.username);

   const user3 = await User.findOne({
      username: t.username
   });

   let bal = user3.balance.toLocaleString();
   console.log(bal);
   res.send(bal);
});
app.post('/postbal', async (req, res) => {
   console.log('postbal');
   let t = req.body;
   console.log(t.balance);


   let fbal = t.balance;
   if (typeof fbal === 'string') {
      fbal = parseFloat(fbal);
   }


   const result = await User.updateOne({
      username: t.username
   }, {
      balance: fbal
   });
   console.log(result);

   const user3 = await User.findOne({
      username: t.username
   });
   if (user3) {
      console.log(user3.balance);
      res.send(user3.balance.toLocaleString());

   } else {
      res.status(404).send('User not found');
   }

});
app.listen(3000, () => console.log('Server started on port 3000'));