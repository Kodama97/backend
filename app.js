var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var users = [
{
  id: 1,
  nome: 'Joao',
  cpf: '123.123.123-12',
  email: 'joao@email.com',
  telefone: '1111-1111', 
},
{
  id: 2, 
  nome: 'Antonio',
  cpf: '123.123.123-11',
  email: 'antonio@email.com',
  telefone: '2222-2222',
}
]

function searchById (id, retIndex=false) {
  var ret = null;
  users.forEach(function(element, idx, array) {
    if (id === element.id) {
      ret = retIndex ? idx : element;
    }
  });
  return ret;
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', function(req, res){
  return res.json(users);
});

app.get('/:id([0-9]+)', function (req, res) {
  result = searchById(parseInt(req.params.id, 10));
  if (result === null) {
    res.send("User not found");
    return;
  }
  res.json(result);
});

app.post('/:id([0-9]+)', function(req, res) {
  result = searchById(parseInt(req.params.id, 10));
  if (result !== null) {
    res.send("User already exists");
    return;
  }
  
  req.body.id = parseInt(req.params.id, 10);
  users.push(req.body);
  res.send("Creating user");
});

app.put('/:id([0-9]+)', function(req, res) {
  result = searchById(parseInt(req.params.id, 10), true);
  if (result === null) {
    res.send("User not found");
    return;
  }
  req.body.id = parseInt(req.params.id, 10);
  users[result] = req.body;
  res.send("User information updated");
});

app.delete('/:id([0-9]+)', function(req, res){
  result = searchById(parseInt(req.params.id, 10), true);
  if (result === null) {
    res.send("User not found");
    return;
  }
  users.splice(result, 1);
  res.send("Deleting user");
});

app.all('/', function (req, res) {
  res.send('Home');
});

app.all('*', function(req, res) {
  res.status(404).end("Not found");
});

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});

