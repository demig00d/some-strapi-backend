export default {
  routes: [
    {
      method: 'GET',
      path: '/shows-calendar:date',
      handler: 'shows-calendar.showsCalendar',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
