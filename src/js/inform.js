import colors from 'colors';

const timer = {
  startTime: null,
  endTime: null,
  start() {
    this.startTime = Date.now();
    return this.startTime;
  },
  stop() {
    this.endTime = Date.now();
    return this.endTime;
  },
  time() {
    return `\n--- DONE ${(this.endTime - this.startTime) / 1000} seconds ---`;
  },
};

export default {
  start(msg) {
    timer.start();
    console.log('\n');
    return console.log(` - ${msg} - `);
  },
  msg(words) {
    return console.log(colors.magenta(words));
  },
  done(msg) {
    timer.stop();
    if (msg) console.log(`\n${msg}`);
    return console.log(timer.time());
  },
  err(msg) {
    return console.log(colors.bgRed(msg));
  },
};
