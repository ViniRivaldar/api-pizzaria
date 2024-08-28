import dotenv from 'dotenv';
dotenv.config();

import admin from 'firebase-admin'

import serviceAccount from '../config/firebaseConfig.js'

const BUCKET = process.env.BUCKET

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: BUCKET
});

const bucket = admin.storage().bucket()

const uploadImage = (req,res,next)=>{
  if(!req.file) return

  const imagem = req.file
  const fileExtension= Date.now() + '.' + imagem.originalname.split().pop();
  const nomeDoArquivo = `${fileExtension}`;


  const file = bucket.file(nomeDoArquivo)

  const stream = file.createWriteStream({
    metadata:{
      contentType: imagem.mimetype
    },
  })

  stream.on('error',(e)=>{
    console.error(e)
  })

  stream.on('finish', async ()=>{

    await file.makePublic()

    req.file.filename = nomeDoArquivo;
    req.file.firebaseUrl = `https://firebasestorage.googleapis.com/v0/b${BUCKET}/o/${nomeDoArquivo}?alt=media&token=ea5325d6-c67c-4ab0-8ad7-6a54383974f1`;
    next()
  })

  stream.end(imagem.buffer)
}

export default uploadImage