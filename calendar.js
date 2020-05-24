let year = 2020;
let month = 5;

window.onload = () => {
  console.log(getMonthCalendar(year, month));
}

const getMonthCalendar = (year, month) => {
  let firstDate = new Date(year, (month -1), 1);
  // 月は0から始まるのでマイナス1する(2020年5月1日のオブジェクトを生成)
  let lastDay = new Date(year, (firstDate.getMonth() + 1), 0).getDate();
  // (firstDate.getMonth() + 1) = 4+1=5は6月を表すのでその先月の最終日だと5月末日になる
  // 月は0から始まるが、日は1から始まる
  let weekday = firstDate.getDay();// 0（日曜日）からはじまる曜日の数値を返す

  let calendarData = [];
  let weekdayCount = weekday;

  for(let i = 0; i < lastDay; i++) {
    calendarData[i] = {
      day: i + 1,
      weekday: weekdayCount
    }// ループ文の中で連想配列に複数のプロパティを入れることができる
    if(weekdayCount >= 6) {
      weekdayCount = 0;
    }else {
      weekdayCount++;
    }
  }
  return calendarData;
}