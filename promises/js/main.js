let myPromise = new Promise(function (resolve, reject) {
  // "Producing Code" (May take some time)
  // Making coffee ...
  resolve("Yaaay, here's your coffee"); // when successful
  reject("Ohh, f***. Something went wrong");  // when error
});

// "Consuming Code" (Must wait for a fulfilled Promise)
myPromise.then(
  function (value) {
    /* code if successful */
    console.log(value); // Yaaay, here's your coffee
  },
  function (error) {
    /* code if some error */
    console.log(error); // Ohh, f***. Something went wrong
  }
);