/* Render homepage */
const index = (req, res) => {
    res.render('index.ejs', { title: 'Zoo Systems' });
};

module.exports = {
    index
};