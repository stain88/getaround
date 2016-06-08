var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/getaround';
module.exports = {
  'secret': process.env.GETAROUND_SECRET_KEY,
  'database': mongoURI
}