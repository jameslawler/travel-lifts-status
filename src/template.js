module.exports = (stations) => `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      .container {
        display: flex;
        flex-direction: column;
      }
      .station {
        font-size: 40px;
        margin-bottom: 5px;
        padding: 50px 25px;
        text-align: center;
      }
      .status--open {
        background-color: lightgreen;
        border: 1px solid green;
      }
      .status--closed {
        background-color: lightcoral;
        border: 1px solid red;
      }
      .status--unknown {
        background-color: lightyellow;
        border: 1px solid orange;
      }
    </style>
  </head>
  <body>
    <div class="container">
      ${stations
        .map(
          (station) => `<div class="station status--${
            station.statusIds.every((statusId) => statusId.status === "open")
              ? "open"
              : "closed"
          }">
        ${station.stationName}
      </div>
      `
        )
        .join("")}
    </div>
  </body>
</html>
`;
