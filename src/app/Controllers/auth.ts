import User from '../Models/User'
import Address from '../Models/Address'
import prhtml from '../views/emails/passwordRecovery'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const mailer = require('../../modules/mailer')
const authConfig = require('../../config/auth')

export default class AuthController {
    
    public generateToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 36000
        })
    }

    public async authenticate(req: any, res: any) {
        try {
            const { email, password } = req.body

            const user = await User.findOne({ email }).select(`+password`)

            if(!user)
                throw 'User not found!'

            //bcrypt.compare(password, user.password)
            if(!await bcrypt.compare(password, user.password))
                throw 'Invalid password!'

            user.password = undefined

            const address = await Address.findOne({userId: user._id})

            return res.json({
                user: { ...user._doc, address }, 
                token: this.generateToken({ id: user.id }) 
            })
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async forgotPassword(req: any, res: any) {
        const { email } = req.body

        try {
            const user = await User.findOne({ email }).select('+password')

            if(!user)
                throw 'User not found!'

            const token = crypto.randomBytes(20).toString('hex')
            
            const now = new Date();
            now.setHours(now.getHours()+1)

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now
                }
            })


            mailer.sendMail({
                to: user.email,
                from: 'AppName <noreply@someservice.com.br>',
                html: prhtml(token, user.name)

            }, (err) => {
                if (err)
                    throw 'Cannot send forgot password email'
            
                return res.json({status: 'OK!'})
            })

        } catch(e) {
            console.error(e)
            return res.status(400).send({ error: e })
        }
    }

    public async resetPassword(req: any, res: any) {
        const { email, token, password } = req.body

        try {
            const user = await User.findOne({ email }).select('+passwordResetToken passwordResetExpires')

            if(!user)
                throw 'User not found!'

            if(token !== user.passwordResetToken)
                throw 'Inválid token!'

            const now = new Date()

            if (now > user.passwordResetExpires)
                throw 'Token expired, generate a new one.'

            user.password = password

            await user.save()

            return res.send()

        } catch(e) {
            return res.status(400).send({ error: e })
        }
    }

}
