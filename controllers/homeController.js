const homeController = {
  getHomePage: (req, res) => {
    // Handle logic for rendering the home page
    res.render('home');
  },
  getAboutPage: (req, res) => {
    // Handle logic for rendering the about page
    res.render('about');
  },
};

module.exports = homeController;
