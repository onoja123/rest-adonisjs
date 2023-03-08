import AdminJS from 'adminjs'
import mongoose from 'mongoose'
import Admin from './models/admin.model'
import Deposit from './models/deposit.model'
import FCMToken from "./models/firebase.model"
import Otps from "./models/otp.model"
import Trips from "./models/trip.model"
import Users from "./models/user.model"
import Vehicles from "./models/vehicle.model"
import Verification from "./models/verifications.model"
import * as AdminJSMongoose from '@adminjs/mongoose'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import Connect from 'connect-pg-simple'
import session from 'express-session'

AdminJS.registerAdapter({
  Resource: AdminJSMongoose.Resource,
  Database: AdminJSMongoose.Database,
})

mongoose.set('strictQuery', false);

const PORT = 3000

const DEFAULT_ADMIN = {
  email: 'admin@example.com',
  password: 'password',
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

const start = async () => {
  const app = express()

  await mongoose.connect("mongodb+srv://cargo-dealer-dev-db:d9UPIDW5lsU9jDXC@cluster0.lasta5u.mongodb.net/CARGO-DEALER-DEV-DB?retryWrites=true&w=majority")

  
  const adminOptions = {
    
    resources: [Admin, Deposit, FCMToken, Otps, Trips, Users, Vehicles, Verification]
  }
  const admin = new AdminJS(adminOptions)

  const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "AdminJS",
      cookiePassword: "Secret",
    },
    null,
    {
      resave: true,
      saveUninitialized: true,
      secret: 'Secret',
      name: 'adminjs',
    }
  );

  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()

export default start;