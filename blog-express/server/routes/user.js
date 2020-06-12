const express = require('express');
const router = express.Router();
const {userLogin} = require('../controller/user');
const {SuccModel, ErrorModel} = require('../model/resModel');

router.post('/login', (req, res, next) => {
    const {username, password} = req.body;
    const result = userLogin(username, password);
    return result.then(data => {
        if(data.username == username) {
            req.session.username = data.username;
            req.session.password = data.password;
            res.json(new SuccModel(data))
            return;
        };
        res.json(new ErrorModel('登录失败'))
    })
    // res.json({
    //     code: 1,
    //     data: {
    //         ...req.body
    //     }
    // })
})

module.exports = router;