import { Router } from "express";

export const router = Router();

router.post("/poolers/:name", function (req, res, next) {
    var data = { name: req.params.name, players: [] };
    var option = {
        method: 'POST',
        uri: "http://localhost:9200/poolers/user",
        body: data,
        json: true
    }
    // request.post(option).then(function (data) {
    //     var userModel = {
    //         id: data._id,
    //         user: {
    //             name: req.params.name,
    //             players: []
    //         }
    //     }
    //     res.jsonp(userModel);
    // }).catch(function (err) {
    //     console.log(err);
    // });
});