import React from "react";

const Dashboard = () => {
  return (
    <div className="w-full h-screen p-4 bg-white rounded-lg shadow-md flex flex-col items-center justify-center">
      <iframe
        title="SEBNTN Dashboard"
        width="100%"
        height="100%"
        src="https://app.powerbi.com/view?r=eyJrIjoiOGY5NThjZTgtODc5Zi00YjVmLWJiMDktYzU2ZjNkMTFhNDhhIiwidCI6ImRiZDY2NjRkLTRlYjktNDZlYi05OWQ4LTVjNDNiYTE1M2M2MSIsImMiOjl9&pageName=5547a6a82e33db4704c8"
        frameborder="0"
        allowFullScreen="true"
      ></iframe>
    </div>
  );
};

export default Dashboard;
