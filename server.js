const express = require('express')
const cors = require('cors')
const axios = require('axios')

const app = express()

app.use(express.static("public"));//Without this deployment doesn't work
app.use(express.json())//Without this post requests don't work
app.use(cors())

app.get('/ProductData', (req, res)=>{
    console.log("I am here")
    axios.get("https://ms-cdn.maggiesottero.com/product/api/merchants/1/productlines/3/categories/709/products").then(data =>{
        let midgely = data.data
        for(let dress of midgely){
          dress["weblink"] = 'https://www.maggiesottero.com/sottero-and-midgely/' + dress?.Name?.toLowerCase().replace(' ', '-') + '/' + dress?.ProductId || 'n/a';
          dress["MainImageLink"] = 'https://ms-cdn2.maggiesottero.com/' + dress?.Images[0].PictureId + '/' + dress?.Images[0].FileName || 'n/a'
        }
  
  
        axios.get("https://ms-cdn.maggiesottero.com/product/api/merchants/1/productlines/2/categories/709/products").then(data =>{
          let maggie = data.data;
          for(let dress of maggie){
            dress["weblink"] = 'https://www.maggiesottero.com/sottero-and-midgely/' + dress?.Name?.toLowerCase().replace(' ', '-') + '/' + dress?.ProductId || 'n/a';
            dress["MainImageLink"] = 'https://ms-cdn2.maggiesottero.com/' + dress?.Images[0].PictureId + '/' + dress?.Images[0].FileName || 'n/a'
          }
  
          axios.get("https://ms-cdn.maggiesottero.com/product/api/merchants/1/productlines/4/categories/709/products").then(data => {
            let becca = data.data;
            for(let dress of becca){
              dress["weblink"] = 'https://www.maggiesottero.com/sottero-and-midgely/' + dress?.Name?.toLowerCase().replace(' ', '-') + '/' + dress?.ProductId || 'n/a';
              dress["MainImageLink"] = 'https://ms-cdn2.maggiesottero.com/' + dress?.Images[0].PictureId + '/' + dress?.Images[0].FileName || 'n/a'
            }
  
            let allDresses = JSON.stringify([...maggie, ...midgely, ...becca])
  
            res.status(200).send(allDresses)
            console.log("Sent!")
  
          }).catch(e=>{console.error("Becca Server Error") })
        }).catch(e=>{console.error("Maggie Server Error")})
      }).catch(e=>{console.error("Midgely Server Error")})
})

// const port = 5000;
// app.listen(process.env.PORT || port, function() {
//   console.log("Listening on " + port);
// });

module.exports = app