import AsyncStorage from '@react-native-async-storage/async-storage';
import LocalizeText from './text-localize';

const LANGUAGE_KEY = 'appLang';

class LanguageHelper {
  static async getCurrentLanguage() {
    const storedLang = await AsyncStorage.getItem(LANGUAGE_KEY);
    return storedLang || 'gu'; // default to Gujarati
  }

  static async setLanguage(langCode) {
    await AsyncStorage.setItem(LANGUAGE_KEY, langCode);
    LocalizeText.setLanguage(langCode);
  }

  static async initAppLanguage() {
    const lang = await this.getCurrentLanguage();
    LocalizeText.setLanguage(lang);
  }
}

export default LanguageHelper;