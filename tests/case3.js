async function fn01() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("main fn01");
    }, 2500);
  });
}

async function fn02() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("new fn02");
    }, 1000);
  });
}

async function case03() {
  let f01 = await fn01();
  console.log(f01);
  let f02 = await fn02();
  console.log(f02);
}

case03();
