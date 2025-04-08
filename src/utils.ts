const toYYYYMMDD = (date: Date) => {
  return date.toLocaleString("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
};

const todayYYYYMMDD = (date?: Date) => {
  const rawDate = date ?? new Date();
  return rawDate
    .toLocaleString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
};

const fetchSheetsByUrl = (url: string, name?: string) => {
  const ss = SpreadsheetApp.openByUrl(url);
  if (name) {
    return ss.getSheetByName(name) ?? ss;
  }
  return ss;
};

const fetchSheetsById = (id: string, name?: string) => {
  const ss = SpreadsheetApp.openById(id);
  if (name) {
    return ss.getSheetByName(name) ?? ss;
  }
  return ss;
};

const sendLINEMessage = (to: any, message: any) => {
  const options = {
    httpMethod: "post",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${LINE_CHANNEL_ACCESS_TOKEN}`,
    },
    payload: JSON.stringify({
      to: to,
      messages: [
        {
          type: "text",
          text: message,
        },
      ],
    }),
  };

  UrlFetchApp.fetch(LINE_API_URL, options);
};
