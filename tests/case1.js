function getTea() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      resolve("milk tea");
    }, 1000);
  });
}

// getTea().then(
//   function (res) {
//     console.log(res);
//   },
//   function (err) {
//     console.error(err);
//   }
// );

function getWater() {
  return new Promise(function (resolve, reject) {
    setTimeout(() => {
      reject("dirty water");
    }, 2000);
  });
}

getWater()
  .then(
    function (res) {
      console.log(res);
    },
    function (err) {
      console.error(err);
    }
  )
  .catch(function (params) {
    console.log(params);
  });
