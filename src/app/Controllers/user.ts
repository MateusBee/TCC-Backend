import User from '../Models/User'
import Address from '../Models/Address'

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const authConfig = require('../../config/auth')

export default class UserController {

    public formatType(s) {
        const type = {
            1: "Médico",
            2: "Profissional da Área",
            3: "Familiar",
            4: "Administrador",
            5: "Superusuário"
          };
      
          return type[s];
    }
    
    public generateToken(params = {}) {
        return jwt.sign(params, authConfig.secret, {
            expiresIn: 36000
        })
    }

    public async getAll(req: any, res: any) {
        try {
            const users = await User.find()

            const data = users.map((user) => ({ ...user._doc, type: this.formatType(user.type) }))

            for(let d of data) {
                let address = await Address.findOne({userId: d._id})
                data[data.indexOf(d)] = { ...d, address }
            }

            return res.json({ data })

        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }
    
    public async createUser(req: any, res: any) {
        try {
            const address = req.body.address
            const info = req.body
            delete info.address

            let user = await User.create(info)
            let ad = await Address.create({ userId: user.id, ...address })
            user.password = undefined

            return res.json({
                user,
                address: ad, 
                token: this.generateToken({ id: user.id }) 
            })
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async updateUser(req: any, res: any) {
        try {

            const address = req.body.address
            const info = req.body
            delete info.address

            await User.updateOne({_id: req.params.id}, info)
            await Address.updateOne({_id: address._id}, address)

            let user = await User.findOne({_id: req.params.id})
            let ad = await Address.findOne({_id: address._id})

            return res.json({ user: { ...user._doc, address: ad }})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async deleteUser(req: any, res: any) {
        try {
            await User.deleteOne({_id: req.params.id})
            await Address.deleteOne({userId: req.params.id})

            return res.json({success: true})
        } catch(e) {
            console.log(e)
            return res.status(400).send({error: e})
        }
    }

    public async resetPassword(req: any, res: any) {
        const { _id, current, password } = req.body

        try {
            const user = await User.findOne({ _id }).select('+password')

            if(!await bcrypt.compare(current, user.password))
                return res.status(400).send({ error: 'Senha atual incorreta' })

            user.password = password

            await user.save()

            return res.send()

        } catch(e) {
            return res.status(400).send({ error: e })
        }
    }

}
