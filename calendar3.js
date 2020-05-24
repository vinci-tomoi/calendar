window.onload = () => {
  let current = new Date();
  let year = current.getFullYear();
  let month = current.getMonth() + 1;

  let wrapper = document.getElementById('calendar');
  addCalendar(wrapper, year, month);
}

const addCalendar = (wrapper, year, month) => {
  wrapper.textContent = null;//タグを除く子要素のテキスト要素の取得
  let headData = genCalendarHeader(wrapper, year, month);
  let bodyData = genMonthCalendar(year, month);

  wrapper.appendChild(headData);
  wrapper.appendChild(bodyData);
}

const genCalendarHeader = (wrapper, year, month) => {
  let nextMonth = new Date(year, (month -1));
  console.log(nextMonth);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  console.log(nextMonth);
  //現在のちょうど一ヶ月前を取得する必要があるのでDateオブジェクト作成→一ヶ月前を取得する
  let prevMonth = new Date(year, (month -1));
  prevMonth.setMonth(prevMonth.getMonth() -1);

  let cHeader = document.createElement('div');
  cHeader.className = 'calendar-header';

  let cTitle = document.createElement('div');
  cTitle.className = 'calendar-header-title';
  let cTitleText = document.createTextNode(`${year}年${month}月`);
  cTitle.appendChild(cTitleText);
  cHeader.appendChild(cTitle);

  let cPrev = document.createElement('button');
  cPrev.className = 'calendar-header-prev';
  let cPrevText = document.createTextNode('prev');
  cPrev.appendChild(cPrevText);
  cPrev.addEventListener('click',() => {
    addCalendar(wrapper, prevMonth.getFullYear(), (prevMonth.getMonth() + 1));
  }, false);
  cHeader.appendChild(cPrev);

  let cNext = document.createElement('button');
  cNext.className = 'calender-header-next';
  let cNextText = document.createTextNode('Next');
  cNext.appendChild(cNextText);
  cNext.addEventListener('click', () => {
    addCalendar(wrapper, nextMonth.getFullYear(), (nextMonth.getMonth() + 1));
  }, false);
  // 第３引数のfalseはイベントフローにおいてDOMの下層から上層に伝播するのを示すもの
  cHeader.appendChild(cNext);

  return cHeader;
}

// 次ここから

const genMonthCalendar = (year, month) => {
  let weekdayData = ['日', '月', '火', '水', '木', '金', '土'];
  let calendarData = getMonthCalendar(year, month);

  let i = calendarData[0]['weekday'];
  while(i > 0) {
    i--;
    //配列の先頭（1日）に先月末の曜日を加える
    calendarData.unshift({
      day: '',
      weekday: i
    });
  }

  i = calendarData[calendarData.length - 1]['weekday'];
  while(i < 6) {
    i++;
    calendarData.push({
      day: '',
      weekday: i
    })
  }

  let cTable = document.createElement('table');
  cTable.className = 'calendar-table';

  let insertData = '';
  insertData += '<thead>';
  insertData += '<tr>';
  for (let i = 0; i < weekdayData.length; i++) {
    insertData += '<th>';
    insertData += weekdayData[i];
    insertData += '</th>';
  }
  insertData += '</tr>';
  insertData += '</thead>';

  insertData += '<tbody>';
  for(let i = 0; i < calendarData.length; i++) {
    //日曜日のときだけ行を生成
    if(calendarData[i]['weekday'] <= 0) {
      insertData += '<tr>';
    }
    insertData += '<td>';
    insertData += calendarData[i]['day'];
    insertData += '</td>';
    //土曜日なら行を閉じる
    if(calendarData[i]['weekday'] >= 6) {
      insertData += '</tr>';
    }
  }
  insertData += '</tbody>';

  cTable.innerHTML = insertData;
  return cTable;
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