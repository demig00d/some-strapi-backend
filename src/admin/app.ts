// path: ./my-app/src/admin/app.ts

import AuthLogo from './extensions/my-logo.png';
// import MenuLogo from './extensions/logo.png';
import favicon from './extensions/favicon.png';


export default {
  config: {
    // Replace the Strapi logo in auth (login) views
    auth: {
      logo: AuthLogo,
    },
    // Replace the favicon
    head: {
      favicon: favicon,
    },
    // Add a new locale, other than 'en'
    locales: ['ru'],
    // Replace the Strapi logo in the main navigation
    // menu: {
    //   logo: MenuLogo,
    // },
    // Extend the translations
    translations: {
      ru: {
        "Auth.form.welcome.subtitle": "Войдите в свою учетную запись",
        "Auth.form.welcome.title": "Добро пожаловать",
        "app.components.LeftMenu.navbrand.title": "Театр Луны",
        "content-manager.containers.Edit.information.publishedVersion": "\nОпубликованной версии",
        "content-manager.containers.Edit.information.draftVersion": "\nЧерновой версии",
        "content-manager.components.LeftMenu.collection-types": "Коллекции",
        "content-manager.components.LeftMenu.single-types": "Отдельные страницы",
      },
    },
    // Disable video tutorials
    tutorials: false,
    // Disable notifications about new Strapi releases
    notifications: { release: false },
  },

  bootstrap() {
    document.title = 'Московский Театр Луны'
  },
};


