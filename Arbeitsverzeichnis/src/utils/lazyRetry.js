// Kleine Retry-Hilfe für dynamic imports, um sporadische Netzwerk/HMR Fehler abzufangen
export function lazyRetry(factory, { retries = 2, delay = 400 } = {}) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      factory()
        .then(resolve)
        .catch((err) => {
          if (n > 0) {
            setTimeout(() => attempt(n - 1), delay);
          } else {
            reject(err);
          }
        });
    };
    attempt(retries);
  });
}
