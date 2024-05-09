import React from 'react';
import styles from '../style';
import { robot } from '../assets';
import { GetStarted } from './index';

const Hero = () => {
  return (
    <section id="home" className={`flex md:flex-row flex-col ${styles.paddingY}`} style={{ background: 'linear-gradient(to right, rgb(255, 255, 255), rgb(230, 190, 138))',width:"1600px"}}>
      <div className={`flex-1 flex justify-start items-start flex-col xl:px-0 sm:px-16 px-6`}>
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-white ss:leading-[100px] leading-[75px]">
            Carthago <br className="sm:block hidden"/> {" "}
            <span className="text-gradient">Credit scoring</span> {" "} 
          </h1>
          <div className="ss:flex hidden md:mr-4 mr-0">
            <GetStarted/>
          </div>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-gold ss:leading-[100px] leading-[75px] w-full">Your best solution for loan approval!</h1>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Apply for a loan, track your application, improve your credit score,
          and receive recommendations for enhancement.
        </p>
      </div>
      <div className={`flex-1 flex ${styles.flexCenter} md:mr-0 my-10 relative`}>
        <img src={robot} className="w-[100%] h-[100%] relative z-[5]" alt="" />
        <div className="absolute z-[0] w-[40%] h-[35%] top-0 pink__gradient"/>
        <div className="absolute z-[1] w-[80%] h-[80%] rounded-full bottom-40 white__gradient"/>
      </div>
    </section>
  );
}
export default Hero;
