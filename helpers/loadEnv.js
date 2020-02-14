let load = () => {
  if (process.env.NODE_ENV === 'test') {
    require('dotenv').config({ path: './dotenv/test.env' });
  }
  else if (process.env.NODE_ENV === 'develop') {
    require('dotenv').config({ path: './dotenv/develop.env' });
  }
  else {
    require('dotenv').config({ path: './dotenv/prd.env' });
  }
}

module.exports.load = load;
