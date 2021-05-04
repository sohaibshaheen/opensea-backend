const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// for public statis assets
app.use(express.static('public'));

var CONTRACT_URI_METADATA = {
    'opensea-contract' : {
        'name': 'OpenSea Tokens',
        'description': 'Contract for digital assets by Prodjex',
        'image': 'https://opensea-backend.herokuapp.com/image.jpg',
        'external_link': 'https://opensea-backend.herokuapp.com/contract/opensea-contract'
    }
}

var tokens = {

    "1" : {
        "attributes": [
            
        ], 
        "description": "An abstract art with vibrant colors.", 
        "external_url": "https://openseacreatures.io/1", 
        "image": "https://opensea-backend.herokuapp.com/image.jpg", 
        "name": "Abstract Art"
    }, 
    "47978646695289612174056606218506541902791328951680007862046416307782250659841" : {
        "attributes": [
            
        ], 
        "description": "Advertisement from random site", 
        "external_url": "https://openseacreatures.io/2", 
        "image": "https://lh3.googleusercontent.com/yff3UzWPp1hM7HNJ0QHTpRRMbSewsXT33KPzGJqgdhFWYj1eluDZQ8RLVhXKUiiAKahWOjmEDUL5pOPKsB0dFdw3P0t65a0ftfZj=s0", 
        "name": "Hire. Absolutely Free"
    }


}

app.get('/', (req, res) => {
  res.send('Welcome to Opensea API for minting creatures.')
})

// for individual tokens
app.get('/api/:tokenId', function (req, res) {
    
    const token_id =    req.params.tokenId;
    if( typeof tokens[token_id] !== 'undefined' ){

        res.json(tokens[token_id]);

    }else{

        // not found
        res.json({ "error": "404 Not Found: Resource not found" })

    }

})

// for contracts
app.get('/contract/:contract_name', function (req, res) {

    // check if contract name exists
    const contract_name = req.params.contract_name;
    if( typeof CONTRACT_URI_METADATA[contract_name] !== 'undefined' ){

        res.json(CONTRACT_URI_METADATA[contract_name]);

    }else{

        // not found
        res.json({ "error": "404 Not Found: Resource not found" })

    }
    
    //res.send(req.params);
})

app.listen(PORT, () => {
  console.log(`App available on http://localhost:${PORT}`)
})