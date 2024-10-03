import React from 'react';
import '../../src/ticket.css'; // Import the CSS file for styling
import worship from '../images/worship.jpg'
import qrcode from '../images/qrcode.png'

const TicketView = () => {
  return (
    <div className="ticket-container">
      <div className="ticket-header">
        <div>
          <h2>Payment Confirmed</h2>
          <p>Booking ID #2122AB3</p>
        </div>
        <button className="done-button">Done</button>
      </div>

      <div className="ticket-body">
        <img
          src={worship}
          alt="EDM Event"
          className="event-image"
        />

        <div className="event-details">
                <div className="event-info">
                    <h2>Great Sundays</h2>
                    <p>KL Church</p>
                    <p>December 24</p>
                    <p>
                    SAT 29 – SUN 30 <br />
                    10:00 PM – 4:00 AM CAT
                    </p>
                </div>
         
                    <div className="location-info">
                        <div>
                            <h2>Location</h2>
                            <p>
                            Wits <br />
                            Bozzoli <br />
                            Johannesburg 2000 <br />
                            South AFrica
                            </p>
                        </div>
                    </div>


                
          </div>
          <div  className='ticket-bottom'>
                    
                    <div className="qr-code">
                        <img src={qrcode}alt="QR Code" />
                    </div>

                    <div className='datehandle'>
                        <span className='datehandle-date'>
                            <h1>29</h1>
                        </span>
                        <span className='datehandle-date'>
                            <h1>Dec</h1>
                        </span>
                    </div>
                </div>
      </div>
    </div>
    
  );
};

export default TicketView;
