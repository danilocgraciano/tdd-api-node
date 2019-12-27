const bcrypt = require('bcryptjs');

const { User } = require('../../src/app/models');
const truncate = require('../utils/truncate');

describe('User', () => {

    beforeEach(async () => {
        await truncate();
    });

    it('should encrypt user password', async () => {

        const user = await User.create(
            {
                name: 'Danilo',
                email: 'danilocgraciano@gmail.com',
                password: '123456'
            }
        );

        const compareHash = user.password_hash;
        expect(await bcrypt.compare('123456', compareHash)).toBe(true)

    });


});

