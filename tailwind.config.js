/** @type {import('tailwindcss').Config} */
export default {
  darkMode : 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js"
    
  ],
  theme: {
    screens : {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'md-2': '878px',
      // => @media (min-width: 878px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'lg-2': '1110px',
      // => @media (min-width: 1110px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      'white' : '#fff',
      'black' : '#000',
      'gray' : '#D9D9D9',
      'gray2' : '#4D4D4D',
      'darkGray' : '#6F6F6F',
      'yellow' : '#F2A71B',
      'orange' : '#F25D07',
      'blue1' : '#0F50A6',
      'blue2' : '#0B38BF',
      'blue3' : '#031473',
      'blueBg' : '#182B45',
      'blackBlue' : '#16273F',      
      'pink' : '#DA076C',
      'purple' : '#8B1096',
      'red' : '#DB0C0C',
      'greenLight' : '#20E300',
      'greenDark' : '#177E06',
      'brown' : '#4E2601',
      'transparent' : "#00000000",
      'darkBlue-gradient': "bg-gradient-to-r from-[#141B34] from-70% to-[#1A1A1B]",      
    },    
    extend: {
      fontFamily : {
        'Poppins' : [ 'Poppins', 'sans-serif']        
      },
    },
  },
  plugins: [
    
  ],
}

