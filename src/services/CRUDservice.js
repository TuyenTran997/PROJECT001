import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);


let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(data);
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create(
                {
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    firstName: data.firstname,
                    lastName: data.lastname,
                    address: data.address,
                    phoneNumber: data.phonenumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleid,
                }
            )
            resolve('ok create a new user success');
        } catch (error) {
            reject(error);
        }
    })
};

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);

        } catch (e) {
            reject(e);
        }
    })
}

let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (error) {
            reject(error);
        }
    })
};

let getuserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                raw: true,
            });
            if (user) {
                resolve(user);
            } else {
                resolve(null);
            }
        } catch (error) {
            reject(error);
        }
    });
};

let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let user = await db.User.findOne({
            //     where: { id: data.id }
            // })
            // let newuser = await db.User.update(data, {
            //     where: { id: user.id }
            // })

            // let allUsers = await db.User.findAll(data);
            // resolve(allUsers)

            let user = await db.User.findOne({
                where: { id: data.id }
            })
            if (user) {
                user.firstName = data.firstName;
                user.lastName = data.lastName;
                user.address = data.address;
                await user.save(user);
                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getuserInfoById: getuserInfoById,
    updateUserData: updateUserData
}
