const fs = require("fs");

const stationStatus = require("./station-status");
const template = require("./template");

const BUILD_PATH = `${__dirname}\\..\\build\\index.html`;
const STATIONS = [
  {
    stationId: "HO",
    stationName: "Hauptbahnhof",
    statusIds: ["Lift HU01"],
  },
  {
    stationId: "WT",
    stationName: "Wettersteinplatz",
    statusIds: ["Lift WT01"],
  },
  {
    stationId: "SQ",
    stationName: "St.-Quirin-Platz",
    statusIds: ["Lift SQ01", "Lift SQ02"],
  },
  {
    stationId: "SE",
    stationName: "Sendlinger Tor",
    statusIds: ["Lift SE01", "Lift SE02", "Lift SE04"],
  },
];

const generateSite = async () => {
  const stations = await Promise.all(
    STATIONS.map((station) => stationStatus.getStatus(station))
  );
  return template(stations);
};

const build = async () => {
  const site = await generateSite();
  fs.writeFileSync(BUILD_PATH, site);
};

build().then(() => {
  console.log("finished generation");
});
