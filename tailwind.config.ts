/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'primary': ["'Nunito Sans', sans-serif"],
        'fontawesome': ["Font Awesome 5 Pro"],
      },
      colors: {
        'white': '#ffffff',
        'heading': '#0D0F19',
        'primary': '#2C6AE5',
        'secondary': '#FF9720',
        'success': '#32C98D',
        'border': '#EFF0F2',
        'borderLight': '#ebebeb',
        'body': '#616161',
        'gray': '#fcfcfc', //only use in input bg
        'lightest': '#f9f9f9',
        'teal': '#611BCB',
        'danger': '#FF5066',
        'warning': '#FF9720',
        "grayTwo": {100: '#e0e0e0',  500: '#6b7280'}
    },
    },

    screens: {
      'xs': '320px',
      // => @media (min-width: 320px) { ... }

      'sm': '576px',
      // => @media (min-width: 576px) { ... }

      'md': '768px', 
      // => @media (min-width: 768px) { ... }

      'lg': '992px',
      // => @media (min-width: 992px) { ... }

      'xl': '1201px',
      // => @media (min-width: 1200px) { ... }

      'xxl': '1400px',
      // => @media (min-width: 1400px) { ... }

      'xxxl': '1600px',
      // => @media (min-width: 1601px) { ... }

      '4xl': '1800px',
      // => @media (min-width: 1601px) { ... }


      'max3Xl': {'max': '1800px'},
      // => @media (max-width: 1700px) { ... }

      'max2Xl': {'max': '1599px'},
      // => @media (max-width: 1600px) { ... }

      'maxXl': {'max': '1399px'},
      // => @media (max-width: 1200px) { ... }

      'maxLg': {'max': '1200px'},
      // => @media (max-width: 1200px) { ... }

      'maxMd': {'max': '991px'},
      // => @media (max-width: 991px) { ... }

      'maxSm': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'maxXs': {'max': '575px'},
      // => @media (max-width: 575px) { ... }
      

      'minMax4Xl': {'min': '1800px', 'max': '1900px'},
      // => @media (min-width: 1601px) and (max-width: 1800px) { ... }
      'minMax3Xl': {'min': '1600px', 'max': '1799px'},
      // => @media (min-width: 1601px) and (max-width: 1800px) { ... }

      'minMax2Xl': {'min': '1400px', 'max': '1599px'},
      // => @media (min-width: 1401px) and (max-width: 1600px) { ... }

      'minMaxXl': {'min': '1201px', 'max': '1399px'},
      // => @media (min-width: 1201px) and (max-width: 1400px) { ... }

      'minMaxLg': {'min': '992px', 'max': '1200px'},
      // => @media (min-width: 992px) and (max-width: 1200px) { ... }

      'minMaxMd': {'min': '768px', 'max': '991px'},
      // => @media (min-width: 768px) and (max-width: 991px) { ... }

      'minMaxSm': {'min': '576px', 'max': '767px'},
      // => @media (min-width: 576px) and (max-width: 576px) { ... }
  },
},
  plugins: [],
}

