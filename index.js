const calBody = document.querySelector(".cal_body");
const monthTitle = document.querySelector(".month_title");
let table = "";
let monthName = "";
function createCalendar(year, mon) {
  let month = mon - 1;
  const date = new Date(year, month);
  for (let i = 0; i < getDay(date); i++) {
    table += `<td></td>`;
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

  if (getDay(date) !== 0) {
    for (let i = getDay(date); i < 7; i++) {
      table += "<td></td>";
    }
    table += "</tr></table>";
  }

  calBody.innerHTML += table;
}

function getDay(d) {
  let day = d.getDay();
  if (day === 0) {
    day = 7;
  }
  return day - 1;
}
createCalendar(2020, 5);

function getMonthName(d) {
  switch (d.getMonth()) {
    case 0:
      return (monthName = "Январь");
    case 1:
      return (monthName = "Февраль");
    case 2:
      return (monthName = "Март");
    case 3:
      return (monthName = "Апрель");
    case 4:
      return (monthName = "Май");
    case 5:
      return (monthName = "Июнь");
    case 6:
      return (monthName = "Июль");
    case 7:
      return (monthName = "Август");
    case 8:
      return (monthName = "Сентябрь");
    case 9:
      return (monthName = "Октябрь");
    case 10:
      return (monthName = "Ноябрь");
    case 11:
      return (monthName = "Декабрь");
  }
}
