import express from 'express';
import connection from './database.js'

const router = express.Router();

// router.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods", "GET, POST,DELETE");
//     next();
// });
router.get('/UserData', function (req, res) {
    connection.query("SELECT * FROM table_the_iot_projects ORDER BY name ASC", function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});
router.post('/UserData', function (req, res) {
    const body = req.body;
    connection.query(`UPDATE table_the_iot_projects SET name= "${body.name}", email="${body.email}", gender="${body.gender}", mobile=${body.mobile} WHERE id=${body.id}`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);

    });
});

router.delete('/UserData', function (req, res) {
    connection.query(`DELETE FROM table_the_iot_projects  WHERE id = ${req.body.id}`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/Registration', function (req, res) {
    const body = req.body;
    let sql = `INSERT IGNORE INTO table_the_iot_projects (name,id,gender,email,mobile) values("${body.name}", ${body.id}, "${body.gender}",  "${body.email}", ${body.mobile})`;
    connection.query(sql, function (err, results) {
        if (err) throw err;
        res.send(results);
    });
});

router.get('/AllAttendanceLog', function (req, res) {

    connection.query(`SELECT * FROM attendance_log INNER JOIN table_the_iot_projects ON attendance_log.id=table_the_iot_projects.id ORDER BY attendance_log.date DESC`, function (err, result, fields) {
        if (err) throw err;
        res.send(result);
    });
});

router.post('/ReadTagID', function (req, res) {

    connection.query(`INSERT IGNORE INTO attendance_log (date,id) values(NOW(), ${req.body.id})`, function (err, result, fields) {
        if (err) throw err;
    });

    connection.query(`SELECT MAX(attendance_log.date) AS date,  table_the_iot_projects.name, table_the_iot_projects.id, table_the_iot_projects.gender, table_the_iot_projects.email, table_the_iot_projects.mobile FROM table_the_iot_projects INNER JOIN attendance_log ON attendance_log.id=table_the_iot_projects.id  WHERE table_the_iot_projects.id=${req.body.id}`, function (err, result, fields) {
        if (err) throw err;
        res.send(result[0]);
    });
});

export default router;  