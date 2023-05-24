/**
 * press-item controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::press-item.press-item', ({ strapi }) => ({
  async getYears() {
    return await strapi.service('api::press-item.press-item').getYears();
  },
}));

