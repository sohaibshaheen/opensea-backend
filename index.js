const express = require('express');
const app = express();
const port = 3000;

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

app.listen(port, () => {
  console.log(`App available on http://localhost:${port}`)
})