import React from 'react';
import styles from '../style';

const GetStarted = () => (
  <div className={`ss:hidden ${styles.flexCenter}`}>
    <button className="w-[140px] h-[140px] rounded-full bg-blackGold p-[2px] cursor-pointer">
      <div className={`${styles.flexCenter} flex-col w-full h-full rounded-full`}>
        <p className="font-poppins font-medium text-[18px] leading-[23px] text-white">
          <span className="text-gradient">Get</span>
        </p>
        <p className="font-poppins font-medium text-[18px] leading-[23px] text-white">
          <span className="text-gradient">Started</span>
        </p>
      </div>
    </button>
  </div>
);

export default GetStarted;
