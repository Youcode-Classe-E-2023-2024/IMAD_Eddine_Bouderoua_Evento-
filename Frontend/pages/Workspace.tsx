import Image from "next/image";
import { Inter } from "next/font/google";
import * as components from "@/components/modules"
import { useState } from "react";
export default function Events(){
    const [activeBtn, setActiveBtn] = useState('events');
    const [photo, setphoto] = useState(null);

    const [detailsHidden, setDetailsHidden] = useState(false);
    const organiser = true;
    const toggleDetails = () => {
      setDetailsHidden(!detailsHidden);
    };

    const toggleColor = (btn:string) => {
      setActiveBtn(btn);
    };

    function declinereservation(){

    }
    function acceptreservation(){

    }
    function newEvent(){
        setDetailsHidden(!detailsHidden);
    }
    function photouploded(event:any){
        const file = event.target.files[0];
   
    console.log('Uploaded file:', file);
    setphoto(file);
    }

    const [formData, setFormData] = useState({
        eventName: '',
        eventDate: '',
        places: '',
        city: '',
        categories: '',
        manualReview: false,
        description: '',
        price:'',
      });
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: type === 'checkbox' ? checked : value,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Prepare data for request
        const requestData = {
          event_name: formData.eventName,
          event_date: formData.eventDate,
          places: formData.places,
          city: formData.city,
          categories: formData.categories,
          manual_review: formData.manualReview,
          description: formData.description,
          photo: photo,
          price: formData.price,
        };
      
        try {
          const formToSend = new FormData();
          formToSend.append('event_name', requestData.event_name);
          formToSend.append('event_date', requestData.event_date);
          formToSend.append('places', requestData.places);
          formToSend.append('city', requestData.city);
          formToSend.append('categories', requestData.categories);
          formToSend.append('manual_review', requestData.manual_review);
          formToSend.append('description', requestData.description);
          formToSend.append('photo', requestData.photo);
          formToSend.append('price', requestData.price);
      
          // Make the POST request
          const response = await fetch('http://127.0.0.1:8000/api/addEvent', {
            method: 'POST',
            body: formToSend,
          });
      
          if (response.ok) {
            console.log('Event added successfully!');
          } else {
            console.error('Failed to add event. Status:', response.status);
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
      
      
    return(
        <main className="   w-screen h-full flex flex-col items-center justify-between">
        <components.Base active={8}/>
        <section id="intro" className="bg-gray-800 pb-32  overflow-hidden flex justify-center items-center  ">
         <div className="   gap-y-5   p-10 custom-scrollbar  h-full   z-50 mt-52 container   mx-auto">
            
        <div className=" rounded-2xl h-full custom-scrollbar organiserdiv">
        <div className="switcherorg  w-2/5 border m-auto h-8 flex justify-between items-center   ">
            <div onClick={() => toggleColor('events')}
        className={`h-full w-2/4 border text-center  cursor-pointer select-none ${
          activeBtn === 'events' ? 'red' : 'lightred'
        }`} >Events</div>
            <div onClick={() => toggleColor('requests')}
        className={`h-full w-2/4 border text-center cursor-pointer select-none ${
          activeBtn === 'requests' ? 'blue' : 'lightblue'
        }`} >Requests</div>
        </div>
        
                    <div className="relative overflow-x-auto shadow-md  sm:rounded-lg">
                {
                    activeBtn === 'events' &&

                <table className={` min-w-full  text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
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
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple MacBook Pro 17"
                            </th>
                            <td className="px-6 py-4">
                                Silver
                            </td>
                            <td className="px-6 py-4">
                                Laptop
                            </td>
                            <td className="px-6 py-4">
                                $2999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Microsoft Surface Pro
                            </th>
                            <td className="px-6 py-4">
                                White
                            </td>
                            <td className="px-6 py-4">
                                Laptop PC
                            </td>
                            <td className="px-6 py-4">
                                $1999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Magic Mouse 2
                            </th>
                            <td className="px-6 py-4">
                                Black
                            </td>
                            <td className="px-6 py-4">
                                Accessories
                            </td>
                            <td className="px-6 py-4">
                                $99
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Google Pixel Phone
                            </th>
                            <td className="px-6 py-4">
                                Gray
                            </td>
                            <td className="px-6 py-4">
                                Phone
                            </td>
                            <td className="px-6 py-4">
                                $799
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        <tr>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple Watch 5
                            </th>
                            <td className="px-6 py-4">
                                Red
                            </td>
                            <td className="px-6 py-4">
                                Wearables
                            </td>
                            <td className="px-6 py-4">
                                $999
                            </td>
                            <td className="px-6 py-4">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                }
                {
                    activeBtn === 'requests' &&
                <table className={` w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Requests
                            </th>
                            <th scope="col" className="px-6 py-3">
                                User
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Date
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Approve
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Decline
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      
                     
                 
                        <tr>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                Apple Watch 5
                            </th>
                            <td className="px-6 py-4">
                                Red
                            </td>
                            <td className="px-6 py-4">
                                Wearables
                            </td>
                            <td className="px-6 py-4">
                            <img onClick={()=>{declinereservation()}} width="30" height="30" src="https://img.icons8.com/color/30/checked-2--v1.png" alt="checked-2--v1"/>
                            </td>
                            <td className="px-6 py-4">
                            <img onClick={()=>{acceptreservation()}} width="30" height="30" src="https://img.icons8.com/office/30/cancel.png" alt="cancel"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
                }
            </div>
            
            </div>
            <div className="w-full h-16 flex justify-between  items-center  mt-10">
                <div onClick={()=>{newEvent()}} className="button flex  text-center  justify-center items-center">Create New Event</div>
                <div className="red-button flex  text-center  justify-center items-center">Delete Account</div>
            </div>
           </div>
         </section>  


         <div className={`w-screen blured h-full flex bottom-0 absolute ${detailsHidden ? 'block' : 'hidden'}`}>
            
        
                <div className="h-4/5 w-3/5 m-auto ">
                <div className="w-full  flex flex-col  items-center justify-center h-full dark">
  <div className="w-full bg-gray-800 rounded-lg shadow-md p-6 border flex ">
  <img onClick={() => newEvent()} width="48" className=" absolute   right-80 top-26  hover:scale-110 hover:cursor-pointer " height="48" src="https://img.icons8.com/color/48/delete-sign--v1.png" alt="delete-sign--v1"/>
    <div className="w-2/4">

    <h2 className="text-2xl font-bold text-gray-200 mb-4">Contact Form</h2>

    <form className="flex flex-wrap p-2" onSubmit={handleSubmit}>
      <input
        type="text"
        name="eventName"
        value={formData.eventName}
        onChange={handleChange}
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
        placeholder="Event Name"
      />

      <input
        type="date"
        name="eventDate"
        value={formData.eventDate}
        onChange={handleChange}
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
        placeholder="Date"
      />

      <input
        type="number"
        name="places"
        value={formData.places}
        onChange={handleChange}
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] mr-[2%]"
        placeholder="Places"
      />

      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
        placeholder="City"
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full md:w-[48%] ml-[2%]"
        placeholder="price"
      />

      <input
        type="text"
        name="categories"
        value={formData.categories}
        onChange={handleChange}
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-4 focus:bg-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150 w-full mx-10"
        placeholder="Categories"
      />

      <div className="flex items-center bg-gray-700 m-auto mb-3">
        <div className="content">
          <label className="checkBox relative inline-block">
            <input
              type="checkbox"
              name="manualReview"
              checked={formData.manualReview}
              onChange={handleChange}
              className="hidden"
            />
            <div className="transition absolute top-0 left-0 w-4 h-4 bg-white border border-gray-300 rounded-md"></div>
          </label>
        </div>
        <span className="ml-2 text-white">Manual review?</span>
      </div>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="bg-gray-700 text-gray-200 border-0 rounded-md p-2 mb-auto md:mb-auto md:w-full md:h-auto md:min-h-[100px] md:max-h-[100px] md:flex-grow md:flex-shrink md:flex-auto focus:bg-gray-md:focus:outline-none:focus:ring-blue-md:focus:border-transparent transition ease-in-out duration-fastest"
        placeholder="Description"
      ></textarea>

      <button
        type="submit"
        className="m-auto bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
      >
        Validate
      </button>
    </form>
    </div>
    <div className="h-full w-2/4  flex">
    <label  className="custum-file-upload">
        <div className="icon">
        <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
        </div>
        <div className="text">
        <span>Click to upload image</span>
        </div>
        <input name="photo" onChange={photouploded} id="file" type="file"/>
    </label>

    </div>
       

       
  </div>
</div>

                </div>
                   
                  
        
      
        </div>
       </main>
    )
}