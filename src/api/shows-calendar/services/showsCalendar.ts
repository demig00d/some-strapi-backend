/**
 * shows-calendar service
 */

export default {
  getDaysWithShows: async (afterDate: string) => {
    try {
      // fetching data
      //{{baseUrl}}/api/shows?filters[date][$gt]=2022-10-20&sort[0]=date&fields[0]=date
      const entries = await strapi.entityService.findMany(
        "api::show.shows",
        {
          fields: ["date"],
          filters: {
            date: { $gt: afterDate },
          },
          sort: "date",
        }
      );

      return entries

    } catch (err) {
      return err;
    }
  },
};
