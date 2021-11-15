const User =                  require('../models/User')
const TokenService =          require('./tokenService')
const bcrypt =                require('bcrypt')

class UserService {

    async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })

            if (!user) {
                return res.json([{ message: "No such user" }])
            }

            const exist = await bcrypt.compare(password, user.password)
            
            if (!exist) {
                return res.json([{ message: "Wrong password" }])
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
                'userName': user.userName,
                'avatar': user.avatar,
                }])


        } catch (err) {
            console.log(err)
            return res.json([{message: `Server Error`}])
        }
    }
    
    async register(req, res, next) {
        const {email, password, userName} = req.body

        let candidate = await User.findOne({ email })
        if(candidate) {
            return res.json([{ message: "Email alredy taken"}])
        }

        candidate = await User.findOne({ userName })
        if(candidate) {
            return res.json([{ message: "Username alredy taken"}])
        }

        const hashedPassword = await bcrypt.hash(password, 15);
        const user = new User({ email: email, password: hashedPassword, userName: userName, admin: false, token: email })
        const accessToken = TokenService.createToken({ email: email, userName: userName })

        await user.save()

        await User.findOneAndUpdate(
            {token: user.email},
            {token: accessToken},
            (error, data) => {
                error ? console.log(error) : null
            }
            ).clone()

            try {
                res.json([{
                    'token': accessToken,
                    'isAdmin': false,
                    'userName': userName,
                    'avatar' : user.avatar,
                }])
                
                return 

            } catch(e) {
                console.log(e)
                return res.json([{
                    message: 'Server register error'
                }])
            }
    }

}

module.exports = new UserService()


