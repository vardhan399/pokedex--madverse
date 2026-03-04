import { prisma } from '@/server/db/client'
import { type NextRequest } from 'next/server'

export interface TRPCContext {
  prisma: typeof prisma
  req?: NextRequest
}

export const createTRPCContext = async (opts?: {
  req?: NextRequest
}): Promise<TRPCContext> => {
  return {
    prisma,
    req: opts?.req,
  }
}
