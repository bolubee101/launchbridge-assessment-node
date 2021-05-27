let User=require("./modules/users/users.model");
let Safehouse=require("./modules/safeHouse/safeHouse.model");
let Safebox=require("./modules/safebox/safeBox.model");
let bcrypt=require("bcryptjs");
const mongoose = require('mongoose');

const configuration = require('./config/configuration');

// connect to database
mongoose.connect(configuration.database, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('mongodb connection established');
  console.log("seeding admins");
  admins();
  console.log("seeding managers");
  managers();
  console.log("seeding workers")
  workers();
  console.log("seeding safehouses")
  safehouses();
});

//create 2 dummy admin users.
const admins=async ()=>{
    let admin=[]
    let hash = await bcrypt.hash("password", 10);
    for(i=0;i<=1;i++){
    admin[i]=new User({
        name:`admin${i}`,
        email:`admin${i}@mail.com`,
        password:hash,
        role:"admin"
    });
    await admin[i].save()
    }
}
// create 7 dummy manager users
const managers=async ()=>{
    let manager=[]
    let hash = await bcrypt.hash("password", 10);
    for(i=0;i<=6;i++){
    manager[i]=new User({
        name:`manager${i}`,
        email:`manager${i}@mail.com`,
        password:hash,
        role:"manager"
    });
    await manager[i].save()
    }
}
// create 19 worker users
const workers=async ()=>{
    let worker=[]
    let hash = await bcrypt.hash("password", 10);
    for(i=0;i<=19;i++){
    worker[i]=new User({
        name:`worker${i}`,
        email:`worker${i}@mail.com`,
        password:hash,
        role:"worker"
    });
    await worker[i].save()
    }
}

// create 2 safe houses, and for each safe house, 10 safe boxes
const safehouses=async ()=>{
    let safehouse=[]
    for(i=0;i<=1;i++){
        safehouse[i]= new Safehouse({});
        let safebox=[];
        safehouse[i].save(async (err,doc)=>{
            for(j=0;j<=4;j++){
                safebox[j]=new Safebox({safeHouse:doc._id})
                await safebox[j].save()
            }
        });
    }
}
