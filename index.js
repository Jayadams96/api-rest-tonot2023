import 'dotenv/config';
import proxy from 'express-http-proxy';
import connectDB from './database/connectdb.js';
import express from 'express';
import serveStatic from 'serve-static';
import authRouter from './routes/auth.route.js';
import morgan from 'morgan';

const app = express();

// Llamar a la función connectDB para establecer la conexión a la base de datos
connectDB();

// Configurar el middleware para servir archivos estáticos en la carpeta public
//app.use(serveStatic(path.join(__dirname, 'public')));

// Configurar proxy inverso
//app.use('/other-routes', proxy('http://localhost:4000'));

// Manejar solicitudes a rutas que no comienzan con /api
app.get('*', (req, res) => {
  res.send('Página no encontrada')
})

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api/v1', authRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
