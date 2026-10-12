import { domMax } from 'framer-motion'

/**
 * Loaded asynchronously by `LazyMotion`.
 *
 * Keeping this in its own module is what makes the split real: a static
 * `features={domMax}` import is hoisted into the main chunk, so `LazyMotion`
 * would have nothing to defer and the bundle would not shrink at all.
 */
export default domMax
