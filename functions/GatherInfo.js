const fs = require('fs')
const axios = require('axios')

/**
 * Three axios requests that create three json files including all of the available dresses. One for each product line.
 */
const GatherInfo = () => {
    axios.get("https://ms-cdn.maggiesottero.com/product/api/merchants/1/productlines/2/categories/709/products").then((res)=>{

        let data = [...res.data]
        let jsData = []
        for(let obj of data){
            if (obj["Name"]?.includes('(')) continue;

            jsData.push({
                "id" : `${obj?.ProductId}` || 'n/a',
                "title": obj?.Name?.toLowerCase()  || 'n/a',
                "link" : 'https://www.maggiesottero.com/maggie-sottero/' + obj?.Name?.toLowerCase().replace(' ', '-') + '/' + obj?.ProductId || 'n/a',
                "image_link": 'https://ms-cdn2.maggiesottero.com/' + obj.Images[0].PictureId + '/' + obj.Images[0].FileName || 'n/a',
                "description" : obj?.Description

            })
        }
        
        fs.writeFile("ActiveDresses/maggiesottero.klaviyo.json",JSON.stringify(jsData), "utf8", function(err){
            if(err){
                console.error("Write Maggie Error::",err)
                return;
            }

            console.log("Saved File: Maggie")
        })
        
    })


    axios.get("https://ms-cdn.maggiesottero.com/product/api/merchants/1/productlines/3/categories/709/products").then((res)=>{

        let data = [...res.data]
        let jsData = []
        for(let obj of data){
            if (obj["Name"]?.includes('(')) continue;

            jsData.push({
                "id" : `${obj?.ProductId}` || 'n/a',
                "title": obj?.Name?.toLowerCase()  || 'n/a',
                "link" : 'https://www.maggiesottero.com/sottero-and-midgely/' + obj?.Name?.toLowerCase().replace(' ', '-') + '/' + obj?.ProductId || 'n/a',
                "image_link": 'https://ms-cdn2.maggiesottero.com/' + obj.Images[0].PictureId + '/' + obj.Images[0].FileName || 'n/a',
                "description" : obj?.Description

            })
        }
        
        fs.writeFile("ActiveDresses/sottero-and-midgely.klaviyo.json",JSON.stringify(jsData), "utf8", function(err){
            if(err){
                console.error("Write Midgely Error::",err)
                return;
            }

            console.log("Saved File: Sottero and Midgley")
        })
    
    })


    axios.get("https://ms-cdn.maggiesottero.com/product/api/merchants/1/productlines/4/categories/709/products").then((res)=>{

        let data = [...res.data]
        let jsData = []
        for(let obj of data){
            if (obj["Name"]?.includes('(')) continue;

            jsData.push({
                "id" : `${obj?.ProductId}` || 'n/a',
                "title": obj?.Name?.toLowerCase()  || 'n/a',
                "link" : 'https://www.maggiesottero.com/rebecca-ingram/' + obj?.Name?.toLowerCase().replace(' ', '-') + '/' + obj?.ProductId || 'n/a',
                "image_link": 'https://ms-cdn2.maggiesottero.com/' + obj.Images[0].PictureId + '/' + obj.Images[0].FileName || 'n/a',
                "description" : obj?.Description

            })
        }
        
        fs.writeFile("ActiveDresses/rebecca-ingram.klaviyo.json",JSON.stringify(jsData), "utf8", function(err){
            if(err){
                console.error("Write Rebbeca Error::",err)
                return;
            }

            console.log("Saved File: Rebbeca Ingram")
        })
        
    })
}

module.exports = GatherInfo;

GatherInfo();



