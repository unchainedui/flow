# Unchained UI

## Flow

[![NPM Version](https://img.shields.io/npm/v/uc-flow.svg?style=flat-square)](https://www.npmjs.com/package/uc-flow)
[![NPM Downloads](https://img.shields.io/npm/dt/uc-flow.svg?style=flat-square)](https://www.npmjs.com/package/uc-flow)

Various execution flow helpers

* [series](#series)
* [parallel](#parallel)
* [debounce](#debounce)
* [throttle](#throttle)
* [retry](#retry)

### Series

**series(tasks, done)**

Runs the functions in the `tasks` array or object in series, each one running once the previous function has completed. If any functions in the series pass an error to its callback, no more functions are run, and `done` is immediately called with the value of the error. Otherwise, `done` receives an array or object of results when tasks have completed.

### Parallel

**parallel(tasks, done)**

Run the tasks array of functions in parallel, without waiting until the previous function has completed. Once the tasks have completed, the results are passed to the final callback as an array.

### Debounce

**debounce(func, wait, immediate)**

Creates a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed since the last time the debounced function was invoked. The debounced function comes with a cancel method to cancel delayed func invocations. Provide `immediate` to indicate whether func should be invoked on the leading or trailing edge of the `wait` timeout. The `func` is invoked with the last arguments provided to the debounced function.

### Throttle

**throttle(func, wait, immediate)**

Creates a throttled function that only invokes `func` at most once per every `wait` milliseconds. The throttled function comes with a cancel method to cancel delayed func invocations. Provide `immediate` to indicate whether func should be invoked on the leading or trailing edge of the `wait` timeout. The `func` is invoked with the last arguments provided to the throttled function.
**throttle(f, ms, ctx, immediate)**

### Retry

**retry(func, options)**

Wrapper to retry function calls with an exponential backoff strategy. Returns the `cancel` function.

* **func** — function
* **options**
  - interval – number, ms, default is 1000. The number of milliseconds before starting the first retry.
  - maxInterval – number, ms, default is 30000. The maximum number of milliseconds between two retries.
  - maxAttempts – number, default is 10. The maximum amount of times to retry the operation.
  - decay — number, default is 1.5. The exponential factor to use.

License MIT

© velocityzen

