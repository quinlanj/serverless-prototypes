import { prisma } from '~/server/prisma';

prisma.$use(
  async (params: { [key: string]: any }, next: (args: any) => void) => {
    const entity = await next(params);
    const nodeName = params.model;
    const action = params.action;
    const privacyPolicy = await getPrivacyPolicy(nodeName);
    await privacyPolicy.runAsync(entity, action);
    return entity;
  },
);
