const router = require("express").Router();
const Axios = require('axios');
// Matches with "/api/google/:id"

    
    router.route("/text-search")
        .post(function(req, res){
            console.log('get request made to /api/google/text-search');
            console.log(req.body)
            let getRequest = `https://maps.googleapis.com/maps/api/place/textsearch/json?key=AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ&location=${req.body.location[0]},${req.body.location[1]}&radius=2000&query=hotel+hostel+lodging`
            console.log(getRequest);
            Axios.get(getRequest)
            .then(response => {
                console.log(response.data.results);
                // res.json(response);
            })
            .catch(err => {
                console.log(err);
                res.json(err);
            })
            // res.json(req.body);
        })
        

module.exports = router;