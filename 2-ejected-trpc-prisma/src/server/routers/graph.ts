/**
 *
 * This is an example router, you can delete this file and then update `../pages/api/trpc/[trpc].tsx`
 */
import { t } from '../trpc';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '~/server/prisma';

export const graphRouter = t.router({
  instaql: t.procedure
    .input(
      z.object({
        nodeName: z.string(),
        queryType: z.string(),
        queryArgs: z.object({}),
        edges: z.array(z.string()),
      }),
    )
    .query(async ({ input, ctx: viewerContext }) => {
      const { queryType, queryArgs, nodeName, edges } = input;

      if (queryType === 'default') {
        const result = await prisma.node.findMany({
          where: {
            nodeType: nodeName,
          },
          select: {
            id: true,
            data: true,
            nodeType: true,
          },
        });
        return { items: resolve(viewerContext, nodeName, result, edges) };
      } else if (queryType === 'where') {
        const result = await prisma.node.findMany({
          where: {
            nodeType: nodeName,
            ...queryArgs,
          },
          select: {
            id: true,
            data: true,
            nodeType: true,
          },
        });
        return { items: resolve(viewerContext, nodeName, result, edges) };
      } else {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `unknown query type: ${queryType}`,
        });
      }
    }),
  update: t.procedure
    .input(
      z.object({
        id: z.string().uuid(),
        objectFields: z.object({}),
      }),
    )
    .mutation(async ({ input }) => {
      const { id, objectFields } = input;
      const node = await prisma.node.update({
        where: {
          id,
        },
        data: {
          ...objectFields,
        },
      });
      return node;
    }),
  link: t.procedure
    .input(
      z.object({
        sourceNodeId: z.string().uuid(),
        destinationNodeId: z.string().uuid(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { sourceNodeId, destinationNodeId, name } = input;
      // TODO: upsert instead
      const edge = await prisma.edge.create({
        data: {
          sourceNodeId,
          destinationNodeId,
          name,
        },
      });
      return edge;
    }),
  unlink: t.procedure
    .input(
      z.object({
        sourceNodeId: z.string().uuid(),
        destinationNodeId: z.string().uuid(),
        name: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { sourceNodeId, destinationNodeId, name } = input;
      const edge = await prisma.edge.delete({
        where: {
          sourceNodeId,
          destinationNodeId,
          name,
        },
      });
      return edge;
    }),
});
