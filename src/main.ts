const LINE_CHANNEL_ACCESS_TOKEN =
  PropertiesService.getScriptProperties().getProperty(
    "LINE_CHANNEL_ACCESS_TOKEN"
  );
const LINE_API_URL = "https://api.line.me/v2/bot/message/push";
const LINE_USER_ID =
  PropertiesService.getScriptProperties().getProperty("LINE_USER_ID");

// const doPost = (e: { postData: { contents: string } }) => {
//   const requestJson = e.postData.contents;
//   const requestObj = JSON.parse(requestJson);
//   const events = requestObj.events;
//   events.forEach(
//     (ev: { type: string; message: any; source: { userId: any } }) => {
//       if (ev.type !== "message") return;
//       const message = ev.message;
//       if (message.type !== "text") return;
//       postNotify(ev.source.userId, message.text);
//     }
//   );
//   console.log(e);
// };
