import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-blueGray-200 pt-8 pb-6">
      <div className="container-fluid mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
              
        </div>
        <hr className="my-6 border-blueGray-300" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
            <div className="text-sm text-blueGray-500 font-semibold py-1">
              Copyright © <span id="get-current-year">2024</span><h6 className="text-blueGray-500 hover:text-gray-800" target="_blank"> Made in India</h6>
              <h6 className="text-blueGray-500 hover:text-blueGray-800"> Creative Team Eventify</h6>.
            </div>
          </div>
        </div>
        </div>
    </footer>
  );
};

export default Footer;
