const got = require("got");

const stationStatus = require("./station-status");
const sample = require("./station-status.sample");

const SAMPLE_STATION_HTML = sample;
const STATION = {
  stationId: "ABC",
  stationName: "Abcplatz",
};

jest.mock("got");

beforeEach(() => {
  got.mockResolvedValue({ body: SAMPLE_STATION_HTML });
});

test("should get open status", async () => {
  const station = { ...STATION, statusIds: ["Lift ABC01"] };
  const result = await stationStatus.getStatus(station);
  expect(result).toEqual({
    ...STATION,
    statusIds: [{ statusId: "Lift ABC01", status: "open" }],
  });
});

test("should get closed status", async () => {
  const station = { ...STATION, statusIds: ["Lift ABC02"] };
  const result = await stationStatus.getStatus(station);
  expect(result).toEqual({
    ...STATION,
    statusIds: [{ statusId: "Lift ABC02", status: "closed" }],
  });
});

test("should get unknown status when status not found", async () => {
  const station = { ...STATION, statusIds: ["Lift ABC03"] };
  const result = await stationStatus.getStatus(station);
  expect(result).toEqual({
    ...STATION,
    statusIds: [{ statusId: "Lift ABC03", status: "unknown" }],
  });
});

test("should get unknown status when status not recognized", async () => {
  const station = { ...STATION, statusIds: ["Rolltreppe ABC04"] };
  const result = await stationStatus.getStatus(station);
  expect(result).toEqual({
    ...STATION,
    statusIds: [{ statusId: "Rolltreppe ABC04", status: "unknown" }],
  });
});

test("should get multiple statuses", async () => {
  const station = { ...STATION, statusIds: ["Lift ABC01", "Lift ABC02"] };
  const result = await stationStatus.getStatus(station);
  expect(result).toEqual({
    ...STATION,
    statusIds: [
      { statusId: "Lift ABC01", status: "open" },
      { statusId: "Lift ABC02", status: "closed" },
    ],
  });
});
