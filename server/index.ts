import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as logger from "morgan";
import * as path from "path";
import * as http from "http";
import * as https from "https";
import * as fs from "fs";

import { router } from "./controllers";
import { mongoClient } from "./mongoClient";
import { authTokenMiddleware } from "./middlewares";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));
app.use(authTokenMiddleware);

app.use(router);

const frontendRoot = "../angular-new/dist/pool-draft/";
app.use(express.static(path.join(__dirname, frontendRoot)));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, `${frontendRoot}index.html`));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    res.status(404).send();
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// app.set('view engine', 'html');

app.on("end", () => {
    mongoClient.closeClient();
})

if(process.env.CERTPATH && process.env.CERTPASSWORD) {
    https.createServer({
        pfx: fs.readFileSync(process.env.CERTPATH),
        passphrase: process.env.CERTPASSWORD
    }, app).listen(443)
} else {
    http.createServer(app).listen(process.env.PORT || 80);
}