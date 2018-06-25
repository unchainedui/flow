export function series(tasks, done) {
  let size;
  let key;
  let keys;
  let result;
  let iterate;
  let completed = 0;

  const step = function(err, ...args) {
    if (err) {
      done(err, result);
      return;
    }

    result[key] = args.length <= 2 ? args[0] : args;

    if (++completed === size) {
      return done(null, result);
    }

    iterate();
  };

  if (Array.isArray(tasks)) {
    size = tasks.length;
    result = Array(size);
    iterate = function() {
      key = completed;
      tasks[completed](step);
    };
  } else if (tasks && typeof tasks === 'object') {
    keys = Object.keys(tasks);
    size = keys.length;
    result = {};
    iterate = function() {
      key = keys[completed];
      tasks[key](step);
    };
  } else {
    return done(null);
  }

  if (!size) {
    return done(null, result);
  }

  iterate();
}

export function parallel(tasks, done) {
  const results = [];
  let counter = 0;
  tasks.forEach((callback, index) => {
    callback((...args) => {
      results[index] = args;
      counter++;
      if (counter === tasks.length) {
        done(results);
      }
    });
  });
}

export function debounce(func, wait, immediate) {
  let timeout;
  const fn = function(...args) {
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(this, args);
      }
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      func.apply(this, args);
    }
  };

  fn.cancel = function() {
    clearTimeout(timeout);
  };

  return fn;
}

export function throttle(func, wait, immediate) {
  let timeout = null;

  const fn = function(...args) {
    if (timeout === null) {
      immediate && func.apply(this, args);

      timeout = setTimeout(() => {
        timeout = null;
        (!immediate) && func.apply(this, args);
      }, wait);
    }
  };

  fn.cancel = function() {
    clearTimeout(timeout);
  };

  return fn;
}

export function retry(func, opts = {}) {
  const interval = opts.interval || 1000;
  const maxInterval = opts.maxInterval || 30000;
  const maxAttempts = opts.maxAttempts || 10;
  const decay = opts.decay || 1.5;
  let attempts = 0;
  let attemptTimeout;
  let stopped = false;

  const attempt = function() {
    const timeout = interval * Math.pow(decay, attempts);
    attempts++;

    attemptTimeout = setTimeout(() => {
      func(err => {
        if (err && !stopped) {
          if (maxAttempts) {
            attempts < maxAttempts && attempt();
          } else {
            attempt();
          }
        }
      });
    }, Math.min(timeout, maxInterval));
  }

  attempt();
  return () => {
    stopped = true;
    clearTimeout(attemptTimeout);
  }
}
