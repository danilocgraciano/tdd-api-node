const { User } = require('../models');

class SessionController {

    async store(req, res) {

        const { email, password } = req.body;

        const user = (email) ? await User.findOne({ where: { email } }) : null;

        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (!await user.checkPassword(password)) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        return res.status(200).json({
            user,
            token: user.generateToken()
        });

    }

}

module.exports = new SessionController();