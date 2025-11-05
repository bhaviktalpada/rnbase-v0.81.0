const png_path = '../assets/png/';
const lottie_path = '../assets/lottie/';
const svg_path = '../assets/svg/raw/';

export const IMAGES = {
  app_logo: require(`${png_path}app_logo.png`),
  img_container: require(`${png_path}img_container.png`),
  app_bg_container: require(`${png_path}app_background.png`),
  ic_user_avatar: require(`${png_path}ic_user_avatar.png`),
  ic_avtar_image: require(`${png_path}ic_avtar_image.png`),
  
  img_expanses: require(`${png_path}ic-expanses.png`),
  no_data: require(`${png_path}no-complaint.png`),
  ic_settings: require(`${png_path}asset-setting.png`),
};

export const SVGFile = {
  svgBack: require(`${svg_path}ic-back.svg`),
  svgLogout: require(`${svg_path}ic-logout.svg`),
  svgSettingAbout: require(`${svg_path}ic-setting-about.svg`),
  svgSettingContact: require(`${svg_path}ic-setting-contact.svg`),
  svgSettingDelete: require(`${svg_path}ic-setting-delete.svg`),
  svgSettingCL: require(`${svg_path}ic-setting-language.svg`),
  svgSettingPrivacy: require(`${svg_path}ic-setting-privacy.svg`),
  svgSettingProfile: require(`${svg_path}ic-setting-profile.svg`),
}

export const LOTTIE = {
  loading_hand: require(`${lottie_path}loading_animation_hand.json`),
  loading_lottie: require(`${lottie_path}loading_lottie.json`),
  no_data: require(`${lottie_path}no_data.json`),
};
