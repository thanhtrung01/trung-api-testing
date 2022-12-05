const config = require('../config/config');
const Admin = require('../models/Admin');

const CTRL = {};

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Đăng nhập tài khoản
CTRL.login = (req, res) => {
    Admin.findOne({
            $or: [{ email: req.body.email }, { phone: req.body.email }, { username: req.body.email }],
        },
        (err, admin) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err,
                });
            }

            if (!admin) {
                return res.status(404).json({
                    ok: false,
                    msg: 'phone/email/Password invalid!',
                });
            }

            if (!bcrypt.compareSync(req.body.password, admin.password)) {
                return res.status(404).json({
                    ok: false,
                    msg: 'phone/email/Password invalid!',
                });
            }

            let token = jwt.sign({ data: admin }, config.ACCESS_TOKEN_SECRET, {
                expiresIn: '2h',
            });

            return res.status(201).json({
                ok: true,
                admin,
                token,
            });
        },
    );
};

//Đăng ký tài khoản
CTRL.register = async(req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, 12);
    const newAdmin = new Admin({...req.body, password: passwordHash });
    const refresh_token = createAccessToken({ id: newAdmin._id });
    try {
        const savedAdmin = await newAdmin.save();
        res.status(200).json({ refresh_token });
    } catch (err) {
        console.log(err);
        res.status(500).json(err, {
            ok: false,
            msg: 'Passwords with letters and characters greater than 8!',
        });
    }
};


CTRL.logout = async(req, res) => {
    try {
        res.clearCookie('refreshtoken', {
            path: '/api/auth/refresh_token',
            httpOnly: true,
        });

        return res.status(200).json({
            msg: 'Logged out!',
        });
    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
};

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '10s',
    });
};

module.exports = CTRL;