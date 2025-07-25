// utils/delayedLazy.js
import React from 'react';

export default function delayedLazy(importFunc, delay = 1000) {
  return React.lazy(() =>
    Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports)
  );
}
