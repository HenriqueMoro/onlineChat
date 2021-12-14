const express = require('express');
const path = require('path');
require("dotenv").config();
const mongoose = require('mongoose')
const Color = require('./database/colorSchema')
const Message = require('./database/messageSchema')


mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true
});


const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname,'public')));
app.set('views',path.join(__dirname,'public'));
app.engine('html',require('ejs').renderFile);
app.set('view engine','html');

app.use('/',(req,res)=>{
    res.render('index.html')
})



io.on('connection', (socket) =>{
    console.log(`Socket conectado: ${socket.id}`)
    
    async function PreviusMessages (){
        const mensagem =  await Message.find()
        socket.emit('previusMessage',mensagem) 
    }
    
    

    socket.on('sendColor', async (data)=>{
        
      
        
        const res = await Color.findOne({author:data})
        
        if(res){
            socket.emit('sendColor',res.color)
            PreviusMessages() 
            
        }
        else {
            var colorHex = '#' + parseInt((Math.random() * 0xFFFFFF)).toString(16).padStart(6, '0');
            const color = await Color.create({author: data, color: colorHex})
            
            socket.emit('sendColor',colorHex)
            PreviusMessages() 
        }  
   
    })

    socket.on('sendMessage',async (data) => {
        const message = await Message.create({author:data.author, message: data.message,color:data.color})
        socket.broadcast.emit('receivedMessage',data)
    })
    
})

server.listen(3000)

