console.log("js script connected")

//dom selection
dateTime = $("#dateTime");
submitBtn = $("#submitBtn");
results = $("#results");



submitBtn.click(submitClick)

function submitClick() {

    let timeInput = dayjs(dateTime.val());
    if (dayjs(timeInput).isValid()) {
        results.text(dayjs(timeInput).unix());
    }
}