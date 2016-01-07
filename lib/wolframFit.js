const request = require('request');
const xmlParse = require('xml2js');
// const util = require('util');

function getNutritionValues(startingString) {
  // const workingString;
  const result = {
    totalCalories: 'total calories',
    totalFat: 'total fat',
    saturatedFat: 'saturated fat',
    cholesterol: 'cholesterol',
    sodium: 'sodium',
    totalCarbohydrates: 'total carbohydrates',
    fiber: 'fiber',
    sugar: 'sugar',
    protein: 'protein',
  };
  for (const i in result) {
    if ({}.hasOwnProperty.call(result, i)) {
      result[i] = startingString.split(result[i])[1].split(' ')[2] || 'no data found';
    }
  }
  return result;
}

module.exports.getFitInfo = (input, wolframId, callback) => {
  // encode the input string
  const queryInput = encodeURIComponent(input);

  // build url string with supplied appId and user query
  const query =
        'http://api.wolframalpha.com/v2/query?appid=' + wolframId +
        '&input=' + queryInput + '&format=plaintext';

  // http request to wolfram|alpha
  request(query, (rErr, response) => {
    if (rErr) {
      console.log('wolfram-fit.getFitInfo.request, err: ', rErr);
    } else if (response.statusCode === 200) {
      // no error and proper status code: parse response into json
      xmlParse.parseString(response.body, (qErr, result) => {
        if (qErr) {
          callback(qErr);
        } else {
          // check for valid input
          const didYouMean = result.queryresult.didyoumeans || '';
          if (didYouMean) {
            callback(new Error('Invalid input: \'' + input + '\''));
          } else {
            try {
              // get giant plaintext from gnarly response object
              const startS = result.queryresult.pod[1].subpod[0].plaintext[0];
              console.log(startS);
              const endS = getNutritionValues(startS);
              console.log(endS);

              // FINALLY. everything worked, call supplied callback
              callback(null, endS);
            } catch (e) {
              console.log(result);
              callback(e);
            }
          }
        }
      });
    }
  });
};
