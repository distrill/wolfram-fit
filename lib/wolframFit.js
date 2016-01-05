var request = require('request');
var xmlParse = require('xml2js');

module.exports = function(wolframId, callback) {
    var input = encodeURIComponent(req.body.foodInput);
    var query =
        'http://api.wolframalpha.com/v2/query?appid=' + wolframId +
        '&input=' + input + '&format=plaintext';
    request(query, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            xmlParse.parseString(response.body, function(err, result) {
                if (err) {
                    callback(err);
                } else {
                    console.log('ONE');
                    var stringToSplit = result.queryresult.pod[1].subpod[0].plaintext[0];
                    // var stringToSplit = result[1].subpod[1].plaintext[0];
                    res.render('results', {
                        results: getNutritionValues(stringToSplit)
                    });
                    callback(null, getNutritionValues(stringToSplit));
                }
            });
        }
    });
}

function getNutritionValues(startingString) {
    var workingString;
    var result = {
        totalCalories: 'total calories',
        totalFat: 'total fat',
        saturatedFat: 'saturated fat',
        cholesterol: 'cholesterol',
        sodium: 'sodium',
        totalCarbohydrates: 'total carbohydrates',
        fiber: 'fiber',
        sugar: 'sugar',
        protein: 'protein'
    };
    for (var i in result) {
        result[i] = startingString.split(result[i])[1].split(' ')[2];
    }
    return result;
}
