const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const dotenv = require('dotenv');

const app = express();

// Configuração de variáveis de ambiente
dotenv.config();

// Conexão com o banco de dados
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configuração de sessão
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));

// Configuração da view engine
app.set('view engine', 'ejs');

// Configuração de rotas estáticas
app.use(express.static('public'));

// Rotas
const authRoutes = require('./routes/authRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use('/auth', authRoutes);
app.use('/comments', commentRoutes);

// Rota principal
app.get('/', (req, res) => {
    res.redirect('/comments');
});

// Inicialização do servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
