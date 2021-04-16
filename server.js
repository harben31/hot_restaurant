const express = require('express');
const app = express();
const fs = require('fs');
const ResoClass = require('./assets/js/lib/resoClass');

const path = require('path');

const port = 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


//when no path specified sends user to home page
app.get('/', (req, res)=>res.sendFile(path.join(__dirname, './public/home.html')));

//cannot find file even though it is there
app.get('/reso', (req, res)=>res.sendFile(path.join(__dirname, './public/reso.hmtl')));

//when client requests reservation data
app.get('/api/tables', (req, res)=>{
    fs.readFile('./db/db.json', 'utf8', (err, data)=>{
        if(err) throw err;
        res.send(data[1]);
    })
});
// console.log(tables);

//when client posts new reservation data 
app.post('/api/reso', (req, res)=>{
    
    // const newTable = new ResoClass(tablePost.name, tablePost.number, tablePost.id, tablePost.email );
    fs.readFile('./db/db.json', ((err, data)=>{
        if (err) throw err;
        const json = JSON.parse(data);
        console.log(json);
        const tablePost = req.body;
        console.log(tablePost);
        json.push(tablePost);
        fs.writeFile('./db/db.json', JSON.stringify(json), (err, data)=>{
            if(err) throw err;
        })
    }))
    // tables.push(JSON.stringify(newTable));
    // res.send(`Thank you ${tablePost.name} for making a reservation.
    // We ill call you at ${tablePost.phone} or email you at ${tablePost.email} 
    // when your table is ready. 
    // Your reservation ID is ${tablePost.id}`)
    res.end()
});

app.listen(port, ()=>console.log(`server runnin on ${port}`))

