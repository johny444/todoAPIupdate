var express = require('express');
var usermodel = require('../model/usermodel');
var router = express.Router();

// router.get('/users', (req, res) => {
//     modelUser.Userlist((err, user) => {
//         if (err) throw err;
//         let message = ""
//         if (user === undefined || user.length == 0) {
//             message = "user table is empty";
//         } else {
//             message = "Successfully";
//         }
//         return res.send({ error: true, data: user, message: message })
//     })


// })

router.get('/', (req, res, next) => {
    usermodel.userlist((err, user) => {
        if (err) {
            next(err);
        } else {
            return res.json({
                status: 200,
                data: user
            })
        }
    })
});
router.get('/iduser=:iduser', (req, res, next) => {
    usermodel.userlistbyid(req.params.iduser, (err, user) => {
        if (err) {
            next(err);
        } else {
            return res.json({
                status: 200,
                data: user
            })
        }
    })
});
router.get('/email=:email', (req, res, next) => {
    usermodel.userlistbyemail(req.params.email, (err, user) => {
        if (err) {
            next(err);
        } else {
            return res.json({
                status: 200,
                data: user
            })
        }
    })
});
router.post('/add', (req, res, next) => {

    if (req.body.iduser != "" || req.body.firstName != "" || req.body.lastName != "" || req.body.birthDay != "" || req.body.email != "" || req.body.password != "" || req.body.gender != "") {
        usermodel.adduser(req.body, (err, user) => {
            if (err) {
                next(err);
            } else {
                return res.json({
                    status: 200,
                    message: "ok"
                })
            }
        })

    } else {
        return res.status(400).json({
            status: 400,
            message: "bad request"
        })
    }

});
//delete by id
router.delete('/delete/iduser=:iduser', (req, res, next) => {
    usermodel.deleteuser(req.params.iduser, (err, user) => {
        if (err) {
            next(err);
        } else {
            return res.json({
                status: 200,
                message: "ok"
            })
        }
    })

});

router.put('/update/iduser=:iduser', (req, res, next) => {
    if (req.body.firstName && 
        req.body.lastName && 
        req.body.birthDay && 
        req.body.email && 
        req.body.password && 
        req.body.gender
        ) {
        try {         
            usermodel.updateuser({
                iduser: req.params.iduser,
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                birthDay:req.body.birthDay,
                email:req.body.email,
                password:req.body.password,
                gender:req.body.gender
               
            },(err, user) => {
                if(err){
                    next(err);
                }else{
                    return res.json({
                        status: 200,
                        message: "ok"
                    })
                }
            })
        }catch(error){
            next(error);
        } 
    }else{
        next(createError(400))
    }
});


module.exports = router;