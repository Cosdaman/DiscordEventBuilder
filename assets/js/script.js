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
    console.log(descInput)
    if (dayjs(timeInput).isValid()) {
        let epochTime = "<t:" + dayjs(timeInput).unix() + ":F>";
        results.text(epochTime +"\n" + "\n"
        + titleInput + "\n" + "\n"
        + descInput); 
    }
    else{
        alert("Please select a valid date and time.")
    }
}

kofiWidgetOverlay.draw('cosdaman', {
    'type': 'floating-chat',
    'floating-chat.donateButton.text': 'Tip Me',
    'floating-chat.donateButton.background-color': '#00b9fe',
    'floating-chat.donateButton.text-color': '#fff'
});
    
faraamQuoteDisplay.text(faraamQuotes[Math.floor(Math.random() * faraamQuotes.length)]);

submitBtn.click(submitClick);
