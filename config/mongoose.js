const mongoose = require('mongoose');

const connectWithDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('DB connected successfully');
  } catch (error) {
    console.error('DB connection failed');
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectWithDb;
