var bodyparser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://admin:admin@ds135532.mlab.com:35532/todolist');
var http = require('http')

// Create Schema
var todoschema = new mongoose.Schema({
  item: String
});

// Create Model
var TodoModel = mongoose.model("Todo", todoschema);
var urlencodedparser = bodyparser.urlencoded({ extended: false}); // ??


module.exports = function(app) {

app.get('/todo', function(request, response) {
  // Get todos from MongoDB
  TodoModel.find({}, function(error, data) {
    if(error) throw error

    response.render("todo", {todos: data});
  });
});

app.get('/weather', function(request, response) {
  // Get info from weatherstack API
  let url = "http://api.weatherstack.com/current?access_key=a19d3cd9a18dc6918653d1722b780500&query=Chicago"

  var req = http.get(url, (res) => {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    var bodyChunks = [];
    res.on('data', function(chunk) {
      bodyChunks.push(chunk);
    }).on('end', function() {
      var body = Buffer.concat(bodyChunks);
      console.log('BODY: ' + body);
      response.json(body);
    })
  });
});

app.post('/todo', urlencodedparser, function(request, response) {
  // Insert todo into MongoDB
  var newTodo = TodoModel(request.body).save(function(error, data){
    if(error) throw error

    response.json(data);
  });
});

app.delete('/todo/:item', function(request, response) {
  // Delete todo from MongoDB
  TodoModel.find({item: request.params.item.replace(/\-/g, ' ')}).remove(function(error, data) {
    if(error) throw error

    response.json(data);
  });

  // In Memory
  // data = data.filter(function(todo) {
  //   return todo.item.replace(/ /g, '-') !== request.params.item;
  // });
  //
  // response.json(data); // ?
});

};
