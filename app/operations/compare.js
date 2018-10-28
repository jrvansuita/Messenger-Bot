module.exports = {

  equal : (input, arr) =>{
    return arr.some(val => {
      return input === val.toLowerCase();
    });
  },

  containsAnyOf : (input, arr) => {
    return arr.some(val => {
      return input.indexOf(val.toLowerCase().replace('_', ' ')) >= 0;
    });
  },

  matchAnyWord : (input, arr) => {
    return arr.some(val => {
      return new RegExp('\\b' + val + '\\b','gi').test(input);
    });
  },

  matchAllWords : (input, arr) => {
    return arr.every(val => {
      return new RegExp('\\b' + val + '\\b','gi').test(input);
    });
  },

  containsAll : (input, arr) => {
    return arr.every(val => input.includes(val.toLowerCase().replace('_', ' ')));
  }
};
