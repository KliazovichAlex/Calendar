const calendarBody = document.querySelector(".calendar_body");
const monthTitle = document.querySelector(".month_title");
const switchMonth = document.querySelector(".switch_month");
const form = document.querySelector(".form");
const data = new Date();
const currentDate = new Date(data.getFullYear(), data.getMonth());
let dateToSwitch = currentDate.getMonth();
console.log(dateToSwitch);
let table = "";
let monthName = "";
const weeksTimeStamp = [];

showCalendar(currentDate, currentDate.getMonth());

function showCalendar(date, month) {
  console.log(getPrevDate(date).getDate());
  for (let i = getDay(date); i > 0; i--) {
    table += `<div class="not_this_month days">${
      getPrevDate(date).getDate() - i + 1
    }</div>`;
  }
  while (date.getMonth() === month) {
    getMonthName(month);
    table += `<div class="days this_month">${date.getDate()}</div>`;
    if (getDay(date) % 7 === 6) {
      table += `<br>`;
    }
    date.setDate(date.getDate() + 1);
  }
  monthTitle.innerHTML += `${monthName} ${new Date(
    currentDate.getFullYear(),
    dateToSwitch
  ).getFullYear()}`;

  if (getDay(date) !== 0) {
    for (let i = getDay(date); i < 7; i++) {
      table += `<div class="not_this_month days">${
        getNextDate(date).getDate() + i - getDay(date)
      }</div>`;
    }
  }

  calendarBody.innerHTML += table;
  table = "";
}

function getDay(data) {
  let day = data.getDay();
  if (day === 0) {
    day = 7;
  }
  return day - 1;
}

switchMonth.addEventListener("click", (event) => {
  if (event.target === document.querySelector(".next_month")) {
    calendarBody.innerHTML = "";
    monthTitle.innerHTML = "";
    dateToSwitch += 1;
    const nextMon = new Date(currentDate.getFullYear(), dateToSwitch);
    showCalendar(nextMon, nextMon.getMonth());
  } else if (event.target === document.querySelector(".last_month")) {
    calendarBody.innerHTML = "";
    monthTitle.innerHTML = "";
    dateToSwitch -= 1;
    const lastMon = new Date(currentDate.getFullYear(), dateToSwitch);
    showCalendar(lastMon, lastMon.getMonth());
  }
});

function getMonthName(month) {
  const months = [
    "Январь",
    "Февраль",
    "Март",
    "Апрель",
    "Май",
    "Июнь",
    "Июль",
    "Август",
    "Сентябрь",
    "Октябрь",
    "Ноябрь",
    "Декабрь",
  ];

  monthName = months[month];
}

function getPrevDate(date) {
  return new Date(date.getFullYear(), date.getMonth(), 0);
}

function getNextDate(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 1);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  weeksTimeStamp.push({
    start: Date.parse(
      getMonday(event.target.querySelector(".date_start").value)
    ),
    end: Date.parse(getSunday(event.target.querySelector(".date_end").value)),
    visible: [
      {
        start: Date.parse(event.target.querySelector(".date_start").value),
        end: Date.parse(event.target.querySelector(".date_end").value),
        description: event.target.querySelector(".date_description").value,
      },
    ],
  });

  checkRepeatDate(
    event.target.querySelector(".date_start").value,
    Date.parse(event.target.querySelector(".date_end").value)
  );
  localStorage.date = JSON.stringify(weeksTimeStamp);

  showPlans();
});

function getMonday(d) {
  let selectedDay = new Date(d);
  const day = selectedDay.getDay(),
    diff = selectedDay.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(selectedDay.setDate(diff));
}

function getSunday(d) {
  const selectedDay = new Date(d);
  const day = selectedDay.getDay(),
    diff = selectedDay.getDate() - day + (day === 0 ? 0 : 7);
  return new Date(selectedDay.setDate(diff));
}

function showPlans() {
  const selectedMonth = document.querySelectorAll(".this_month");

  weeksTimeStamp.forEach((element) => {
    let daysValue = Math.floor(
      (element.visible[0].end - element.visible[0].start) /
        ((element.end - element.start) / 7) +
        1
    );
    console.log(dateToSwitch);
    console.log(new Date(element.start).getMonth());
    if (dateToSwitch === new Date(element.visible[0].start).getMonth()) {
      let firstPlanDay =
        selectedMonth[new Date(element.visible[0].start).getDate() - 1];
      console.log(firstPlanDay);
      document.querySelectorAll(".this_month_plans").forEach((element) => {
        if (document.querySelectorAll(".this_month_plans")) {
          element.innerHTML = "";
        }
      });
      firstPlanDay.innerHTML += `<div class = "this_month_plans"><div class = "text_color">${element.visible[0].description}</div></div>`;
      firstPlanDay.querySelector(".this_month_plans").style.width = `${
        daysValue * 101
      }%`;
    }
  });
}

function checkRepeatDate(begin, ends) {
  weeksTimeStamp.forEach((element, index) => {
    if (element.visible[0].start === begin && element.visible[0].end === ends) {
      weeksTimeStamp.splice(index, 1);
    }
  });
}
