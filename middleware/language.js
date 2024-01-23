export const setEnglish = async (req, res, next) => {
  req.lang = "en";
  next();
};
export const setArabic = async (req, res, next) => {
  req.lang = "ar";
  next();
};
export const setKurdish = async (req, res, next) => {
  req.lang = "kr";
  next();
};

export const CollectLanguage = async (req, res, next) => {
  req.lang = "en";
  req.dashboard = true;
  next();
};
