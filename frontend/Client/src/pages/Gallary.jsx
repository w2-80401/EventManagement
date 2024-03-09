import React from 'react';
import Footer from '../components/Footer';

function Gallery() {
    return (
        <>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/austin-neill-hgO1wFPXl3I-unsplash.jpg")} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/chuttersnap-cX2vElQ5aHk-unsplash (copy).jpg")} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/danny-howe-bn-D2bCvpik-unsplash.jpg")} alt="" />
                </div>
            </div>
            <div className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/edwin-andrade-4V1dC_eoCwg-unsplash copy.jpg")} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/evangeline-shaw-nwLTVwb7DbU-unsplash.jpg")} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/headway-F2KRf_QfCqw-unsplash.jpg")} alt="" />
                </div>
            </div>
            <div className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/michael-lee-5Z9bgfRZLLE-unsplash.jpg")} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/victoria-priessnitz-JFAPl7brL6U-unsplash.jpg")} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/yvette-de-wit-NYrVisodQ2M-unsplash.jpg")} alt="" />
                </div>
            </div>
            <div className="grid gap-4">
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/britt-gaiser-hSAlu33padA-unsplash.jpg")} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/austin-distel-rxpThOwuVgE-unsplash.jpg")} alt="" />
                </div>
                <div>
                    <img className="h-auto max-w-full rounded-lg" src={require("../images/leonardo-miranda-riHGdvluDk8-unsplash.jpg")} alt="" />
                </div>
            </div>
            
        </div>
        <Footer/>
        </>
        
        
    );
}

export default Gallery;
