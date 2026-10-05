const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){

    const num1 = Number(req.body.num1);
    const num2 = Number(req.body.num2);
    console.log(num1,num2)
    const operation = req.body.operation;
    console.log(operation)


    let result;

    switch(operation){

        case "+":
            result = num1 + num2;
            break;

        case "-":
            result = num1 - num2;
            break;

        case "*":
            result = num1 * num2;
            break;

        case "/":
            if(num2 === 0){
                return res.send("<h1>Cannot divide by zero.</h1>");
            }
            result = num1 / num2;
            break;

        case "%":
            result = num1 % num2;
            break;

        default:
            result = "Invalid Operation";
    }

    res.send(`
    <html>

    <head>

    <style>

    body{
        background:#667eea;
        font-family:Arial;
        display:flex;
        justify-content:center;
        align-items:center;
        height:100vh;
    }

    .result{
        background:white;
        padding:40px;
        border-radius:15px;
        text-align:center;
        box-shadow:0 10px 25px rgba(0,0,0,.3);
    }

    h1{
        color:#333;
    }

    h2{
        margin:20px 0;
        color:#667eea;
    }

    a{
        text-decoration:none;
        background:#667eea;
        color:white;
        padding:10px 20px;
        border-radius:8px;
    }

    a:hover{
        background:#4d5ed6;
    }

    </style>

    </head>

    <body>

    <div class="result">

        <h1>Calculation Result</h1>

        <h2>${num1} ${operation} ${num2} = ${result}</h2>

        <a href="/">Calculate Again</a>

    </div>

    </body>

    </html>
    `);

});

app.listen(3000,function(){
    console.log("Server is running on Port 3000");
});