import styles, { layout } from "../style";
import airbnbImage from "../assets/airbnb.png";
import giphyGif from "../assets/giphy.gif"; // Import the GIF file

const Business = () => (
  <section id="features" className={layout.section}>
    <div className="flex justify-between gap-4">
      {/* Section for Carthago solution */}
      <div className={`flex-1 ${layout.sectionInfo}`}>
        <div className="mb-10">
          <h2 className={`${styles.heading2} text-gold`} style={{ color: 'rgba(218, 165, 32, 0.9)' }}>
            <br className="sm:block hidden" />
            What is Carthago solution ?
          </h2>
          <div className="bg-gold rounded-lg shadow-lg flex flex-col justify-between h-full overflow-hidden transform transition duration-300 hover:scale-105">
            <p className="p-6 text-black">
              <span className="text-gold">Carthago Compensation-Centre</span> is a payment management solution designed to modernize financial exchanges within and between institutions (EC, EP, and EMF). It eliminates physical value exchanges, ensures swift (within 24 hours) clearing operations, and enables instant transfers (24/7). The system is centralized and secure, managing both domestic and cross-border payments among participating institutions while adhering to international security standards for transaction processing.
            </p>
            <div className={`${layout.sectionImg} flex-col`}>
              <img src={airbnbImage} alt="Airbnb" className="w-96 h-auto my-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Small gap */}
      <div className="w-4" />

      {/* Section for credit scoring */}
      <div className={`flex-1 ${layout.sectionInfo}`}>
        <div className="mb-10">
          <h2 className={`${styles.heading2} text-gold`} style={{ color: 'rgba(218, 165, 32, 0.9)' }}>
            <br className="sm:block hidden" />
            What is Credit Scoring ?
          </h2>
          <div className="bg-gold rounded-lg shadow-lg flex flex-col justify-between h-full overflow-hidden transform transition duration-300 hover:scale-105">
            <p className="p-6 text-black">
              Credit scoring is a numerical expression based on a level analysis of a person's credit files, to represent the creditworthiness of an individual. A credit score is primarily based on credit report information, typically from one of the three major credit bureaus: Experian, TransUnion, and Equifax.
            </p>
            <div className={`${layout.sectionImg} flex-col`}>
              <img src={giphyGif} alt="Credit" className="w-96 h-auto my-4" /> {/* Change src to giphyGif */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Business;
