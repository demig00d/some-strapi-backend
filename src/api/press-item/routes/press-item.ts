/**
 * press-item router
 */

import { factories } from '@strapi/strapi';

const defaultRouter = factories.createCoreRouter('api::press-item.press-item');

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes: factories.Router[];
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = extraRoutes.concat(innerRouter.routes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: "GET",
    path: "/press-items/years",
    handler: "api::press-item.press-item.getYears",
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
