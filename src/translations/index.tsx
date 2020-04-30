import '@formatjs/intl-pluralrules/polyfill';
import '@formatjs/intl-pluralrules/dist/locale-data/en';
import '@formatjs/intl-pluralrules/dist/locale-data/es';
import '@formatjs/intl-relativetimeformat/polyfill';
import '@formatjs/intl-relativetimeformat/dist/locale-data/en';
import '@formatjs/intl-relativetimeformat/dist/locale-data/es';
import messages_es from './es.json';

interface iMessages {
  [language: string]: any; // TODO: Find more specific type.
}

const messages: iMessages = {
  es: messages_es,
};

export const language = navigator.language.split(/[-_]/)[0];

export const translationMessages = messages[language];
