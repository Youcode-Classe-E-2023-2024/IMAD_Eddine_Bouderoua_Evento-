import Image from "next/image";
import { Inter } from "next/font/google";
import * as components from "@/components/modules"

export default function Organizers(){
    return(
        <main className="   w-screen h-full flex flex-col items-center justify-between">
        <components.Base active={3}/>
        <section id="intro" className="bg-gray-800 pb-32  overflow-hidden flex justify-center items-center  ">
         <div className="   gap-5 pt-20  p-32 custom-scrollbar  h-full   z-50 mt-52 container   mx-auto">
            <div className=" w-full h-full ">
                <div className="grid grid-cols-5 w-full h-full gap-y-5">
                <div className="cardo">
                        <div className="bg"></div>
                        <div className="blob"></div>
                    </div>
                    <div className="cardo">
                        <div className="bg"></div>
                        <div className="blob"></div>
                    </div>
                    <div className="cardo">
                        <div className="bg"></div>
                        <div className="blob"></div>
                    </div>
                    <div className="cardo">
                        <div className="bg"></div>
                        <div className="blob"></div>
                    </div>
                    <div className="cardo">
                        <div className="bg"></div>
                        <div className="blob"></div>
                    </div>
                </div>
                    
            </div>

        
 

                <div className="button flex  text-center  justify-center items-center">Become Organizer</div>
                <div className="w-3/5 pt-10 m-auto  -mb-16 text-mono text-white  text-lg"><span className=" mx-3 underline text-red-700">Why Become Organizer ? What is the Profit ?</span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempore molestias ipsum, atque a recusandae ex ducimus possimus, eos, doloremque esse repellendus aliquid perspiciatis minima quis! Laudantium earum rem facilis dolorem? </div>
           </div>
        </section>  
       </main>
    )
}