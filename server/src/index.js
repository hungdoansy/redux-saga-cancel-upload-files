import express from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/static', express.static('public'));

// Add headers
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE',
  );

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', '*');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');

  // Pass to next layer of middleware
  next();
});

app.use(fileUpload());

// --------------------------------------------------------------------------------------------------------------
app.get('/', (req, res) => {
  return res.status(200).json({ msg: 'OK' });
})

// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  console.log(req.files);

  // Long enough to be cancellable
  const time = 10000 + Math.round(Math.random() * 5) * 1000;
  
  setTimeout(() => {
    res.status(200).json({
      msg: "Uploaded"
    });
  }, time);
});


app.listen(9001, () => console.log('Server Started...'));
