console.log("js script connected")

//dom selection
dateTime = $("#dateTime");
submitBtn = $("#submitBtn");
results = $("#results");
faraamQuoteDisplay = $("#faraamQuote");


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

faraamQuoteDisplay.text(faraamQuotes[Math.floor(Math.random() * faraamQuotes.length)]);

submitBtn.click(submitClick);
