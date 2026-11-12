const ApiError = require('./ApiError')

/** Express middleware: validates req[source] with a zod schema and replaces it with the parsed value. */
module.exports = (schema, source = 'body') => (req, _res, next) => {
  const result = schema.safeParse(req[source] ?? {})
  if (!result.success) {
    const details = result.error.issues.map((i) => ({ field: i.path.join('.'), message: i.message }))
    throw new ApiError(400, 'Validation failed', details)
  }
  if (source === 'body') req.body = result.data
  else req.validated = { ...(req.validated || {}), [source]: result.data }
  next()
}
