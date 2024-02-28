const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const axios = require('axios');
const i18n = require('i18n');

const adminRoutes = require('./routes/admin');
const User = require('./models/user');
const Item = require('./models/item');
const Quiz = require('./models/quiz');
const adminAuth = require('./routes/adminAuth');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const bonusRouter = require('./routes/bonus');

const port = 3000;

// MongoDB connection
mongoose.connect('mongodb+srv://practice:Ansar123@cluster0.eotba7o.mongodb.net/ConsoleRental?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Configure i18n
i18n.configure({
  locales: ['ru', 'kz', 'ja'],
  defaultLocale: 'en',
  directory: __dirname + '/locales',
  cookie: 'lang'
});

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ 
  secret: 'rejimvdfmvdimscwe123',
  resave: false,
  saveUninitialized: false
})); 
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Routes setup
const loginRouter = require('./routes/login');
const registerRouter = require('./routes/register');
app.use(i18n.init);
app.use('/login', loginRouter);
app.use('/register', registerRouter);
app.use('/admin', adminAuth); 
app.use('/admin', adminRoutes);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/bonus', bonusRouter);

// Language switch route
app.post('/setLanguage', function(req, res) {
  var selectedLanguage = req.body.language;
  req.session.language = selectedLanguage;
  res.sendStatus(200);
});

// Function to search videos
async function searchVideos(keyword) {       
  const API_URL = 'https://www.googleapis.com/youtube/v3/search';
  const youTubeAPI = 'AIzaSyDIcyq7D-vsf4_rPxnuGiZUDwtk4pKxTSc'; // YouTube API key

  const url = new URL(API_URL);
  url.searchParams.append('part', 'snippet');
  url.searchParams.append('q', keyword);
  url.searchParams.append('maxResults', 4); 
  url.searchParams.append('key', youTubeAPI);

  try {
      const response = await axios.get(url.toString());
      const videos = response.data.items.map(video => ({
          videoId: video.id.videoId,
          title: video.snippet.title,
          thumbnail: video.snippet.thumbnails.default.url,
          videoUrl: `https://www.youtube.com/watch?v=${video.id.videoId}`
      }));
      return videos;
  } catch (error) {
      console.error('Error fetching videos:', error);
      return []; 
  }
}

// Route to render the News into the main page
app.get('/main', async (req, res) => {
  try {
      const url = 'https://newsapi.org/v2/everything?' +
          'q=Nintendo&Xbox&PlayStation&Console&Games&Realese' +     // News and YouTube API realization's
          'from=2024-02-26&' +
          'sortBy=popularity&' +
          'apiKey=6173012026564199bb1d7f51be715ebf';  // News API key

      const response = await axios.get(url);
      const gameNews = response.data.articles.slice(0, 12); 

      const videos = await searchVideos(['PlayStation 4 and 5 review', 'Xbox review', 'Nintendo review']);

      res.render('main', { gameNews, videos });
  } catch (error) {
      console.error('Error fetching game news:', error);
      res.render('main', { gameNews: [], videos: [] });
  }
});

// Route to render the admin panel
app.get('/admin', async (req, res) => {
  try {
      const items = await Item.find({}); 
      res.render('adminpanel', { items });
  } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).send('Internal Server Error');
  }
});

// Route to redirect to main page if user is logged in, otherwise redirect to login page
app.get('/', (req, res) => {
  if (req.session && req.session.user) {
      res.redirect('/main'); 
  } else {
      res.redirect('/login');
  }
});

app.get('/main/admin', (req, res) => {
  res.render('admin-login');
});

app.get('/login/admin', (req, res) => {
  res.render('admin-login');
});

app.get('/admin', async (req, res) => {
  try {
    // Fetch items from the database
    const items = await Item.find({});
    // Render the admin panel template with the items data
    res.render('adminpanel', { item: item });
  } catch (error) {
    // Handle errors
    console.error('Error fetching items:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

