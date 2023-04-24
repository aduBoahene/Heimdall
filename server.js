
const express = require('express')
const app = express()
const PORT = process.env.port || 8899
const db = require("./models");

const bodyparser = require('body-parser')

//Body-parser middleware
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())

const UserRoute = require("./Router/User.Route");
const AppLinkRoute = require("./Router/AppLink.Route");

app.use("/api/user", UserRoute);
app.use("/api/appLink", AppLinkRoute);


db.sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });


// db.sequelize.sync().then(req => {
// 	app.listen(PORT, async () => {
// 		await console.log(`App started on ${PORT}`)
// 	})
// });

(async () => {
	try {
	  await db.sequelize.sync();
	  app.listen()
	   //app.listen(PORT, () => {
		// console.log(`App started on ${PORT}`);
	   //});
	} catch (error) {
	  console.error(error);
	}
  })();

//   app.listen(PORT, () => {
// 		console.log(`App started on ${PORT}`);
// 	});
  

module.exports = app

