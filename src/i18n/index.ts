import { Language, TranslationContent } from './types';
import { en } from './lang/en';
import { tr } from './lang/tr';

// Translation map
const translations: Record<Language, TranslationContent> = {
  en,
  tr
};

export class I18nService {
  private language: Language;

  constructor(language: string) {
    this.language = language as Language;
    if (!translations[this.language]) {
        console.warn(`Language '${language}' not supported, falling back to 'en'`);
        this.language = 'en';
    }
  }

  public getTranslations(): TranslationContent {
    return translations[this.language];
  }
}
