console.log("js script connected")

//dom selection
dateTime = $("#dateTime");
submitBtn = $("#submitBtn");
results = $("#results");



submitBtn.click(submitClick)

function submitClick() {

    let timeInput = dayjs(dateTime.val());
    let titleInput = $("#titleInput").val();
    if (dayjs(timeInput).isValid()) {
        let epochTime = "<t:" + dayjs(timeInput).unix() + ":F>";
        results.text(epochTime +"\n" + "\n"
        + titleInput); 
    }
    else{
        alert("Please select a valid date and time.")
    }
}