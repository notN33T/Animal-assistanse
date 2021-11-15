const jwt =                   require('jsonwebtoken')

class TokenService {
    
    createToken(data) {
        try {
            const token = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {expiresIn: '24h'})
            return token
            
        } catch(err) {
            console.log(err)
        }

    }
    
    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        } catch (e) {
            return null;
        }
    }
    
}

module.exports = new TokenService()