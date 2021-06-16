const express = require('express')
const mysql = require('mysql2');

const mysqlConfig = {
  host: "mysql_server",
  user: "root",
  password: "secret",
  database: "project"
}

let con =  null

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// respond with "hello world" when a GET request is made to the homepage
app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/connect', function (req, res) {
  con =  mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
    res.send('connected')
  });
})

app.get('/create-table', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    const sql = `
    CREATE TABLE IF NOT EXISTS numbers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      number INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )  ENGINE=INNODB;
  `;
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send("numbers table created");
    });
  });
})

app.get('/insert', function (req, res) {
  const number = Math.round(Math.random() * 100)
  con.connect(function(err) {
    if (err) throw err;
    const sql = `INSERT INTO numbers (number) VALUES (${number})`
    con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(`${number} inserted into table`)
    });
  })
})

app.get('/fetch', function (req, res) {
  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM numbers`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})

app.get('/student/all', function (req, res) {
  con = mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
  });
  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM STUDENT`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})

app.get('/teacher/all', function (req, res) {
  con = mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
  });
  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM TEACHER`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})

app.get('/course/all', function (req, res) {
  con = mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
  });
  con.connect(function(err) {
    if (err) throw err;
    const sql = `SELECT * FROM COURSE`
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})



app.post('/course/add', function (req, res) {
  
  let ID = req.body.ID;
  let NAME = req.body.NAME;
  
  con = mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
  });
  con.connect(function(err) {
    if (err) throw err;
    const sql = `INSERT INTO COURSE(ID,NAME) VALUES (` + "'" + ID + "'" + `, `+ "'" + NAME + "'" + `);`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})


app.post('/student/signup', function (req, res) {
  
  let NAME = req.body.NAME;
  let DOB = req.body.DOB;
  let ADDRESS = req.body.ADDRESS;
  let PASSWORD = req.body.PASSWORD;
  let PHONENUMBER = req.body.PHONENUMBER;
  let EMAIL = req.body.EMAIL;
  
  con = mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
  });
  con.connect(function(err) {
    if (err) throw err;
    const sql = `INSERT INTO STUDENT(NAME,DOB,ADDRESS,PASSWORD,PHONENUMBER,EMAIL) VALUES (` + "'" + NAME + "'" + `, `+ "'" + DOB + "'" + `, `+ "'" + ADDRESS + "'" + `, `+ "'" + PASSWORD + "'" + `, `+ "'" + PHONENUMBER + "'" + `, `+ "'" + EMAIL + "'" + `);`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})


app.post('/teacher/signup', function (req, res) {
  
  let NAME = req.body.NAME;
  let DOB = req.body.DOB;
  let ADDRESS = req.body.ADDRESS;
  let PASSWORD = req.body.PASSWORD;
  let PHONENUMBER = req.body.PHONENUMBER;
  let EMAIL = req.body.EMAIL;
  
  con = mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
  });
  con.connect(function(err) {
    if (err) throw err;
    const sql = `INSERT INTO TEACHER(NAME,DOB,ADDRESS,PASSWORD,PHONENUMBER,EMAIL) VALUES (` + "'" + NAME + "'" + `, `+ "'" + DOB + "'" + `, `+ "'" + ADDRESS + "'" + `, `+ "'" + PASSWORD + "'" + `, `+ "'" + PHONENUMBER + "'" + `, `+ "'" + EMAIL + "'" + `);`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      res.send(JSON.stringify(result))
    });
  });
})


app.post('/student/login', function (req, res) {
  
  let EMAIL = req.body.EMAIL;
  let PASSWORD = req.body.PASSWORD;
  
  con = mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
  });
  con.connect(function(err) {
    if (err) throw err;
    const sql = `Select * FROM STUDENT WHERE EMAIL like ` + "'" + EMAIL + "'" + ` and PASSWORD like `+ "'" + PASSWORD + "'" + `;`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      if(result[0] == undefined)
      {
        res.send(JSON.stringify({"status":"-1"}))
      }
      else
      {
        res.send(JSON.stringify({"status":"1"}))
      }
      
    });
  });
})


app.post('/teacher/login', function (req, res) {
  
  let EMAIL = req.body.EMAIL;
  let PASSWORD = req.body.PASSWORD;
  
  con = mysql.createConnection(mysqlConfig);
  con.connect(function(err) {
    if (err) throw err;
  });
  con.connect(function(err) {
    if (err) throw err;
    const sql = `Select * FROM TEACHER WHERE EMAIL like ` + "'" + EMAIL + "'" + ` and PASSWORD like `+ "'" + PASSWORD + "'" + `;`;
    console.log(sql);
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      console.log(result);
      if(result[0] == undefined)
      {
        res.send(JSON.stringify({"status":"-1"}))
      }
      else
      {
        res.send(JSON.stringify({"status":"1"}))
      }
      
    });
  });
})





app.listen(3000)

console.log("listening on port 3000")

