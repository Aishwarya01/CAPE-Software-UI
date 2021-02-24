const path = require("path");
const express = require("express");
const app = express();
// app.use(express.static(__dirname + '/lv-inspection-safety-ui'));
// app.get('/*', function(req,res){
// res.sendFile(path.join(__dirname, 'lv-inspection-safety-ui', 'index.html'))
// });
app.use(express.static('./dist/lv-inspection-safety-ui'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: 'dist/lv-inspection-safety-ui/'}),
);
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 4200);