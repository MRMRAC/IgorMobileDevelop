export function simulateLoading(delay = 500) {
  return new Promise(resolve => setTimeout(resolve, delay));
}

export async function withTimeout(promise, timeoutMs) {
  let timer;
  const timeout = new Promise((_, reject) => {
    timer = setTimeout(() => reject(new Error('Таймаут операции')), timeoutMs);
  });
  try {
    return await Promise.race([promise, timeout]);
  } finally {
    clearTimeout(timer);
  }
}

export async function retryOperation(operation, retries = 3, baseDelay = 200) {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      return await operation();
    } catch (err) {
      if (attempt === retries) throw err;
      const delay = baseDelay * 2 ** (attempt - 1);
      await new Promise(r => setTimeout(r, delay));
    }
  }
}
