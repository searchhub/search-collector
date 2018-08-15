const urldecode = require('decode-uri-component');

module.exports.decode = decode;
module.exports.fetch = fetch;
module.exports.fetchAll = fetchAll;

function decode(data) {
  return urldecode(Buffer.from(data, 'base64').toString('utf-8'));
}

function blockingPop(stack, resolve, reject, counter) {
  counter = counter ? counter : 0;

  if (counter == 20) {
    reject(new Error("Wait timeout"));
  }

  if (stack.length > 0) {
    resolve(stack.pop());
  } else {
    setTimeout(function() {
      blockingPop(stack, resolve, reject, ++counter);
    }, 200);
  }
}

function block(stack) {
  return new Promise((resolve, reject) => {
    blockingPop(stack, resolve, reject);
  });
}

async function fetch(stack, type) {
    var elem = undefined;
    while (!elem) {
      try {
        let data = await block(stack);

        // The pipeline uses buffering, pushing arrays even if there only a single data point
        // This method unwraps only the first element
        let arr = JSON.parse(decode(data));

        if (!type) {
          elem = arr[0];
        } else {
          for (let e of arr) {
            if (e.type == type) {
              elem = e;
              break;
            }
          }
        }
      } catch (e) {
        // We'll end here if the block fails and the promise is rejected
        break;
      }
    }

    return elem;
}

async function fetchAll(stack, type) {
    var result = [];
    while (result.length == 0) {
      try {
        let data = await block(stack);

        // The pipeline uses buffering, pushing arrays even if there only a single data point
        // This method unwraps only the first element
        let arr = JSON.parse(decode(data));

        for (let e of arr) {
          if (!type || e.type == type) {
            result.push(e);
          }
        }
      } catch (e) {
        // We'll end here if the block fails and the promise is rejected
        break;
      }
    }

    return result;
}
