
global.sleep = (millis) =>  {
  return new Promise(resolve => setTimeout(resolve, millis));
};


global.isUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};
