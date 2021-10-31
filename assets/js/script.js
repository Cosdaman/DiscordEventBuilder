console.log("js script connected")

//dom selection
dateTime = $("#dateTime");
submitBtn = $("#submitBtn");
results = $("#results");
faraamQuoteDisplay = $("#faraamQuote");
mythicBtn = $("#mythicBtn");
mythicCounter = $("#mythicCounter");


let faraamQuotes = [
    "why are you wearing pants?"
]

function submitClick() {

    let timeInput = dayjs(dateTime.val());
    let titleInput = $("#titleInput").val();
    let descInput = $("#descInput").val();
    let timeFormat = $("#timeFormat").val();

    if (titleInput != "") {
        titleInput = "\n\n" + "**" + titleInput + "**";
    }

    if (descInput != "") {
        descInput = "\n\n" + descInput;
    }

    if (dayjs(timeInput).isValid()) {
        let epochTime = "<t:" + dayjs(timeInput).unix() + ":" + timeFormat + ">";
        results.text(
            epochTime + titleInput + descInput);
    }
    else {
        alert("Please select a valid date and time.")
    }
}

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



faraamQuoteDisplay.text(faraamQuotes[Math.floor(Math.random() * faraamQuotes.length)]);
mythicInitDisplay();
submitBtn.click(submitClick);
mythicBtn.click(mythicClickCount);

