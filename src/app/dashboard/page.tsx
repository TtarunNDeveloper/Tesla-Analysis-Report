import Sidebar from "../../components/Sidebar";
import ContentArea from "../../components/ContentArea";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />

      <div className="flex-1 p-8 overflow-auto">
        <ContentArea />
      </div>
    </div>
  );
}
