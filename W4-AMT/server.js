
const app = require('./express/index')




const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`server in listen on ${PORT}`);
})
