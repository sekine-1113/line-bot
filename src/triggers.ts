const scheduleAppTriggerDaily = () => {
  scheduleApp.notify();
  scheduleApp.notifyTomorrow();
};

const scheduleAppTriggerWeekly = () => {
  scheduleApp.notifyWeek();
  animeRecommendApp.notify();
};
