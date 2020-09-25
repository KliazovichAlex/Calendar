const calBody = document.querySelector(".cal_body");
const monthTitle = document.querySelector(".month_title");
let table = "";
let monthName = "";
const dzen = [];
let firstDay = "";
function createCalendar(year, mon) {
  let month = mon - 1;
  const date = new Date(year, month);
  getPrevDate(date);
  for (let i = 0; i < getDay(date); i++) {
    table += `<td><div class="not_this_month">${dzen[i]}</div></td>`;
  }
  while (date.getMonth() === month) {
    getMonthName(date);
    table += `<td><div>${date.getDate()}</div></td>`;
    if (getDay(date) % 7 === 6) {
      table += `</tr><tr>`;
    }
    date.setDate(date.getDate() + 1);
  }

  monthTitle.innerHTML += `${monthName} ${date.getFullYear()}`;
  getNextDate(date);
  if (getDay(date) !== 0) {
    for (let i = getDay(date); i < 7; i++) {
      table += `<td><div class="not_this_month">${
        firstDay.getDate() + i - getDay(date)
      }</div></td>`;
    }
    table += "</tr></table>";
  }

  calBody.innerHTML += table;
}

function getDay(data) {
  let day = data.getDay();
  if (day === 0) {
    day = 7;
  }
  return day - 1;
}
createCalendar(2020, 3);

function getMonthName(data) {
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

  monthName = months[data.getMonth()];
}

function getPrevDate(date) {
  let lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
  for (i = getDay(date); i > 0; i--) {
    const prevMonth = new Date(
      date.getFullYear(),
      date.getMonth(),
      lastDay.getDate() - i
    );
    dzen.push(prevMonth.getDate() + 1);
  }
}

function getNextDate(date) {
  firstDay = new Date(date.getFullYear(), date.getMonth() + 1, 1);
}
