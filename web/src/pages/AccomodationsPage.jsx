import React from 'react';
import courtyardMarriott from '../static/images/courtyardMarriott.jpg';
import bestWesterPlus from '../static/images/bestWesternPlus.jpg';
import americasBestValueInn from '../static/images/americasBestValueInn.jpg';
import daysInn from '../static/images/daysInn.jpg';
import innMarin from '../static/images/innMarin.jpg';

export function AccomodationsPage() {
    return (
        <div className="container">
            <div className="accomodations">
                <h2>COURTYARD BY MARRIOTT NOVATO MARIN/SONOMA</h2>
                <img src={courtyardMarriott}/>
                <h3>1400 N Hamilton pkwy, Novato, CA</h3>
                <p>
                    Stay in one of 136 guestrooms featuring flat-screen televisions. 
                    Complimentary wireless Internet access keeps you connected, and cable programming is available for 
                    your entertainment. Partially open bathrooms with shower/tub combinations feature complimentary 
                    toiletries and hair dryers. Conveniences include phones, as well as desks and coffee/tea makers. 
                    Enjoy a meal at the restaurant or snacks in the hotel's coffee shop/café. 
                    Wrap up your day with a drink at the bar/lounge. Cooked-to-order breakfasts are available daily 
                    from 6:00 AM to 11:00 AM for a fee.
                </p>
                <a 
                    href="https://www.marriott.com/hotels/travel/sfonv-courtyard-novato-marin-sonoma"
                    target="_blank"
                    rel="noopener noreferrer"
                >Website</a>
            </div>
            <div className="accomodations">
                <h2>BEST WESTERN PLUS NOVATO OAKS INN</h2>
                <img src={bestWesterPlus}/>
                <h3>215 Alemeda Del Prado, Novato, CA</h3>
                <p>
                    Make yourself at home in one of the 108 air-conditioned rooms featuring refrigerators and microwaves. 
                    Complimentary wired and wireless Internet access keeps you connected, 
                    and flat-screen televisions are provided for your entertainment. 
                    Private bathrooms have complimentary toiletries and hair dryers. 
                    Conveniences include complimentary newspapers and coffee/tea makers, 
                    as well as phones with free local calls. 
                    A complimentary continental breakfast is served daily from 6:00 AM to 10:00 AM.
                </p>
                <a 
                    href="https://www.bestwestern.com/en_US/book/hotels-in-novato/best-western-plus-novato-oaks-inn/propertyCode.05548.html"
                    target="_blank"
                    rel="noopener noreferrer"
                >Website</a>
            </div>
            <div className="accomodations">
                <h2>AMERICAS BEST VALUE INN NOVATO MARIN SONOMA</h2>
                <img src={americasBestValueInn}/>
                <h3>7600 Redwood blvd, Novato, CA</h3>
                <p>
                    Make yourself at home in one of the 55 guestrooms. 
                    Complimentary wireless Internet access keeps you connected, 
                    and cable programming is available for your entertainment. 
                    Private bathrooms with shower/tub combinations feature deep soaking bathtubs and complimentary toiletries. 
                    Conveniences include fans and irons/ironing boards, as well as phones with free local calls. 
                    With a stay at Americas Best Value Inn Novato Marin Sonoma, you'll be centrally located in Novato. 
                    Be sure to enjoy recreational amenities including an outdoor pool and a spa tub. 
                    Featured amenities include express check-out, a 24-hour front desk, and multilingual staff. 
                    Free self parking is available onsite. A complimentary continental breakfast is served daily from 6 AM to 9 AM.
                </p>
                <a 
                    href="https://www.redlion.com/americas-best-value-inn/ca/novato/americas-best-value-inn-novato-marin-sonoma"
                    target="_blank"
                    rel="noopener noreferrer"
                >Website</a>
            </div>
            <div className="accomodations">
                <h2>DAYS INN BY WYNDHAM NOVATO/SAN FRANCISCO</h2>
                <img src={daysInn}/>
                <h3>8141 Redwood blvd, Novato, CA</h3>
                <p>
                    Located near Olompali State Historic Park, 
                    make yourself at home in one of the 56 air-conditioned rooms featuring flat-screen televisions. 
                    Rooms have private balconies. 
                    Complimentary wireless Internet access keeps you connected, 
                    and satellite programming is available for your entertainment. 
                    Private bathrooms with shower/tub combinations feature complimentary toiletries and hair dryers. 
                    Free self parking is available onsite.
                </p>
                <a
                    href="https://www.wyndhamhotels.com/days-inn/novato-california/days-inn-novato-san-francisco/overview"
                    target="_blank"
                    rel="noopener noreferrer"
                >Website</a>
            </div>
            <div className="accomodations">
                <h2>INN MARIN AND SUITES, ASCEND HOTEL COLLECTION</h2>
                <img src={innMarin}/>
                <h3>250 Entrada dr, Novato, CA</h3>
                <p>
                    Make yourself at home in one of the 70 air-conditioned rooms featuring refrigerators 
                    and flat-screen televisions. Your pillowtop bed comes with premium bedding. 
                    Digital programming and iPod docking stations are provided for your entertainment, 
                    while complimentary wired Internet access keeps you connected. 
                    Private bathrooms with showers feature complimentary toiletries and hair dryers. 
                    With a stay at Inn Marin and Suites, Ascend Hotel Collection in Novato, you'll be near the airport,
                    within a 15-minute drive of Sonoma Raceway and The Space Station Museum. 
                    Free self parking is available onsite. 
                    A complimentary continental breakfast is served daily from 6 AM to 10 AM.
                </p>
                <a
                    href="https://www.choicehotels.com/california/novato/ascend-hotels/caf88?mc=llgoxxpx"
                    target="_blank"
                    rel="noopener noreferrer"
                >Website</a>
            </div>
        </div>
    )
}