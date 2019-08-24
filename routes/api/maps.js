const router = require("express").Router();
const axios = require('axios');

// Matches with "/api/maps/textsearch/*"
router.route("/textsearch/:start/:end")
  .get(function(req, res){
    console.log(`get request made to /api/maps/textsearch/*`);
    axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=origin=${req.params.start}&destination=${req.params.end}&key=AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ`, { headers: { 'access-control-allow-origin': true } })
        .then(function(response){
            console.log('response data for api/maps/textsearch/*');
            // console.log(response.data);
            res.json(response.data);
        })
        .catch(err => {
            console.log(err);
        })
        //   console.log(res);
    });
    // Matches with "/api/maps/autocomplete/*"
    router.route('/autocomplete/:start/:end')
    .get(function(req, res){
        axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?locationbias=circle:2000@${req.params.start},${req.params.end}&radius=500&key=AIzaSyCiZ-jsILS_LD8OOFCvlybQvnvyjb1jtaQ`, { headers: { 'access-control-allow-origin': true } })
            .then(function(response){
                console.log('response data for api/maps/autocomplete/*');
                console.log(response.data);
                res.json(response.data);
            })
            .catch(err => {
                console.log(err);
            })
        console.log('get request made to api/maps/autocomplete/*');

    })

module.exports = router;