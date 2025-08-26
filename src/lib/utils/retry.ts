import { logger } from 'src/lib/utils/logger'
import { sleep } from 'src/lib/utils/timeout'

// If all the tries fail it raises the last thrown exception
export async function retryAsync<T>(runner: () => T, attempts = 3, delay = 500) {
  let saveError
  for (let i = 0; i < attempts; i++) {
    try {
      const result = await runner()
      if (result) return result
      else throw new Error('Empty result')
    } catch (error) {
      await sleep(delay * (i + 1))
      saveError = error
      logger.error(`retryAsync: Failed to execute function on attempt #${i}:`, error)
    }
  }
  logger.error(`retryAsync: All attempts failed`)
  throw saveError
}
