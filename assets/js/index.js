const express = require('express');
const app = express();
const ResoClass = require('resoClass');

const path = require('path');

const port = 3500;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tables = [
    {
        name: "Billy",
        number: 5555555555,
        id: 1234,
        email: 'email@email.email'
    },
    {
        name: "Willy",
        number: 66666666666,
        id: 4321,
        email: 'dmail@dmail.dmail'
    }
]
//when no path specified sends user to home page
app.get('/', (req, res)=>res.send(path.join(__dirname, 'home.html')));

//when client requests reservations
app.get('/api/tables', (req, res)=>res.json(tables));

//when client posts reservation data 
app.post('/api/reso', (req, res)=>{
    const tablePost = req.body;
    const newTable = new ResoClass(tablePost.name, tablePost.number, tablePost.id, tablePost.email );
    tables.push(newTable);
    res.send(`Thank you ${tablePost.name} for making a reservation.
    We ill call you at ${tablePost.phone} or email you at ${tablePost.email} 
    when your table is ready. 
    Your reservation ID is ${tablePost.id}`)
});

app.listen(port, ()=>{
    console.log(`server runnin on ${port}`)
})

