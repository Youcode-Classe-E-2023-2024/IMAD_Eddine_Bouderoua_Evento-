import Image from "next/image";
import { Inter } from "next/font/google";
import * as components from "@/components/modules"
import { useState , useEffect } from "react";
export default function Organizers(){
    const [photo, setphoto] = useState(null);
    const [hiddenphoto, sethiddenphoto] = useState(false);

    const [data, setData] = useState(null);

    const [Role,setRole] = useState<boolean | string>(false);

 useEffect(() => {
  components.getCookie('token')
      .then((myCookie) => {
          console.log(myCookie);
          if (!myCookie) return;
 
          setRole(myCookie);
      });
}, []);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://127.0.0.1:8000/api/Organizers');
          const result = await response.json();
          console.log(result.Organizers)
          setData(result.Organizers); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []); 
    // useEffect(() => {
    //     console.log(data)
    //     console.log("hihihihi")
    //   }, [data]); 

    function photouploded(event:any){
        const file = event.target.files[0];
   
    console.log('Uploaded file:', file);
   
    setphoto(file);
    }

    function RequesteOrganiser() {
        sethiddenphoto(!hiddenphoto);
        if(!photo) return;
    
        const formToSend = new FormData();
        formToSend.append('photo', photo);
        formToSend.append('g', "k");
    
        fetch("http://127.0.0.1:8000/api/Updatetoorganizer", {
            method: 'POST',
            headers: {
                'Token': '5',
            },
            body: formToSend,
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
    
    
   

    
    
      
    return(
        <main className="   w-screen h-full flex flex-col items-center justify-between">
        <components.Base active={3}/>
        <section id="intro" className="bg-gray-800 pb-32  overflow-hidden flex justify-center items-center  ">
         <div className="   gap-5 pt-20  p-32 custom-scrollbar  h-full   z-50 mt-52 container   mx-auto">
            <div className=" w-full h-full ">
                <div className="grid grid-cols-5 w-full h-full gap-y-5">
               
                {
                    data &&
                    data.map((element) => (
                        <div key={element.id} className="cardo">
                            <div className={`bg bg-[http://127.0.0.1:8000/api/photo/${element.photo}]`}>
                                {element.photo ? (
                                    <img className="h-full" src={`http://127.0.0.1:8000/api/photo/${element.photo}`} alt="" />
                                ) : (
                                    <div className="bg-white w-full h-full"></div>
                                )}
                            </div>
                            <div className="blob"></div>
                        </div>
                    ))
                }


                </div>
                    
            </div>

        {
            hiddenphoto && 
            <label  className="absolute custum-file-upload">
        <div className="icon">
        <svg viewBox="0 0 24 24" fill="" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M10 1C9.73478 1 9.48043 1.10536 9.29289 1.29289L3.29289 7.29289C3.10536 7.48043 3 7.73478 3 8V20C3 21.6569 4.34315 23 6 23H7C7.55228 23 8 22.5523 8 22C8 21.4477 7.55228 21 7 21H6C5.44772 21 5 20.5523 5 20V9H10C10.5523 9 11 8.55228 11 8V3H18C18.5523 3 19 3.44772 19 4V9C19 9.55228 19.4477 10 20 10C20.5523 10 21 9.55228 21 9V4C21 2.34315 19.6569 1 18 1H10ZM9 7H6.41421L9 4.41421V7ZM14 15.5C14 14.1193 15.1193 13 16.5 13C17.8807 13 19 14.1193 19 15.5V16V17H20C21.1046 17 22 17.8954 22 19C22 20.1046 21.1046 21 20 21H13C11.8954 21 11 20.1046 11 19C11 17.8954 11.8954 17 13 17H14V16V15.5ZM16.5 11C14.142 11 12.2076 12.8136 12.0156 15.122C10.2825 15.5606 9 17.1305 9 19C9 21.2091 10.7909 23 13 23H20C22.2091 23 24 21.2091 24 19C24 17.1305 22.7175 15.5606 20.9844 15.122C20.7924 12.8136 18.858 11 16.5 11Z" fill=""></path> </g></svg>
        </div>
        <div className="text">
        <span>Click to upload image</span>
        </div>
        <input name="photo" onChange={photouploded} id="file" type="file"/>
    </label>
        }
        {
            Role === 'user'
            &&
                <div onClick={() => {RequesteOrganiser()}} className="button flex  text-center  justify-center items-center">Become Organizer</div>
        }
        {
            Role === 'user' 
            &&
                <div className="w-3/5 pt-10 m-auto  -mb-16 text-mono text-white  text-lg"><span className=" mx-3 underline text-red-700">Why Become Organizer ? What is the Profit ?</span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore molestias ipsum, atque a recusandae ex ducimus possimus, eos, doloremque esse repellendus aliquid perspiciatis minima quis! Laudantium earum rem facilis dolorem? </div>
        }
           </div>
        </section>  
       </main>
    )
}