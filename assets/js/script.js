console.log("js script connected")

//dom selection
let dateTime = $("#dateTime");
let submitBtn = $("#submitBtn");
let results = $("#results");
let faraamQuoteDisplay = $("#faraamQuote");
let mythicBtn = $('#mythicBtn');
let mythicCounter = $("#mythicCounter");
let threadTitle = $('#resultsThread');

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
    "https://cdn.discordapp.com/attachments/799488351543361547/904507682424250418/ffxiv_10232021_204849_470.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/907151347848183808/consume.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/907151358224912384/dummythicc.png",
    "https://cdn.discordapp.com/attachments/799488351543361547/909129961871384626/20211016_noratsinalaska.jpg"
]
let mythicLinks = [
    "twitter.com/MythicRWBY",
    "twitch.tv/mythicrwby"
]

//process variables
let randomFaraamQuote = faraamQuotes[Math.floor(Math.random() * faraamQuotes.length)];

//tippy init
//notes: tippy can't use jquery 
const mythicButton = document.querySelector("#mythicBtn")
tippy(mythicButton);
const tippyInst = mythicButton._tippy;

//tippy settings
tippyInst.setProps({
    placement: 'left',
    arrow: true,
    trigger: 'click',
    hideonClick: "true",
    onShow(instance) {
        let rngNum = Math.floor(Math.random() * 2)
        if (rngNum < 1) {
            tippyInst.setProps({
                content: mythicLinks[rngNum], placement: 'left',
            })
        } else {
            tippyInst.setProps({
                content: mythicLinks[rngNum], placement: 'right',
            })
        }
    },
})

//functions
function submitClick() {

    let timeInput = dayjs(dateTime.val());
    let titleInput = $("#titleInput").val();
    let descInput = $("#descInput").val();
    let timeFormat = $("#timeFormat").val();
    let threadTitleTitle = titleInput;

    if (titleInput != "") { titleInput = "\n\n" + "**" + titleInput + "**"; }
    if (descInput != "") { descInput = "\n\n" + descInput; }

    if (dayjs(timeInput).isValid()) {
        let epochTime = "<t:" + dayjs(timeInput).unix() + ":" + timeFormat + ">";
        let threadTitleContent = dayjs(timeInput).format("ddd|MMM DD|UTC: ZZ| ")
        results.text(epochTime + titleInput + descInput);
        threadTitle.text(threadTitleContent + threadTitleTitle);
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

//secret link
//bnnjm://ujc.wiohnujc.rst/myn/gsnbcwWiohnyl/wimxuguhp2?pufoy=0
//alternative link
//https://jstrieb.github.io/link-lock/#eyJ2IjoiMC4wLjEiLCJlIjoibW1KWHVJZERMNHAxdmdvTWRNUVdiWnBuTnRJRW9hTURldjRnQm1FbXRRNXp0QUUxRDZ2N3A0eTRnYXNIVHM0QlVrYnVackhqZm82RFNyT2lzbXdvb0NPWWxpU3lZWkRkWktSenRlMD0iLCJoIjoicmliYml0LCBpZiB5b3UgZW50ZXIgdGhlIGNvcnJlY3QgcGFzc3dvcmQsIHRoZSBjb3VudGVyIHdpbGwgcmVzZXQgdG8gMCIsImkiOiJ1ZWhqVmtXM2x0NEZseWQ5In0=


let storedDatePref = JSON.parse(localStorage.getItem("datePreference"));

if (storedDatePref !== null || storedDatePref !== undefined) {
    datePref = storedDatePref;
    $("[value='" + datePref + "']").attr('selected', "");
}

faraamQuoteDisplay.attr("src", randomFaraamQuote);
mythicInitDisplay();
submitBtn.click(submitClick);
mythicBtn.click(mythicClickCount);
