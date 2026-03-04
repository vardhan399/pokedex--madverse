import { initTRPC, TRPCError } from '@trpc/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { type TRPCContext } from './context'

const t = initTRPC.context<TRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure
export const middleware = t.middleware

const timingMiddleware = middleware(async ({ next, path }) => {
  const start = Date.now()
  const result = await next()
  const end = Date.now()
  console.log(`[tRPC] ${path} took ${end - start}ms`)
  return result
})

export const tracedProcedure = publicProcedure.use(timingMiddleware)
