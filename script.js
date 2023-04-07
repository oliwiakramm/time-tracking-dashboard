const timeBtns = document.querySelectorAll(".dashboard__btn");
const currentEls = [...document.querySelectorAll(".dashboard__current")];
const previousEls = [...document.querySelectorAll(".dashboard__previous")];
let timeObject;

// FETCHING DATA FROM JSON
async function fetchData() {
  const res = await fetch("data.json");
  const timeData = await res.json();
  return timeData;
}

fetchData().then((timeData) => {
  timeObject = timeData;
});

// BTNS functionality
[...timeBtns].forEach((btn) => {
  btn.addEventListener("click", function (e) {
    [...timeBtns].forEach((timeBtn) => {
      timeBtn.classList.remove("active");
    });
    btn.classList.add("active");
    timeFramesChange(btn.id);
  });
});

// swiching data functionality
function timeFramesChange(time) {
  switch (time) {
    case "daily":
      currentEls.forEach((el, i) => {
        if (timeObject[i].timeframes.daily.current === 1) {
          el.textContent = `${timeObject[i].timeframes.daily.current}hr`;
        } else {
          el.textContent = `${timeObject[i].timeframes.daily.current}hrs`;
        }
      });

      previousEls.forEach((el, i) => {
        if (timeObject[i].timeframes.daily.previous === 1) {
          el.textContent = `Yesterday - ${timeObject[i].timeframes.daily.previous}hr`;
        } else {
          el.textContent = `Yesterday - ${timeObject[i].timeframes.daily.previous}hrs`;
        }
      });
      break;
    case "weekly":
      currentEls.forEach((el, i) => {
        el.textContent = `${timeObject[i].timeframes.weekly.current}hrs`;
      });
      previousEls.forEach((el, i) => {
        el.textContent = `Last Week - ${timeObject[i].timeframes.weekly.previous}hrs`;
      });
      break;
    case "monthly":
      currentEls.forEach((el, i) => {
        el.textContent = `${timeObject[i].timeframes.monthly.current}hrs`;
      });
      previousEls.forEach((el, i) => {
        el.textContent = `Last Month - ${timeObject[i].timeframes.monthly.previous}hrs`;
      });
      break;
  }
}
