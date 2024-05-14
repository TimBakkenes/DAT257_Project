
import React from 'react';
import './FactPage.css'; 
import Slider from 'react-slick'; 



export function Factpage() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
    };

    return (
        <div className='Standardpage'>
            <div className='hero-section'>
                <Slider {...settings}>
                        <div>
                            <img src="./dragsecondhand.jpeg" alt="Sustainable goal"/>
                        </div>
                        <div>
                            <img src="./recycle_image.jpg" alt="second hand shop"/>
                        </div>
                </Slider>
                <h1 className="hero-heading">Why Shop Second-Hand?</h1>
            </div>
            <div className="section">
                <h1 className="fact-page-heading">Why Second Hand?</h1>
                <p className="fact-page-text">Today, every decision we make shapes our future, and second hand stands as a beacon of sustainability. Shopping second hand is not just about buying used goods, it is about making a conscious decision to preserve our planet’s resources. Each purchase is a small victory for the environment, disrupts mass-consumption and reduces our carbon footprint. Additionally, purchasing second hand items often supports charitable causes, promotes recycling, and fosters a circular economy. 

By choosing pre-loved items, we align with the United Nations Sustainable Development Goal on Responsible Consumption and Production, aiming to “Ensure sustainable consumption and production patterns”. Specifically, by substantially reducing waste generation through prevention, reduction, recycling, and reuse, second-hand shopping directly supports this goal. Each time we opt for a gently used product, we contribute to the reduction of waste, prolonging the lifespan of items and diverting them from landfills. 

So, let's embrace second-hand shopping as a powerful tool for positive change. With each thoughtful purchase, we become stewards of the earth, champions of sustainability, and agents of a brighter future for all.
</p>
            </div>
            <div className="section">
        <div className="content">
        <div className="text-box">
            <h2 className="fun-facts-heading">Fun facts</h2>
            <p className="fun-facts-text">
            <li>Second-hand shopping offers the thrill of a treasure hunt, with the possibility of discovering unique vintage items that tell stories from the past.</li>
            <li>Many celebrities are avid second-hand shoppers, demonstrating that fashion and style can be sustainable and budget-friendly.</li>
            <li>Buying one used item instead of new can save an average of 1,400 gallons of water, highlighting the significant environmental benefits of second-hand shopping.</li>
            <li>Thrift store chains like Goodwill and Salvation Army have become international phenomena, with locations across the globe offering diverse selections of pre-loved goods.</li>
            <li>The rise of online platforms like Depop, ThredUp, and Poshmark has revolutionized second-hand shopping, making it easier than ever to find unique items and reduce waste from the comfort of home.</li>

            </p>
        </div>
        <div className="image-box">
            <img src="./HyllanArkivet.png" alt="Descriptive Alt Text">
                </img>
        </div>
    </div>
</div>
        </div>
        
    );
}


