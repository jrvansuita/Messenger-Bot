
module.exports={
  clean : (s) => {
    var result = s.toLowerCase();
    var map = {
      a: /[\xE0-\xE6]/g,
      e: /[\xE8-\xEB]/g,
      i: /[\xEC-\xEF]/g,
      o: /[\xF2-\xF6]/g,
      u: /[\xF9-\xFC]/g,
      c: /\xE7/g,
      n: /\xF1/g,
    };

    for (var letter in map) {
      result = result.replace(map[letter], letter);
    }

    return result;
  },


  choose : (response) =>{
    var isRandom = ['{','}'].every(val => response.includes(val));

    if (isRandom){
      var responsesList = response.replace(/}\s*,\s*{/g,'}|{').replace(/[\}\{]/g,'').split('|');
      return responsesList[Math.floor((Math.random() * (responsesList.length)))];
    }

    return response;
  },

  blocks : (parts) =>{
    var isBlockParts = ['[',']'].every(val => parts.includes(val));

    if (isBlockParts){
      return parts.replace(/]s*,/g,']|[').replace(/[\[\]]/g,'').split('|');
    }

    return parts.toString();
  }


};
