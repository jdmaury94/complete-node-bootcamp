const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file ☹️');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write file');
      resolve('Success!!');
    });
  });
};

const getDocPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed ${data}`);

    const res = await superagent.get(
      `https://dog.ceo/a3pi/breed/${data}/images/random`
    );
    console.log(res.body.message);

    await writeFilePro('dog-img.txt', res.body.message);
    console.log('Random dog image saved to file!');
  } catch (e) {
    console.log(e);
  }
};
getDocPic();

/* readFilePro(`${__dirname}/dog.txt`)
  .then(data => {
    console.log(`Breed ${data}`);
    return superagent.get(`https://dog.ceo/a3pi/breed/${data}/images/random`);
  }) // Promise
  .then(res => {
    console.log(res.body.message);
    return writeFilePro('dog-img.txt', res.body.message).then(() => {
      console.log('Random dog image saved to file!');
    });
  })
  .catch(err => {
    console.log(err);
  });
 */
