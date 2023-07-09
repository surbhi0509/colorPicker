const btn = document.querySelector(".changeColorBtn");
const deletee = document.querySelector(".clear");
const colorGrid = document.querySelector(".colorgrid");
const colorValuehex = document.querySelector(".colorvalue");
const colorValueRGB = document.querySelector(".colorvalue2");
const colorpicked=document.querySelector(".colorvalue1")
const displayPre = document.querySelector(".dataPre");
const perviousColors = document.getElementById("perviouscolors");
const choose_Color = document.querySelector(".choosecolor");
const pick_Color = document.querySelector(".pickcolor");
const newColorValue_hex = document.querySelector(".colorvalue_pre-hex");
const newColorValue_rgb = document.querySelector(".colorvalue_pre-rgb");
const pickedColorValue = document.querySelector(".colorvaluePre");

let itemJsonArray = [];

pick_Color.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("clicked");
  document.getElementsByClassName("left1")[0].style.display = "none";
  document.getElementsByClassName("left")[0].style.display = "block";
});

choose_Color.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  console.log("clickeddddddddddddd");
  document.getElementsByClassName("left1")[0].style.display = "block";
  document.getElementsByClassName("left")[0].style.display = "none";
});


btn.addEventListener("click", async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: pickColor,
    },
    (injectionResults) => {
      const data = injectionResults[0];
      if (data && data.result) {
        console.log(data.result);
        const color = data.result.sRGBHex;
        colorGrid.style.backgroundColor = color;
        colorValuehex.innerText = `${color}`;
        colorValueRGB.innerText=` (${hexToRgb(color)})`
        // newColorValue_hex.innerText = `${color}`;
        // newColorValue_rgb.innerText = `(${hexToRgb(color)})`;
        navigator.clipboard
          .writeText(color)
          .then(() => {
            // Clipboard write operation succeeded
            console.log("Color copied to clipboard");
          })
          .catch((err) => {
            // Clipboard write operation failed
            console.error("Error copying color to clipboard:", err);
          });

        let color_val = data.result.sRGBHex;
        itemJsonArray.push({
          colorvalue: color_val,
        });
        localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));

        update();
      }
    }
  );
});

deletee.addEventListener("click", () => {
  localStorage.clear();
  update();
});

function update() {
  if (localStorage.getItem("itemsJson") == null) {
    itemJsonArray = [];
    localStorage.setItem("itemsJson", JSON.stringify(itemJsonArray));
  } else {
    let itemJsonArrayStr = localStorage.getItem("itemsJson");
    itemJsonArray = JSON.parse(itemJsonArrayStr);
  }

  let lastItem = itemJsonArray[itemJsonArray.length - 1];
  let secondLastItem = itemJsonArray[itemJsonArray.length - 2];

  if (lastItem) {
    colorGrid.style.backgroundColor = lastItem.colorvalue;
    colorpicked.innerText = `${lastItem.colorvalue}`;
  }

  if (secondLastItem) {
    displayPre.style.backgroundColor = secondLastItem.colorvalue;
    pickedColorValue.innerText = `${secondLastItem.colorvalue}`;

        newColorValue_hex.innerText = `${secondLastItem.colorvalue}`;
        newColorValue_rgb.innerText = `(${hexToRgb(secondLastItem.colorvalue)})`;
  }

  showPreviousColors();
}

function showPreviousColors() {
  let show_data = itemJsonArray
    .map(
      (item) =>
        `<li class="storepre" style="background-color:${item.colorvalue}"></li>`
    )
    .join("");
  perviousColors.innerHTML = show_data;
}

async function pickColor() {
  try {
    const eyeDropper = new EyeDropper();
    return await eyeDropper.open();
  } catch (err) {
    console.error(err);
  }
}

function hexToRgb(hex) {
  const bigint = parseInt(hex.substring(1), 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `RGB: ${r}, ${g}, ${b}`;
}

itemJsonArray =
  localStorage.getItem("itemsJson") !== null
    ? JSON.parse(localStorage.getItem("itemsJson"))
    : [];

update();
console.log("working!");