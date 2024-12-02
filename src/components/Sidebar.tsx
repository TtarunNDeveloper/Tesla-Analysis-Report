import Image from "next/image";
import teslaLogo from "../../public/tesla-logo.png"; 
import userLogo from "../../public/user-logo.jpg"; 
import reports from "../../public/increase.png"; 
import library from "../../public/lightning.png";
import people from "../../public/people.png";
import activities from "../../public/checklist.png";
import getset from "../../public/power.png";
import settings from "../../public/gear.png";

const Sidebar: React.FC = () => {
  return (
    <div className="w-64 bg-white text-black p-6 flex flex-col shadow-xl shadow-red-600" style={{height: '100vh'}}>
      <div className="mb-8 pt-4">
        <Image src={teslaLogo} alt="Tesla Logo" width={150} height={40} />
      </div>

      <nav className="flex-1">
          <ul>
            <li className="mb-4"><a href="#" className="h-10 hover:bg-black hover:px-2 hover:py-6 flex items-center hover:text-red-600 hover:rounded-lg"><Image src={reports} alt="report" height={20} width={30}></Image><span className="ml-4">Reports</span></a></li>
            <li className="mb-4"><a href="#" className="h-10 hover:bg-black hover:px-2 hover:py-6 flex items-center hover:text-red-600 hover:rounded-lg"><Image src={library}alt="library" height={10} width={30}/><span className="ml-4">Library</span></a></li>
            <li className="mb-4"><a href="#" className="h-10 hover:bg-black hover:px-2 hover:py-6 flex items-center hover:text-red-600 hover:rounded-lg"><Image src={people} alt="people" height={10} width={30}/><span className="ml-4">People</span></a></li>
            <li className="mb-4"><a href="#" className="h-10 hover:bg-black hover:px-2 hover:py-6 flex items-center hover:text-red-600 hover:rounded-lg"><Image src={activities} alt="activity" height={10} width={30}/><span className="ml-4">Activities</span></a></li>
          </ul>

        <div className="mt-20">
          <h4 className="font-semibold">Support</h4>
          <ul>
            <li className="mb-2 mt-5"><a href="#" className="h-10 hover:px-2 flex items-center hover:rounded-lg hover:py-6 hover:text-red-500 hover:bg-black"><Image src={getset} alt="getstarted" height={10} width={30}/><span className="ml-4">Get Started</span></a></li>
            <li ><a href="#" className="h-10 hover:px-2 flex items-center hover:text-red-500 hover:rounded-lg hover:py-6 hover:bg-black"><Image src={settings} alt="settings" height={10} width={30}/><span className="ml-4">Settings</span></a></li>
          </ul>
        </div>
      </nav>

      <div className="mt-auto">
        <div className="flex items-center">
          <Image
            src={userLogo}
            alt="User Profile"
            className="w-10 h-10 rounded-full"
            width={40}
            height={40}
          />
          <div className="ml-2">
            <p>Sam Wheeler</p>
            <p className="text-sm text-black">samwheeler@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
