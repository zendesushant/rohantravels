const mongoose=require('mongoose');
const DATABASE_NAME='FrioCabs';
const connectionURL=`mongodb://127.0.0.1:27017/${DATABASE_NAME}`;
mongoose.connect(connectionURL).then(()=>{
    console.log("DateBase Connection Established")
}).catch(()=>{
    console.log("xxxxxx.........Failed to Establis DataBaseConnection........xxxxxx")
})