# wolfram-fit  

Simple Wrapper for Wolfram|Alpha, focusing specifically on fitness and nutritional information. Pass getFitInfo some input that Wolphram|Alpha could understand (ex: '2 chicken breasts + 1 tbsp salsa + 1/2 medium onion + 2 tsp oil'), along with your wolfram appApi (instructions to get one here), and a callback to handle the result. The callback is passed an error followed by an object with the following values: totalCalories, totalFat, saturatedFat, cholesterol, sodium, totalCarbohydrates, fiber, sugar, protein. See example usage.  


The following example is self contained.  
```javascript
// server.js
const app = require('express')();
const http = require('http').Server(app);
const wolframFit = require('wolfram-fit');

app.get('/', (req, res) => {
  wolframFit.getFitInfo(
    '2 chicken breasts + 1 tbsp salsa',
    <Your Wolphram|Alpha appId>,
    (err, result) => {
      if (err) {
        // handle error however you want
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

http.listen(3000, () => {
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
