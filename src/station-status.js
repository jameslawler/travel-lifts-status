const got = require("got");

const BASE_URL =
  "http://www.mvg-zoom.de/fahrgastinfo/do?_flowId=showStation&id=";

const STATUSES = {
  UNKNOWN: "unknown",
  "in Betrieb": "open",
  "au&szlig;er Betrieb": "closed",
};

const getStatusById = (html, statusId) => {
  const STATUS_START_PROPERTY = "Status: ";
  const STATUS_END_PROPERTY = "<br />";

  const statusIdIndex = html.indexOf(statusId);
  const statusTextIndex = html.indexOf(STATUS_START_PROPERTY, statusIdIndex);
  const statusTextEndIndex = html.indexOf(STATUS_END_PROPERTY, statusTextIndex);

  if (statusIdIndex < 0 || statusTextIndex < 0 || statusTextEndIndex < 0) {
    return STATUSES.UNKNOWN;
  }

  const statusText = html.substring(
    statusTextIndex + STATUS_START_PROPERTY.length,
    statusTextEndIndex
  );

  return STATUSES[statusText] || STATUSES.UNKNOWN;
};

const getStatus = async (station) => {
  const url = `${BASE_URL}${station.stationId}`;
  const websiteResponse = await got(url);

  const statusIds = station.statusIds.map((statusId) => ({
    statusId,
    status: getStatusById(websiteResponse.body, statusId),
  }));

  return {
    ...station,
    statusIds,
  };
};

module.exports = {
  getStatus,
};
