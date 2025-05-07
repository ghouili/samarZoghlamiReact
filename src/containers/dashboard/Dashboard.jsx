import React from "react";
// import { PowerBIEmbed } from "powerbi-client-react";
// import { models } from "powerbi-client";

const Dashboard = () => {
  return (
    <div className="w-full h-screen p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
      {/* <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual, and qna.
          id: "<Report Id>",
          embedUrl: "<Embed Url>",
          accessToken: "<Access Token>",
          tokenType: models.TokenType.Embed, // Use models.TokenType.Aad if you're embedding for your organization.
          settings: {
            panes: {
              filters: {
                expanded: false,
                visible: false,
              },
            },
          },
        }}
        eventHandlers={
          new Map([
            [
              "loaded",
              function () {
                console.log("Report loaded");
              },
            ],
            [
              "rendered",
              function () {
                console.log("Report rendered");
              },
            ],
            [
              "error",
              function (event) {
                console.log(event.detail);
              },
            ],
          ])
        }
        cssClassName={"report-style-class"}
        getEmbeddedComponent={(embeddedReport) => {
          window.report = embeddedReport;
        }}
      /> */}
      <iframe
        title="samar"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/view?r=eyJrIjoiYTVlOGUwOGQtNTU5OS00NWNlLTg0M2MtZTMzYzU1MTcwOTgxIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Dashboard;
