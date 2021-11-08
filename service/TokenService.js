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
}

module.exports = new TokenService()