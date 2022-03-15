const bcrypt = require('bcryptjs');

const matchPassowrd = async function (candidatePassword, userPassword) {
    return (isMatch = await bcrypt.compare(candidatePassword, userPassword));
};

module.exports = {
    matchPassowrd
}