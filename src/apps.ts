const scheduleApp = {
  fetch: () => {
    const ssId = "143RCixr6usvCLj8rf0rdbnMbB4eRyFJGJtMcC88M1_M";
    const sheetName = "予定一覧";
    const sheet = fetchSheetsById(ssId, sheetName);
    const lastRow = sheet.getLastRow();
    const values = sheet.getRange(`A2:E${lastRow}`).getValues();
    return values
      .map((it) => {
        return {
          scheduleId: it[0],
          scheduleName: it[1],
          startTime: it[2],
          place: it[3],
          person: it[4],
        };
      })
      .filter((it) => new Date(it.startTime).getTime() >= new Date().getTime())
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      );
  },
  notify: () => {
    const today = new Date();
    today.setHours(23, 59, 59, 0);
    const schedules = scheduleApp.fetch();
    const todaySchedules = schedules
      .filter(
        (it) =>
          toYYYYMMDD(new Date(it.startTime)).split(" ")[0] ===
          toYYYYMMDD(today).split(" ")[0]
      )
      .map(
        (it) =>
          `${toYYYYMMDD(new Date(it.startTime)).split(" ")[1]} ${
            it.scheduleName
          } ${it.place ?? ""} ${it.person ?? ""}`
      );
    if (todaySchedules.length === 0) {
      return;
    }
    const message = `本日(${todayYYYYMMDD()})の予定\n${todaySchedules.join(
      "\n"
    )}`;
    sendLINEMessage(LINE_USER_ID, message);
  },
  notifyTomorrow: () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(23, 59, 59, 0);
    const schedules = scheduleApp.fetch();
    const todaySchedules = schedules
      .filter(
        (it) =>
          toYYYYMMDD(new Date(it.startTime)).split(" ")[0] ===
          toYYYYMMDD(tomorrow).split(" ")[0]
      )
      .map(
        (it) =>
          `${toYYYYMMDD(new Date(it.startTime)).split(" ")[1]} ${
            it.scheduleName
          } ${it.place ?? ""} ${it.person ?? ""}`
      );
    if (todaySchedules.length === 0) {
      return;
    }
    const message = `明日(${todayYYYYMMDD(
      tomorrow
    )})の予定\n${todaySchedules.join("\n")}`;
    sendLINEMessage(LINE_USER_ID, message);
  },
  notifyWeek: () => {
    const schedules = scheduleApp.fetch();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 6);
    nextWeek.setHours(23, 59, 59, 0);
    const weeklySchedules = schedules
      .filter((it) => {
        const isWeek =
          today.getTime() <= new Date(it.startTime).getTime() &&
          new Date(it.startTime).getTime() <= nextWeek.getTime();
        return isWeek;
      })
      .map(
        (it) =>
          `${toYYYYMMDD(new Date(it.startTime))} ${it.scheduleName} ${
            it.place ?? ""
          } ${it.person ?? ""}`
      );
    if (weeklySchedules.length > 0) {
      const message = `一週間(${todayYYYYMMDD()}~${todayYYYYMMDD(
        nextWeek
      )})の予定\n${weeklySchedules.join("\n")}`;
      sendLINEMessage(LINE_USER_ID, message);
    }
  },
};

const animeRecommendApp = {
  fetch: () => {
    const sheet = fetchSheetsByUrl(
      "https://docs.google.com/spreadsheets/d/1xoPypMNkmAIkN96IRx15Dn9OEvH-pEAmEn77NXdg7bs/edit#gid=0",
      "一覧"
    ) as GoogleAppsScript.Spreadsheet.Sheet;
    const column = 1;
    const lastRow = sheet
      .getRange(sheet.getMaxRows(), column)
      .getNextDataCell(SpreadsheetApp.Direction.UP)
      .getRow();

    const values = sheet.getRange(`A2:K${lastRow}`).getValues();
    const rawData = values.map((it) => {
      return {
        animeId: it[0],
        title: it[1],
        type: it[2],
        publishYear: it[3],
        status: it[4],
        rep: it[5],
        manga: it[6],
        finished: it[7],
        has: it[8],
        bought: it[9],
        comment: it[10],
      };
    });
    const sortedData = rawData.sort((a, b) => a.animeId - b.animeId);
    const watchList = sortedData.filter((anime) => anime.status === "未視聴");
    const r = Math.floor(Math.random() * watchList.length);
    return watchList[r];
  },
  notify: () => {
    const randomAnimeInfo = animeRecommendApp.fetch();
    const message = `まだ見ていないアニメです！\n「${randomAnimeInfo.title}（${randomAnimeInfo.publishYear}）」（ID=${randomAnimeInfo.animeId}）`;
    sendLINEMessage(LINE_USER_ID, message);
  },
};
