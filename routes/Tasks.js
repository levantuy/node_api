var express = require('express');
var router = express.Router();
var Task = require('../models/Task');

router.get('/:id?', function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

    if (req.params.id) {

        Task.getTaskById(req.params.id, function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }
        });
    }
    else {

        Task.getAllTasks(function (err, rows) {

            if (err) {
                res.json(err);
            }
            else {
                res.json(rows);
            }

        });
    }
});

router.get('/search/:searchText?', function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
      
    Task.searchTasks(req.params.searchText, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }

    });
});

router.post('/', function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    Task.addTask(req.body, function (err, rows) {

        //console.log(req.body);
        if (err) {
            res.json(err);
        }
        else {
            Task.getAllTasks(function (err, rows) {

                if (err) {
                    res.json(err);
                }
                else {
                    res.json(rows);
                }
            });
        }
    });
});

router.post('/:id', function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    Task.deleteAll(req.body, function (err, count) {
        if (err) {
            res.json(err);
        }
        else {
            Task.getAllTasks(function (err, rows) {

                if (err) {
                    res.json(err);
                }
                else {
                    res.json(rows);
                }
            });
        }
    });
});

router.delete('/:id', function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    Task.deleteTask(req.params.id, function (err, count) {

        if (err) {
            res.json(err);
        }
        else {
            Task.getAllTasks(function (err, rows) {

                if (err) {
                    res.json(err);
                }
                else {
                    res.json(rows);
                }
            });
        }

    });
});
router.put('/:id', function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    Task.updateTask(req.params.id, req.body, function (err, rows) {

        if (err) {
            res.json(err);
        }
        else {
            Task.getAllTasks(function (err, rows) {

                if (err) {
                    res.json(err);
                }
                else {
                    res.json(rows);
                }
            });
        }
    });
});
module.exports = router;