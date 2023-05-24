/**
 * press-item service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::press-item.press-item', ({ strapi }) => ({
  // Method 1: Creating an entirely custom service
  async getYears() {
    let { rows } = await strapi.db.connection.raw(
      `SELECT DATE_PART('year', date) AS year
       FROM press_items
       WHERE date is not NULL
       GROUP BY year
       ORDER BY year DESC`
    );

    return rows.map((r) => r.year)
  }
}));

