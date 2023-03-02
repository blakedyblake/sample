const fs = require('fs');

/**
 * Runs after the GatherInfo function. Takes info from the three jsons for each product line, puts all the dresses in a single array 
 * and then writes it into JSON in the results folder
 */
const Synthesize = () =>{
    const combinedJsonData = [] 
    fs.readFile('ActiveDresses/maggiesottero.klaviyo.json', "utf8", function(err,data){
        if(err){
            console.error("READ MAGGIE ERROR::", err);
            return
        }
        combinedJsonData.push(...JSON.parse(data))

        fs.readFile('ActiveDresses/rebecca-ingram.klaviyo.json', "utf8", function(err,data){
            if(err){
                console.error("READ BECCA ERROR::", err);
                return
            }
            combinedJsonData.push(...JSON.parse(data))
        
            fs.readFile("ActiveDresses/sottero-and-midgely.klaviyo.json", "utf8", function(err,data){
                if(err){
                    console.error("READ SOTTERO AND MIDGELY ERROR::", err)
                    return
                }
                combinedJsonData.push(...JSON.parse(data))

                fs.writeFile('results/results.klaviyo.json',JSON.stringify(combinedJsonData),"utf8",function(err){
                    if(err){
                        console.error("WRITE FILE ERROR::", err)
                        return
                    }
                    console.error("Results File Written")
                })
            })
        })
    })
}

module.exports = Synthesize;

Synthesize()