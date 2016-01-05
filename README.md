# wolfram-fit  

Simple Wrapper for Wolfram|Alpha, focusing specificially on fitness and nutritional information. Pass getFitInfo some input that Wolphram|Alpha could understand (ex: '2 chicken breasts + 1 tbsp salsa + 1/2 medium onion + 2 tsp oil'), along with your wolfram appApi (instructions to get one here), and a callback to handle the result. Returns an object, result, with the following values: totalCalories, totalFat, saturatedFat, cholesterol, sodium, totalCarbohydrates, fiber, sugar, proten. See example usage.  


The following example is self conatained.  
```javascript
// server.js
var app = require('express')();
var http = require('http').Server(app);
var wolframFit = require('wolfram-fit');

app.get('/', function(req, res){
    wolframFit.getFitInfo(
        '2 chicken breasts + 1 tbsp salsa',
        <Your Wolphram|Alpha appId>,
        function(err, result) {
            if (err) {
                // handle error however you want
                console.log(err);
            } else {
                res.send(result);
            }
        }
    );
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

```  

running 'node server.js', and then navigating in your browser to 'http://localhost:3000' will load the following json on the page:  
```json
{
  "totalCalories":"747",
  "totalFat":"26",
  "saturatedFat":"7",
  "cholesterol":"324",
  "sodium":"1",
  "totalCarbohydrates":"10",
  "fiber":"743",
  "sugar":"1",
  "protein":"112"
}
```  

Have Fun :)
