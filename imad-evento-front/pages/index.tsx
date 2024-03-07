import Image from "next/image";
import { Inter } from "next/font/google";
import * as components from "@/components/modules"

// Load Inter font with the "latin" subset
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-screen h-screen flex flex-col items-center justify-between">
     <components.Base active={1}/>
  
     <section id="intro" className="bg-gray-800  flex justify-center items-center  ">
      <div className=" z-50 mt-10 container flex flex-col justify-center items-center mx-auto px-6 py-16">
          <h1 className="gap-3 text-4xl md:text-5xl w-2/4 text-wrap justify-center items-center flex flex-col lg:text-6xl mb-4">
             <span> <h1 className=" text-white"> The Annual </h1> <span className="text-blue-500">Marketing</span></span> Conference
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-4">
            10-12 December, Downtown Conference Center, New York
          </p>
          <a
            href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
            className="venobox play-btn mb-4"
            data-vbtype="video"
            data-autoplay="true"
          ></a>
          <button id="btn">About The Event</button>
        </div>
      </section>  
    </main>
  );
}



{/* <div className="container mx-auto px-6 py-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4">
            The Annual<span className="text-blue-500">Marketing</span> C;lk,onference
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl mb-4">
            10-12 December, Downtown Conference Center, New York
          </p>
          <a
            href="https://www.youtube.com/watch?v=jDDaplaOz7Q"
            className="venobox play-btn mb-4"
            data-vbtype="video"
            data-autoplay="true"
          ></a>
          <a
            href="#about"
            className="inline-block px-6 py-3 bg-blue-500 text-white rounded-full text-lg hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            About The Event
          </a>
        </div> */}