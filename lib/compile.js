/** create a promise that resolves to the output of a stream when the stream
ends.  It also does some ZoKrates-specific error checking because not all 'errors'
are supported on 'stderr'
@param stream - a stream of console logging as defined in the node-docker-api docs.
*/
const promisifyStream = stream =>
  new Promise((resolve, reject) => {
    const MAX_RETURN = 10000000;
    let chunk = '';
    stream.on('data', d => {
      chunk += d.toString('utf8'); // remove any characters that aren't in the proof.
      if (chunk.length > MAX_RETURN) chunk = '...[truncacted]'; // don't send back too much stuff
    });
    stream.on('end', () => {
      if (chunk.includes('panicked')) {
        // errors thrown by the application are not always recognised
        reject(new Error(chunk.slice(chunk.indexOf('panicked'))));
      } else {
        resolve(chunk);
      }
    });
    stream.on('error', err => reject(err));
  });

/**
This function and the following ones are direct equivalents of the corresponding
ZoKrates function.  They return Promises that resolve to the output (stdout, stderr)
from ZoKrates.
*/
async function compile(container, codeFile) {
  console.log('Compiling code in the container - this can take some minutes...');
  // var config = Config.getProps()
  const exec = await container.exec.create({
    Cmd: [
      config.ZOKRATES_APP_FILEPATH_ABS,
      'compile',
      '-i',
      config.ZOKRATES_CONTAINER_CODE_DIRPATH_ABS + codeFile,
    ],
    AttachStdout: true,
    AttachStderr: true,
  });
  return promisifyStream(await exec.start(), 'compile'); // return a promisified stream
}

module.exports = {
  compile,
};
