let randomColor = require('randomcolor');
var msgs = [];

function indexView(req, res){
    if(req.cookies.name){
        res.redirect("/chat");
    } else {
        res.render("set_name");
    }
}

function indexSetView(req, res){
    if (req.body.name !== undefined && req.body.name.trim().length >= 3){
        res.cookie('name', req.body.name);
        res.cookie('msg_color', randomColor());
        res.redirect("/chat");
    } else if(req.cookies.name){
        res.redirect("/chat");
    } else {
        res.redirect("/");
    }
}

function chatView(req, res){
    if(req.cookies.name){
        res.render("chat", { msgs: msgs, "name": req.cookies.name });
    } else {
        res.redirect("/");
    }
}

function chatSetView(req, res){
    let msg = req.body.data;
    let name = req.cookies.name;
    let msg_color = req.cookies.msg_color;
    if (msg.trim().length >= 3){
        msgs.push([name, msg, msg_color]);
    }
    res.redirect("/chat");
}

function clearView(req, res){
    msgs = [];
    res.redirect("/");
}

function chatFrameView(req, res){
    if(req.cookies.name !== undefined){
        res.render("chat_frame", { msgs: msgs });
    } else {
        res.send("404 error");
    }
}

function profileView(req, res){
    if(req.cookies.name !== undefined){
        res.render("profile", { "color": req.cookies.msg_color, "name": req.cookies.name });
    } else {
        res.redirect("/");
    }
}

module.exports = { indexView: indexView, indexSetView: indexSetView, chatView: chatView, chatSetView: chatSetView, clearView: clearView, chatFrameView: chatFrameView, profileView: profileView }