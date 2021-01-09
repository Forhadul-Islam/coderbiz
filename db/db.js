const mongoose = require('mongoose');
const dbUri = process.env.MONGO_URI;

if(!dbUri){
    console.error('mongo uri missing');
    return new Error('Mongo uri is missing!')    
}

mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useFindAndModify: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log('connected to db')
}).catch(err => console.log('faild to connect ' + err))


module.exports = mongoose;