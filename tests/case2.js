function fn1() {
  return new Promise(function (resolve, reject) {
    resolve("golden");
  });
}

function fn2() {
  return new Promise(function (resolve, reject) {
    resolve("silver");
  });
}

async function case02() {
  let f1 = await fn1();
  console.log(f1);
  let f2 = await fn2();
  console.log(f2);
}

case02();
