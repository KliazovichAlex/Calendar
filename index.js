const calBody = document.querySelector(".cal_body");
const monthTitle = document.querySelector(".month_title");
const switchMonth = document.querySelector(".switch_month");
const thisMonth = new Date();
let today = new Date(thisMonth.getFullYear(), thisMonth.getMonth());
let dateToSwitch = thisMonth.getMonth();
let table = "";
let monthName = "";
let lastDay = "";
let firstDay = "";

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
    table += `<div class="days">${date.getDate()}</div>`;
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
