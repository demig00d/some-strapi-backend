module.exports = ({ env }) => ({
  // ..
  'transformer': {
    enabled: true,
    config: {
      prefix: '/api/',
      responseTransforms: {
        removeAttributesKey: true,
        removeDataKey: true,
      }
    }
  },
  seo: {
    enabled: true,
  },
  'drag-drop-content-types': {
    enabled: true,
  },
  ckeditor: {
    enabled: true,
    config: {
      plugin: {
        // disable data-theme tag setting //
        // setAttribute:false,

        // disable strapi theme, will use default ckeditor theme //
        // strapiTheme:false,

        // styles applied to editor container (global scope) //
        // styles:`
        // .ck.ck-editor__main .ck-focused{
        //   max-height: 700px;
        // }
        // :root{
        //   --ck-color-focus-border:red;
        //   --ck-color-text:red;
        // }
        // `
      },
      editor: { // editor default config
        mediaEmbed: {
          previewsInData: true
        },

        // https://ckeditor.com/docs/ckeditor5/latest/features/markdown.html
        // if you need markdown support and output set: removePlugins: [''],
        // default is
        // removePlugins: ['Markdown'],

        // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html
        toolbar: {
          items: [
            'bold',
            'italic',
            'underline',
            'removeFormat',
            '|',
            'bulletedList',
            'todoList',
            '|',
            'StrapiMediaLib',
            'mediaEmbed',
            'link',
            '|',
            'subscript',
            'superscript',
            'strikethrough',
            '|',
            'undo',
            'redo'
          ]
        }
      }
    }
  },
  'role-select': {
    enabled: true,
    resolve: './src/plugins/strapi-plugin-role-select'
  },
});
