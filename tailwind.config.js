module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "light-gray": "#3B3D4A",
        "beige":"#fffff",
        "dark-gray":"#262B31",
        "light-white": "rgba(255,255,255,0.17)",
        'red': '#dc2626',
        "white":"#ffffff",
        'stone':'#3b3d4aae'
      },
      height:{
        '90':'92vh',
        '1/9':'2.8rem'
      },
      width:{
        "25%":"25%",
        "20%":"20%",
        "5%":"5%",
        "80%":"80%",
        "95%":"95%",
      }
    },
  },
  plugins: [],
};
