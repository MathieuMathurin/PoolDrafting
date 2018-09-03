import * as express from "express";
import * as cookieParser from "cookie-parser";
import * as bodyParser from "body-parser";
import * as logger from "morgan";

import { router } from "./controllers";
import { mongoClient } from "./mongoClient";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

app.use(router);

app.listen(80, () => console.log("Server started at port 80"));

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

app.on("end", () => {
    mongoClient.closeClient();
})