const calBody = document.querySelector(".cal_body");
const monthTitle = document.querySelector(".month_title");
const switchMonth = document.querySelector(".switch_month");
const form = document.querySelector(".form");
const thisMonth = new Date();
let today = new Date(thisMonth.getFullYear(), thisMonth.getMonth());
let dateToSwitch = thisMonth.getMonth();
let table = "";
let monthName = "";
let lastDay = "";
let firstDay = "";
const weeksTimeStamp = [];

showCalendar(today, today.getMonth());

function showCalendar(date, month) {
  getPrevDate(date);
  for (let i = getDay(date); i > 0; i--) {
    table += `<div class="not_this_month days">${
      lastDay.getDate() - i + 1
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
    thisMonth.getFullYear(),
    dateToSwitch
  ).getFullYear()}`;

  getNextDate(date);
  if (getDay(date) !== 0) {
    for (let i = getDay(date); i < 7; i++) {
      table += `<div class="not_this_month days">${
        firstDay.getDate() + i - getDay(date)
      }</div>`;
    }
  }

  calBody.innerHTML += table;
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
    calBody.innerHTML = "";
    monthTitle.innerHTML = "";
    dateToSwitch += 1;
    const nextMon = new Date(thisMonth.getFullYear(), dateToSwitch);
    showCalendar(nextMon, nextMon.getMonth());
  } else if (event.target === document.querySelector(".last_month")) {
    calBody.innerHTML = "";
    monthTitle.innerHTML = "";
    dateToSwitch -= 1;
    const lastMon = new Date(thisMonth.getFullYear(), dateToSwitch);
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
  lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
}

function getNextDate(date) {
  firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
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
    console.log(daysValue);
    let firstPlanDay =
      selectedMonth[new Date(element.visible[0].start).getDate() - 1];
    console.log(firstPlanDay);
    document.querySelectorAll(".this_month_plans").forEach((element) => {
      if (document.querySelectorAll(".this_month_plans")) {
        element.innerHTML = "";
      }
    });
    firstPlanDay.innerHTML += `<div class = "this_month_plans"><div>`;
    firstPlanDay.querySelector(".this_month_plans").style.width = `${
      daysValue * 100
    }%`;
  });
}
