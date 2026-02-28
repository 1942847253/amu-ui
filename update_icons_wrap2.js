const fs = require('fs');
let text = fs.readFileSync('templates/amu-admin/src/layouts/AdminLayout.vue', 'utf8');

text = text.replace(/<component :is=\"(Icon[a-zA-Z]+)\"(.*?)\/>/g, '<AmuIcon>< /></AmuIcon>');

const conditionalRegex = /<component :is="appStore\.isDark \? (Icon[a-zA-Z]+) : (Icon[a-zA-Z]+)"(.*?) \/>/g;
text = text.replace(conditionalRegex, '<AmuIcon>\n              <component :is="appStore.isDark ?  : " />\n            </AmuIcon>');

fs.writeFileSync('templates/amu-admin/src/layouts/AdminLayout.vue', text, 'utf8');
