import mysql from 'mysql';
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "nodemcu_rfid_iot_projects"
});
export default connection;