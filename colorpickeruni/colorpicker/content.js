// console.log('this is contentjs');

// chrome.runtime.onMessage.addListener(function (request) {
//     console.log(working);
//     if (request.message === "colorPicker") {
//         console.log("this is console for content js");
           
//         // async function pickcolor() {
//             try {
//                 const eyeDropper = new EyeDropper();
//                 let eyr = await eyeDropper.open();
//                 console.log(eyr,"for eyr");

//                 const final = await eyr.sRGBHex
//                 console.log([final], "for final")
//                 chrome.runtime.sendMessage({
//                     message:"code",
//                     value:final
//                 })
//             }
//             catch (err) {
//                 console.error(err);
//             }
//         }
//         pickcolor();

//     }
// })