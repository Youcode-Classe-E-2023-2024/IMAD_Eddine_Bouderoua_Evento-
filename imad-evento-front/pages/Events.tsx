import Image from "next/image";
import { Inter } from "next/font/google";
import * as components from "@/components/modules"
import { useEffect, useState } from "react";


export default function Events(){
  
    const [detailsHidden, setDetailsHidden] = useState(false);
    const [Events, UpdateEvents] = useState(null);
    const [Eventdetails, Updatedetails] = useState(null);
    const [organiser, setorgan] = useState<boolean | string>(false);
    const [token , settoken] = useState("");
    useEffect(() => {
      components.getCookie('token')
          .then((myCookie) => {
              console.log(myCookie);
              if (!myCookie) return;
              console.log(myCookie + '-k');
              setorgan(myCookie);
          });
      const r = components.gettoken('token');
      settoken(r);
  }, []);
    
    useEffect(() => {
      
      fetchData();
    }, []);
    
    const fetchData = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/GetAllEvents");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
  
        const data = await response.json();
        UpdateEvents(data.Events);  // Update to access "Events" key
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    var x = true
    const toggleDetails = () => {
      setDetailsHidden(!detailsHidden);
    };
    function reserveplace() {
      
      if(!organiser){ return;}
      fetch("http://127.0.0.1:8000/api/reserve", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'token':token,
          },
          body: JSON.stringify({ id: Eventdetails.id }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log(data); // Handle the response data
      })
      .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
      });
  }
  
    const paginatetooleft = () =>{
       console.log("paginateleft") 
       fetchData();
    }
    const paginatetooright = () =>{
        console.log("paginateright") 
        fetchData();
    }
    function article(index){
        console.log(Events[index])
        setDetailsHidden(!detailsHidden);
        Updatedetails(Events[index]);
    }
    return(
        <main className="   w-screen h-full flex flex-col items-center justify-between">
        <components.Base active={2}/>
        <section id="intro" className="bg-gray-800 pb-24   overflow-hidden flex justify-center items-center  ">
  
         <div className="   gap-y-5  grid grid-cols-4 p-10 custom-scrollbar  h-full   z-50 mt-52 container   mx-auto">
        


         {
            Array.isArray(Events) &&
            Events.map((element, index) => (
                <article key={element.id} onClick={() => article(index)} className="relative background transform transition duration-300 hover:scale-105 shadow-lg h-72 w-80 hover:shadow-xl isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 mx-auto">
                <img src={`http://127.0.0.1:8000/api/photo/${element.photo}`} alt="University of Southern California" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>
                <h3 className="z-10 mt-3 text-3xl font-bold text-white">{element.city}</h3>
                <div className="z-10 pb-4 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{element.title}</div>
                </article>
            ))
        }










           </div>
      
            
           <div className="absolute bottom-0 w-12 left-0 h-12 ">
           <div className="btn-conteiner z-50 w-full h-full flex items-center">
      <a onClick={()=>{paginatetooleft()}} className="btn-content   border w-full">
        <span className="icon-arrowl  -pl-5 "> 
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 66 43"
            height="30px"
            width="30px"
          >
            <g
              fillRule="evenodd"
              fill="none"
              strokeWidth="1"
              stroke="none"
              id="arrow"
            >
              <path
                fill="#9ee5fa"
                d="M25.8456067,3.89485454 L22.0236851,0.139296592 C21.8291689,-0.0518420739 21.5173671,-0.0518571125 21.3228325,0.139262789 L0.308386576,20.7848311 C-0.0855801078,21.1718824 -0.0911862806,21.8050225 0.295865,22.1989893 C0.299981242,22.2031791 0.304134312,22.2073326 0.308323758,22.2114492 L21.322902,42.8607841 C21.5174043,43.0519059 21.8291758,43.0519358 22.0237147,42.8608513 L25.8454814,39.1069479 C26.0424848,38.9134427 26.0453207,38.5968729 25.8518155,38.3998695 C25.8497107,38.3977268 25.8475868,38.395603 25.8454438,38.3934985 L9.00622113,21.8567812 C8.80919721,21.6632968 8.80632798,21.3467273 8.99981242,21.1497035 C9.00193527,21.1475418 9.00407772,21.1453995 9.00623949,21.1432767 L25.8454792,4.60825197 C26.0425131,4.41477773 26.0453987,4.09820839 25.8519244,3.90117456 C25.8498374,3.89904911 25.8477314,3.89694235 25.8456067,3.89485454 Z"
                id="arrow-icon-one"
              ></path>
              <path
                fill="#9ee5fa"
                d="M45.8456067,3.89485454 L42.0236851,0.139296592 C41.8291689,-0.0518420739 41.5173671,-0.0518571125 41.3228325,0.139262789 L20.3083866,20.7848311 C19.9144199,21.1718824 19.9088137,21.8050225 20.295865,22.1989893 C20.2999812,22.2031791 20.3041343,22.2073326 20.3083238,22.2114492 L41.322902,42.8607841 C41.5174043,43.0519059 41.8291758,43.0519358 42.0237147,42.8608513 L45.8454814,39.1069479 C46.0424848,38.9134427 46.0453207,38.5968729 45.8518155,38.3998695 C45.8497107,38.3977268 45.8475868,38.395603 45.8454438,38.3934985 L29.0062211,21.8567812 C28.8091972,21.6632968 28.806328,21.3467273 28.9998124,21.1497035 C29.0019353,21.1475418 29.0040777,21.1453995 29.0062395,21.1432767 L45.8454792,4.60825197 C46.0425131,4.41477773 46.0453987,4.09820839 45.8519244,3.90117456 C45.8498374,3.89904911 45.8477314,3.89694235 45.8456067,3.89485454 Z"
                id="arrow-icon-two"
              ></path>
              <path
                fill="#9ee5fa"
                d="M65.8456067,3.89485454 L62.0236851,0.139296592 C61.8291689,-0.0518420739 61.5173671,-0.0518571125 61.3228325,0.139262789 L40.3083866,20.7848311 C39.9144199,21.1718824 39.9088137,21.8050225 40.295865,22.1989893 C40.2999812,22.2031791 40.3041343,22.2073326 40.3083238,22.2114492 L61.322902,42.8607841 C61.5174043,43.0519059 61.8291758,43.0519358 62.0237147,42.8608513 L65.8454814,39.1069479 C66.0424848,38.9134427 66.0453207,38.5968729 65.8518155,38.3998695 C65.8497107,38.3977268 65.8475868,38.395603 65.8454438,38.3934985 L49.0062211,21.8567812 C48.8091972,21.6632968 48.806328,21.3467273 48.9998124,21.1497035 C49.0019353,21.1475418 49.0040777,21.1453995 49.0062395,21.1432767 L65.8454792,4.60825197 C66.0425131,4.41477773 66.0453987,4.09820839 65.8519244,3.90117456 C65.8498374,3.89904911 65.8477314,3.89694235 65.8456067,3.89485454 Z"
                id="arrow-icon-three"
              ></path>
            </g>
          </svg>
        </span>
      </a>
    </div>
           </div>
           
           <div className="absolute bottom-0 w-12 right-4 h-12 ">
           <div className="btn-conteiner z-50 w-full  h-full flex items-center ">
      <a onClick={()=>{paginatetooright()}}  className="btn-content border w-full" >
        <span className="icon-arrow pr-1">
          <svg
            xmlnsXlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            viewBox="0 0 66 43"
            height="30px"
            width="30px"
          >
            <g
              fillRule="evenodd"
              fill="none"
              strokeWidth="1"
              stroke="none"
              id="arrow"
            >
              <path
                fill="#9ee5fa"
                d="M40.1543933,3.89485454 L43.9763149,0.139296592 C44.1708311,-0.0518420739 44.4826329,-0.0518571125 44.6771675,0.139262789 L65.6916134,20.7848311 C66.0855801,21.1718824 66.0911863,21.8050225 65.704135,22.1989893 C65.7000188,22.2031791 65.6958657,22.2073326 65.6916762,22.2114492 L44.677098,42.8607841 C44.4825957,43.0519059 44.1708242,43.0519358 43.9762853,42.8608513 L40.1545186,39.1069479 C39.9575152,38.9134427 39.9546793,38.5968729 40.1481845,38.3998695 C40.1502893,38.3977268 40.1524132,38.395603 40.1545562,38.3934985 L56.9937789,21.8567812 C57.1908028,21.6632968 57.193672,21.3467273 57.0001876,21.1497035 C56.9980647,21.1475418 56.9959223,21.1453995 56.9937605,21.1432767 L40.1545208,4.60825197 C39.9574869,4.41477773 39.9546013,4.09820839 40.1480756,3.90117456 C40.1501626,3.89904911 40.1522686,3.89694235 40.1543933,3.89485454 Z"
                id="arrow-icon-one"
              ></path>
              <path
                fill="#9ee5fa"
                d="M20.1543933,3.89485454 L23.9763149,0.139296592 C24.1708311,-0.0518420739 24.4826329,-0.0518571125 24.6771675,0.139262789 L45.6916134,20.7848311 C46.0855801,21.1718824 46.0911863,21.8050225 45.704135,22.1989893 C45.7000188,22.2031791 45.6958657,22.2073326 45.6916762,22.2114492 L24.677098,42.8607841 C24.4825957,43.0519059 24.1708242,43.0519358 23.9762853,42.8608513 L20.1545186,39.1069479 C19.9575152,38.9134427 19.9546793,38.5968729 20.1481845,38.3998695 C20.1502893,38.3977268 20.1524132,38.395603 20.1545562,38.3934985 L36.9937789,21.8567812 C37.1908028,21.6632968 37.193672,21.3467273 37.0001876,21.1497035 C36.9980647,21.1475418 36.9959223,21.1453995 36.9937605,21.1432767 L20.1545208,4.60825197 C19.9574869,4.41477773 19.9546013,4.09820839 20.1480756,3.90117456 C20.1501626,3.89904911 20.1522686,3.89694235 20.1543933,3.89485454 Z"
                id="arrow-icon-two"
              ></path>
              <path
                fill="#9ee5fa"
                d="M0.154393339,3.89485454 L3.97631488,0.139296592 C4.17083111,-0.0518420739 4.48263286,-0.0518571125 4.67716753,0.139262789 L25.6916134,20.7848311 C26.0855801,21.1718824 26.0911863,21.8050225 25.704135,22.1989893 C25.7000188,22.2031791 25.6958657,22.2073326 25.6916762,22.2114492 L4.67709797,42.8607841 C4.48259567,43.0519059 4.17082418,43.0519358 3.97628526,42.8608513 L0.154518591,39.1069479 C-0.0424848215,38.9134427 -0.0453206733,38.5968729 0.148184538,38.3998695 C0.150289256,38.3977268 0.152413239,38.395603 0.154556228,38.3934985 L16.9937789,21.8567812 C17.1908028,21.6632968 17.193672,21.3467273 17.0001876,21.1497035 C16.9980647,21.1475418 16.9959223,21.1453995 16.9937605,21.1432767 L0.15452076,4.60825197 C-0.0425130651,4.41477773 -0.0453986756,4.09820839 0.148075568,3.90117456 C0.150162624,3.89904911 0.152268631,3.89694235 0.154393339,3.89485454 Z"
                id="arrow-icon-three"
              ></path>
            </g>
          </svg>
        </span>
      </a>
    </div>
           </div>
         </section>  
        {
            Eventdetails &&

         <div className={`w-screen blured h-full flex bottom-0 absolute ${detailsHidden ? 'block' : 'hidden'}`}>
            <div className="relative h-3/5 flex gap-5 border bg-gray-800 p-2 rounded-lg m-auto">

                    <div className="relative flex   justify-center h-full z-50">
        <div className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-gray-200 bg-white">
            <div className="w-full md:w-1/3 bg-white overflow-hidden rounded-xl">
            <img
                src={`http://127.0.0.1:8000/api/photo/${Eventdetails.photo}`}
                alt="tailwind logo"
                className=" rounded-xl object-cover w-full h-40 md:h-full"
            />
            </div>
            <div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
            <div className="flex justify-between items-center  gap-5">
                <p className="text-gray-500 font-medium hidden md:block m-auto">Vacations</p>
                <div className="flex justify-between items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500 " viewBox="0 0 20 20" fill="currentColor">
                    <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg>
                <p className="text-gray-600 font-bold text-sm ml-1 m-auto">
                    4.96
                    <span className="text-gray-500 font-normal">(76 reviews)</span>
                </p>
                </div>
                <div className="">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                    clip-rule="evenodd"
                    />
                </svg>
                </div>
                <div className="bg-gray-200 px-3 py-1 rounded-full text-xs font-medium text-gray-800 hidden md:block">
                {Eventdetails.categories}
                </div>
            </div>
            <h3 className="font-black text-gray-800 md:text-3xl text-xl">{Eventdetails.title}</h3>
            <p className="md:text-lg text-gray-500 text-base">
            {Eventdetails.description}
            </p>
            <p className="text-xl font-black  text-gray-800">
            {Eventdetails.price}
                <span className="font-normal text-gray-600 text-base">/All included</span>
            </p>
            <p className="text-xl font-black  text-gray-800">
            {Eventdetails.places}
                <span className="font-normal text-gray-600 text-base">/Participants</span>
            </p>
        <div className=" h-24 w-60 pt-8  ">
            {
                (!organiser || organiser === 'user') ?
                <button onClick={()=>{reserveplace()}} className="group m-auto cursor-pointer hover:scale-105 relative cursor-default w-[180px] h-[60px] bg-[linear-gradient(144deg,_#4CAF50,_#4CAF50_50%,_#00FF7F)] text-white whitespace-nowrap flex flex-wrap rounded-lg overflow-hidden">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">Reserve Place</span>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.5s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.5s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.9s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.45s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.6s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.65s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.15s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.55s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.85s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.4s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.55s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.25s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.35s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.3s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.05s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[3.05s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.15s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.75s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[3.2s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.1s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.8s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.9s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent delay-0"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.05s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.15s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.85s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[0.6s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.1s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.3s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[1.6s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.7s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.9s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.75s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.2s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.8s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.1s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[2.7s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.55s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.15s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.65s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.65s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.45s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.1s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[0.85s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.7s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.5s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.25s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.65s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.25s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[2.6s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[2.2s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[1.45s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[2.55s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[0.2s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[1s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.25s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.35s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.45s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.5s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.8s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.3s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.3s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.4s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.4s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.75s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.05s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.35s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.4s]"></div>
                <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.35s]"></div>
              </button>
                :


        <button  className="group m-auto cursor-pointer hover:scale-105 relative cursor-default w-[180px] h-[60px] bg-[linear-gradient(144deg,_#4CAF50,_#4CAF50_50%,_#00FF7F)] text-white whitespace-nowrap flex flex-wrap rounded-lg overflow-hidden">
  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">{Eventdetails.placestoked} / {Eventdetails.places} Reserved</span>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.5s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.5s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.9s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.45s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.6s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.65s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.15s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.55s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.85s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.4s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.55s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.25s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.35s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.3s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.05s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[3.05s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.15s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.75s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[3.2s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3.1s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.8s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.9s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent delay-0"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.05s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.15s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[3s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.85s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[0.6s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.1s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.3s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[1.6s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.7s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.9s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.75s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.2s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.8s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.1s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[2.7s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.55s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.15s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.65s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.65s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.45s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.1s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[0.85s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.7s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.5s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.25s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.65s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.25s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[2.6s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[2.2s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[1.45s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[2.55s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[0.2s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:blur-none group-focus:delay-[1s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.25s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.35s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.45s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.5s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.8s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.3s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.3s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.4s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.4s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.75s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.05s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[2.35s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[0.4s]"></div>
  <div className="w-[10px] h-[10px] blur-[5px] bg-[rgb(0,128,0)] delay-[0.2s] duration-[0.4s] hover:bg-transparent hover:delay-0 hover:duration-0 group-focus:bg-transparent group-focus:delay-[1.35s]"></div>
</button>
            }
        </div>
            </div>
        </div>
                    </div>
                    {organiser ==='organizer' && <components.CardLineChart id={1} />}

                    <div className=" w-10 ">
                    <img onClick={() => toggleDetails()} width="48" className=" hover:scale-110 hover:cursor-pointer " height="48" src="https://img.icons8.com/color/48/delete-sign--v1.png" alt="delete-sign--v1"/>
                    </div>
            </div>
      
        </div>
         }
           
       </main>
    )
}