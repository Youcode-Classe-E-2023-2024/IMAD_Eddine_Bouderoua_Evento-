import React, { useEffect } from 'react';
import Html5QrcodeScanner from 'html5-qrcode';


const QRCodeScanner = () => {
  useEffect(() => {
    function onScanSuccess(decodeText, decodeResult) {
      alert('Your QR is: ' + decodeText, decodeResult);
    }

    const htmlScanner = new Html5QrcodeScanner('my-qr-reader', {
        fps: 10,
        qrbox: 250,
      });
      

    htmlScanner.render(onScanSuccess);

    // Cleanup the scanner when the component unmounts
    return () => {
      htmlScanner.clear();
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-400">
      <div className="max-w-md w-full bg-white p-6 rounded-md shadow-md">
        <h1 className="text-2xl font-bold mb-6">Scan QR Codes</h1>
        <div className="border p-4 rounded-md">
          <div id="my-qr-reader"></div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeScanner;
