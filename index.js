let { indexView, indexSetView, chatView, chatSetView, clearView, chatFrameView } = require('./routes/indexView')
let cookieParser = require('cookie-parser')
let express = require('express');
let uuid = require('uuid');
let app = express();
const port = 8080;

let secret = uuid.v4(); 
console.log(secret);

app.use("/assets", express.static("assets"));
app.use(cookieParser(secret));

app.set('view engine', 'pug');
app.use(express.urlencoded({ extended: true }));

app.get('/', indexView);
app.post('/', indexSetView);

app.get('/chat', chatView);
app.get('/chat_view', chatFrameView);
app.post('/chat', chatSetView);

app.get('/clear',  clearView);

app.listen(); //port