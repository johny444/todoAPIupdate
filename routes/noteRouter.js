var express = require('express');
var notemodel = require('../model/notemodel');
var router = express.Router();

// router.get('/notes', (req, res) => {
//     modelnote.notelist((err, note) => {
//         if (err) throw err;
//         let message = ""
//         if (note === undefined || note.length == 0) {
//             message = "note table is empty";
//         } else {
//             message = "Successfully";
//         }
//         return res.send({ error: true, data: note, message: message })
//     })


// })

router.get('/', (req, res, next) => {
    notemodel.notelist((err, note) => {
        if (err) {
            next(err);
        } else {
            return res.json({
                status: 200,
                data: note
            })
        }
    })
});
router.get('/id=:id', (req, res, next) => {
    notemodel.notelistbyid(req.params.id, (err, note) => {
        if (err) {
            next(err);
        } else {
            return res.json({
                status: 200,
                data: note
            })
        }
    })
});
router.get('/iduser=:iduser', (req, res, next) => {
    notemodel.listnoteByidUser(req.params.iduser, (err, note) => {
        if (err) {
            next(err);
        } else {
            return res.json({
                status: 200,
                data: note
            })
        }
    })
});
router.post('/add', (req, res, next) => {

    if (req.body.id != "" || req.body.created != "" || req.body.title != "" || req.body.content != "" || req.body.sendNotification != "" || req.body.remainder_time != ""||req.body.iduser != "") {
        notemodel.addnote(req.body, (err, note) => {
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
router.delete('/delete/id=:id', (req, res, next) => {
    notemodel.deletenote(req.params.id, (err, note) => {
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

router.put('/update/id=:id', (req, res, next) => {
    if (req.body.created &&
        req.body.title &&
        req.body.content &&
        req.body.sendNotification &&
        req.body.remainder_time &&
        req.body.iduser) {
        try {
            notemodel.updatenote({

                created: req.body.created,
                title: req.body.title,
                content: req.body.content,
                sendNotification: req.body.sendNotification,
                remainder_time: req.body.remainder_time,
                id: req.params.id,
                iduser:req.body.iduser

            }, (err, note) => {
                if (err) {
                    next(err);
                } else {
                    return res.json({
                        status: 200,
                        message: "ok"
                    })
                }
            })
        } catch (error) {
            next(error);
        }
    } else {
        next(createError(400))
    }
});


module.exports = router;