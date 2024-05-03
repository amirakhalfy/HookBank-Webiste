const styles = {
  // Largeur maximale de la boîte
  boxWidth: "xl:max-w-[1280px] w-full",

  // Titre de niveau 2
  heading2: "font-poppins font-semibold text-2xl xs:text-4xl text-white xs:leading-[76.8px] leading-[66.8px] w-full",

  // Paragraphe
 paragraph: "font-poppins font-normal text-black text-lg leading-[40px] sm:leading-[48px] xl:max-w-[600px]",
  

  // Centre de la flexbox
  flexCenter: "flex justify-center items-center",

  // Début de la flexbox
  flexStart: "flex justify-center items-start",

  // Padding horizontal
  paddingX: "sm:px-16 px-6",

  // Padding vertical
  paddingY: "sm:py-16 py-6",

  // Padding
  padding: "sm:px-16 px-6 sm:py-12 py-4",

  // Marge horizontale
  marginX: "sm:mx-16 mx-6",

  // Marge verticale
  marginY: "sm:my-16 my-6",
};

// Disposition des sections
export const layout = {
  // Section
  section: `flex flex-col md:flex-row ${styles.paddingY}`,

  // Section inversée
  sectionReverse: `flex flex-col-reverse md:flex-row ${styles.paddingY}`,

  // Image de section inversée
  sectionImgReverse: `flex flex-1 ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,

  // Image de section
  sectionImg: `flex flex-1 ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  // Informations de section
  sectionInfo: `flex-1 flex-col ${styles.flexStart}`,
};

export default styles;
