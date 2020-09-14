const express = require('express');
const app = express();

app.use(express.json());

const user = [
    { id: 1 , name: 'a'},
    { id: 2 , name: 'b'},
    { id: 3 , name: 'c'},
    { id: 4 , name: 'd'}
];
app.get('/',(req,res)=>{
    res.send('FOR CRUD part');
});

app.get('/api/user',(req,res)=>{
    res.send(user);
});


app.get('/api/user/:id',(req,res) =>{
    const users = user.find(c => c.id === parseInt(req.params.id));
    if (!users) res.status(404).send('NOT found');
    else res.send(users);
});

app.post('/api/user',(req,res) => {
    const {error} = validateuser(req.body);
    if( error) {
        res.status(400).send(error.details[0].message);
        return;
    }

    const users = {
        id: user.length +1,
        name: req.body.name
    };
    user.push(users);
    res.send(users);
});




app.listen(3000,() => console.log("Server running on port 3000"));
// app.post()
// app.put()
// app.delete()
// app.get('/', function (req, res) {
//     res.send('GET request to the homepage')
//   })

// exports.findAll = function(req, res) {
//     res.send([{name:'name1'}, {name:'name2'}, {name:'name3'}]);
// };
// exports.findById = function(req, res) {
//     res.send({id:req.params.id, name: "The Name", description: "description"});
// };

// app.listen(3000, () => {
//  console.log("Server running on port 3000");
// });