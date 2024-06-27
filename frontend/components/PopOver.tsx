import { nftData } from '@/types';
import React, { useState } from 'react';
// code is currently not used anywhere
const PopOver = ({ filteredLstOfNfts, listOfNFts }  : {filteredLstOfNfts : nftData[] , listOfNFts : nftData[]}) => {
  const [isOpen, setIsOpen] = useState(true);

  const togglePopover = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='relative'>
      {/* Trigger element */}
      {/* <div onClick={togglePopover}>{triggerElement}</div> */}

      {/* Popover content */}
      {isOpen && (
        <div className='absolute bg-white rounded-xl shadow-lg z-50 mt-2 h-[200px] w-[353px] overflow-y-auto max-sm:w-[200px]'>
          {listOfNFts.map((item, index) => (
            <div className='cursor-pointer hover:bg-red-300' key={index}>
              <p className='text-black'>{item.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PopOver;