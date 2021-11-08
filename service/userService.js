const User =                  require('../models/User')
const TokenService =          require('./tokenService')
const bcrypt =                require('bcrypt')

class UserService {

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email, password })

            if (!user) {
                return res.json([{ message: "No such user" }])
            }
            
            const accessToken = TokenService.createToken({email: user.email}) 

            await User.findOneAndUpdate(
            {token: user.token},
            {token: accessToken},
            (error, data) => {
                error ? console.log(error) : console.log(data)
            }
            ).clone()

            res.json([{
                'token': accessToken,
                'isAdmin': user.admin,
                }])


        } catch (err) {
            console.log(err)
            return res.json([{message: `Server Error`}])
        }
    }
    
    async register(req, res, next) {
        const {email, password} = req.body
        const candidate = await User.findOne({ email })
        if(candidate) {
            return res.json([{ message: "User alredy exist"}])
        }

        const user = new User({ email: email, password: password, admin: false, token: email })
        const accessToken = TokenService.createToken({email: email})

        await User.findOneAndUpdate(
            {token: user.email},
            {token: accessToken},
            (error, data) => {
                error ? console.log(error) : console.log(data)
            }
            ).clone()
        
        user.save()
            try {
                return res.json([{
                    'token': accessToken,
                    'isAdmin': false,
                }])

            } catch(e) {
                console.log(e)
                return res.json([{
                    message: 'Server register error'
                }])
            }
    }

}

module.exports = new UserService()


