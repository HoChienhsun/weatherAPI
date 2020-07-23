const config = require('config');
const client = process.env.client;
const username = config.get("username");
const password = config.get("password");

const users = [{ id: 1, 
				 username: username, 
				 password: password, 
				 firstName: 'Test', 
				 lastName: 'User' 
				}];

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}

module.exports = {
    authenticate,
};


