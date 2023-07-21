import { json } from 'body-parser';
import db from '../models/index';
import CRUDservice from '../services/CRUDservice';

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render('homepage.ejs', {
            data: JSON.stringify(data)
        })
    }
    catch (err) {
        console.log(err);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs')
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs')
}

// Them dữ liệu vào database
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);
    console.log('message', message);
    return res.send('post crud from server')
};

// Lấy tất cả cá bản ghi từ database
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    return res.render('displayCRUD.ejs', {
        dataTable: data
    })
};


// Lấy dữ liệu cần update
let getEditCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDservice.getuserInfoById(userId)
        // Check userData
        return res.render('editCRUD.ejs', {
            userData: userData
        });
    } else {
        return res.send('USER_NOT_AVAILABLE');
    }
};

// Update dư lieu
let putCRUD = async (req, res) => {
    let data = req.body
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render('displayCRUD.ejs', {
        dataTable: allUsers
    })
};

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}
