console.log("js script connected")

//dom selection
let dateTime = $("#dateTime");
let submitBtn = $("#submitBtn");
let results = $("#results");
let faraamQuoteDisplay = $("#faraamQuote");
let mythicBtn = $("#mythicBtn");
let mythicCounter = $("#mythicCounter");

//placeholder vars
let datePref;

//data variables
let faraamQuotes = [
    "https://cdn.discordapp.com/attachments/799488351543361547/904505982498013194/ffxiv_10212021_185012_871.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904505983269740564/ffxiv_10212021_191133_936.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506033341337640/ffxiv_09282021_215211_186.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506158495170600/ffxiv_20210713_234320_714.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506513702387722/ffxiv_20210830_011259_929.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506542320144455/ffxiv_20210904_004652_814_01.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506605779963934/ffxiv_20210908_201545_766.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506687329812500/ffxiv_20210912_200831_872.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506710759186443/ffxiv_20210916_204101_020.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506743076306964/ffxiv_20210919_234119_391.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506743852253244/ffxiv_20210921_184849_698.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/904506745823576094/ffxiv_20211011_framboobass.jpg",
    "https://cdn.discordapp.com/attachments/799488351543361547/904507682424250418/ffxiv_10232021_204849_470.png"
]

//process variables
let randomFaraamQuote = faraamQuotes[Math.floor(Math.random() * faraamQuotes.length)];

//tooltip init
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})

function submitClick() {

    let timeInput = dayjs(dateTime.val());
    let titleInput = $("#titleInput").val();
    let descInput = $("#descInput").val();
    let timeFormat = $("#timeFormat").val();

    if (titleInput != "") { titleInput = "\n\n" + "**" + titleInput + "**"; }
    if (descInput != "") { descInput = "\n\n" + descInput; }

    if (dayjs(timeInput).isValid()) {
        let epochTime = "<t:" + dayjs(timeInput).unix() + ":" + timeFormat + ">";
        results.text(epochTime + titleInput + descInput);
    }
    else {
        alert("Please select a valid date and time.")
    }

    datePref = timeFormat;
    localStorage.setItem("datePreference", JSON.stringify(datePref));
}

//count api
function mythicInitDisplay() {
    fetch('https://api.countapi.xyz/get/mythicCounter/cosdamanv2')
        .then(response => response.json())
        .then(
            function (data) {
                mythicCounter.text(data.value)
            });
}

function mythicClickCount() {
    fetch('https://api.countapi.xyz/hit/mythicCounter/cosdamanv2')
        .then(response => response.json())
        .then(
            function (data) {
                mythicCounter.text(data.value)
            });
}

//secret set value to 0 link
//https://api.countapi.xyz/set/mythicCounter/cosdamanv2?value=0


let storedDatePref = JSON.parse(localStorage.getItem("datePreference"));

if (storedDatePref !== null || storedDatePref !== undefined) {
    datePref = storedDatePref;
    $("[value='" + datePref + "']").attr('selected', "");
}

faraamQuoteDisplay.attr("src", randomFaraamQuote);
mythicInitDisplay();
submitBtn.click(submitClick);
mythicBtn.click(mythicClickCount);