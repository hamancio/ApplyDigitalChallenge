import mongoose from 'mongoose';

export const testDbConnection = async () => {
  const url = 'mongodb://127.0.0.1:27017/news';

  await mongoose.connect(url, {});
};

export const closeDbConnection = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
};
