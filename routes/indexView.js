let randomColor = require('randomcolor');
var msgs = [];

function indexView(req, res){
    if(req.cookies.name){
        res.redirect("/chat");
    } else {
        res.render("set_name");
        console.log(req.cookies);
    }
}

function indexSetView(req, res){
    if(req.cookies.name){
        res.redirect("/chat");
    } else {
        res.cookie('name', req.body.name);
        res.cookie('msg_color', randomColor());
        res.redirect("/chat");
    }
}

function chatView(req, res){
    if(req.cookies.name){
        res.render("chat", { msgs: msgs });
    } else {
        res.redirect("/");
    }
}

function chatSetView(req, res){
    let msg = req.body.data;
    let name = req.cookies.name;
    let msg_color = req.cookies.msg_color;
    msgs.push([name, msg, msg_color]);
    res.redirect("/chat");
}

function clearView(req, res){
    msgs = [];
    res.redirect("/");
}

function chatFrameView(req, res){
    res.render("chat_frame", { msgs: msgs });
}

module.exports = { indexView: indexView, indexSetView: indexSetView, chatView: chatView, chatSetView: chatSetView, clearView: clearView, chatFrameView: chatFrameView }