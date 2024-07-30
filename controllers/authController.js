const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.getLogin = (req, res) => {
    res.render('login', { message: '' });
};

exports.postLogin = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
        return res.render('login', { message: 'Usuário não encontrado.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.render('login', { message: 'Senha incorreta.' });
    }

    req.session.user = user;
    res.redirect('/');
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/auth/login');
    });
};
