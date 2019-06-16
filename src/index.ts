
exports.executeCommand = function(command, out, err) {
  return new Promise(function(resolve, reject) {
    let spawn = exec(command);
    if (out) spawn.stdout.on('data', out);
    if (err) spawn.stderr.on('data', err);

    spawn.on('close', function() {
      resolve();
    });
  });
};

