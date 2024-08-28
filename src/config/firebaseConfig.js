import dotenv from 'dotenv'
dotenv.config()

const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);

export default firebaseConfig