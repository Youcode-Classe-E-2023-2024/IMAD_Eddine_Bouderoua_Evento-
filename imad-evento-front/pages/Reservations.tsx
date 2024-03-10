import Image from "next/image";
import { Inter } from "next/font/google";
import * as components from "@/components/modules"
import { useEffect,useState } from "react";
export default function Organizers(){
    const [token , settoken] = useState("");
    const [reservations , setreservztions] = useState(null);

    useEffect(() => {
      components.getCookie('token')
          .then((myCookie) => {
              console.log(myCookie);
              if (!myCookie) return; //window.location = './'
          });
      const r = components.gettoken('token');
      settoken(r);

      
      
  }, []);
  useEffect(() => {
    const fetchData = async () => {
        fetch("http://127.0.0.1:8000/api/GetAllreservations", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "token": token
            },
          })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setreservztions(data);
            })
            .catch(error => {
              console.error('Error:', error);
            });
    };
  
    fetchData();
  }, [token]);
  const generatePDF = async (event) => {

    


    try {
      const response = await fetch('/api/script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: event.name, place: event.place, date: event.date,places:event.places }),  // Send the event directly without wrapping it in an object
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('PDF created successfully');
      } else {
        console.error('Error creating PDF:', data.message);
      }
    } catch (error) {
      console.error('Error creating PDF:', error.message);
    }
  };
  

    return(
        <main className="   w-screen h-full flex flex-col items-center justify-between">
        <components.Base active={4}/>
        <section id="intro" className="bg-gray-800 pb-32  overflow-hidden flex justify-center items-center  ">
        
        <div className="relative overflow-x-auto shadow-md h-full flex justify-center items-center sm:rounded-lg">
                <table className="w-full overflow-y-auto text-sm text-left  custom-scrollbar mt-20 max-h-80   rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Event 
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Place
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Places
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        
                      
                    {
                        reservations && reservations.events.map((event, index) => (
                            <tr key={index}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {event.name}
                                </th>
                                <td className="px-6 py-4">
                                    {event.place}
                                </td>
                                <td className="px-6 py-4">
                                    {event.places}
                                </td>
                                <td className="px-6 py-4">
                                    {event.date}
                                </td>
                                <td className="px-6 py-4">
                                    {event.validated === 'ok' ? (
                                        <a href="#" onClick={() => generatePDF(event)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Get Ticket/pdf</a>
                                    ) : (
                                        'Not Validated'
                                    )}
                                </td>
                            </tr>
                        ))
                    }
                  
                        

                    </tbody>
                </table>
            </div>
        

                
        </section>  
       </main>
    )
}