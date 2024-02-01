module.exports = {
  launch: {
    headless: (process.env.HEADLESS || "new") === "new",
    slowMo: process.env.SLO_MO || 0,
    devtools: true,
  },
};
