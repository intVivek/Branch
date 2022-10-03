const app = require('express')();
const server = require('http').createServer(app);

server.listen(process.env.PORT || 5000,()=>{
    console.log(`Server Started at port ${process.env.PORT}`);
});