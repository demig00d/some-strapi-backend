/**
 * A set of functions called "actions" for `shows-calendar`
 */


export default {
  async showsCalendar(ctx, next) {
    let { afterDate } = ctx
    try {
      const result = await strapi
        .service("api::shows-calendar.showsCalendar")
        .getDaysWithShows(afterDate);

      let dates = result.data.map(x => x.attributes.date)
      return dates;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
