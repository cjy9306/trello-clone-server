const Sequelize = require('sequelize');
const models = require('../../models/models');
const MemberModel = models.Members;
const BoardModel = models.Board;
const TeamModel = models.Team;
const jwt = require('jsonwebtoken')


const generateCode = (number) => {
    const digits = '0123456789'; 
    let code = ''; 
    for (let i = 0; i < number; i++ ) { 
        code += digits[Math.floor(Math.random() * 10)]; 
    } 
    return code; 
} 

class AuthService {
    register = async (memberDTO) => {
        const verify_code = generateCode(6);

        try {
            const check = await models.Members.findOne({
                where: {
                    username: memberDTO.username
                }
            });

            if (check) throw new Error('The username already exists')

            const member = models.Members.create({
                id: 0,
                username: memberDTO.username,
                password: memberDTO.password,
                first_name: memberDTO.first_name,
                last_name: memberDTO.last_name,
                birth_day: memberDTO.birth_day,
                gender: memberDTO.gender,
                email: memberDTO.email,
                phone: memberDTO.phone,
                email_verification: false,
                verify_code: verify_code,
            });

            // const sendVerifyEmail = async (result) => {
            //     const smtpTransport = nodemailer.createTransport(smtpTransporter({
            //         service: 'Gmail',
            //         host: 'smtp.gmail.com',
            //         auth: {
            //             user: 'richson9306@gmail.com',
            //             pass: '!@diclfn12'
            //         }
            //     }));
        
            //     var mailOpt = {
            //         from: 'richson9306@gmail.com',
            //         to: body.email,
            //         subject: 'verification code',
            //         html: 'Verification Code : ' + verify_code,
            //     }
        
            //     const p = smtpTransport.sendMail(mailOpt);
        
            //     smtpTransport.close();
            //     return p;
            // }

            return { member };
        } catch(e) {
            throw e;
        }
    };

    login = async (userDTO, secret_key) => {
        
        try {
            const member = await models.Members.findOne({
                where: {
                    username: userDTO.username,
                    password: userDTO.password,
                }
            });

            if (!member) throw new Error('Username or password is invalid.');
            const token = jwt.sign(
                {
                    id: member.member_id,
                    username: member.username,
                },
                secret_key,
                {
                    expiresIn:'1d'
                }
            );
                console.log(token)
            return { token, member_id: member.member_id, username: member.username };
        } catch(e) {
            console.log('error ;' + JSON.stringify(e))
            throw e;
        }
    };


};

module.exports = new AuthService();