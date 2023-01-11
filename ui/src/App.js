
import './App.css';


import {useEffect, useState} from 'react';
import getData from './functions/getData';
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { RiPinDistanceLine } from "react-icons/ri";
import { GiNestBirds } from "react-icons/gi";

const apiUrl = "/api";

function App() {

 let [drones, setDrones] = useState([]);
 
  useEffect(() => {
    const intervalId = 
    setInterval(
      () => getData(apiUrl)
      .then((data) => {
        if(data) setDrones(data);
      }
      ),
      2000
    );
    return () => clearInterval(intervalId);

}, [drones]);

  return (
    <div className="App">
      <div className='appHeader'>
        <div className="appHeader-inner">
          <h1><GiNestBirds/> Birdnest Project</h1>
          <h2>We know who is the most enthusiastic observer!</h2>
        </div>
     <p className='appContribution'>Photo by <a href="https://unsplash.com/@snisaac?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Samuel Isaac</a> on <a href="https://unsplash.com/photos/83AdeG3iPMk?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  </p>

      </div>
      <div className="appBody">
        <div className="appFieldWrap">
          <div className="appField">
            <div className="appNfz">
              <div className="appNest"><GiNestBirds/></div>
            </div>
            {
              drones.map((drone) =>  <div className="appDrone" key = {drone.serialNumber}
              style={{ bottom: Math.floor(drone.positionY / 1000), left: Math.floor(drone.positionX / 1000) }}></div>)
            }
          </div>
        </div>
        <h1>Current Violators</h1>
        <div className='dronesList'>
          
          {
            drones.map((drone) =>
            <div key = { drone.serialNumber } className = 'pilotCard'>
             { Object.keys(drone.pilot).length ? <h3>{ drone.pilot.firstName } { drone.pilot.lastName }</h3> : <h3>S/N: { drone.serialNumber }</h3> }
             { drone.pilot.email && <div className='pilotDetail'><AiOutlineMail/> { drone.pilot.email }</div> }
              { drone.pilot.phoneNumber && <div className='pilotDetail'><AiOutlinePhone/> { drone.pilot.phoneNumber }</div> }
              { drone.distance && <div className='pilotDetail'><RiPinDistanceLine/> { Math.floor(drone.distance) }</div> }
            </div>
            )
          }
        </div>

      </div>
    </div>
  );
}

export default App;
