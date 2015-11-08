import express from 'express';

const app = express();

app.set('views', './dist');
app.engine('html', require('ejs').renderFile);

app.configure(function() {
  app.use(express.static(__dirname + '/dist'));
});

app.use((req,res) => {
  res.render('./index.html');
});
const port = 8080;
app.listen(port);


console.log('Express server started on port %s', port);
