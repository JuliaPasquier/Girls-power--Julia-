const express = require('express')
const app = express()
const PORT = 3000
app.get('/home', (req, res) =>{
    res.status(200).jsoon('welcome, your app is working well');
})
app.listen(PORT, ()=>{
    console.log(`server running at http://localhost:${PORT}`);
});

module.exports = app