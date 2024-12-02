"use client";
import Image from "next/image";
import Filters from "./Filters";
import download from "../../public/download.png";
import LineChartComponent from "./LineChartComponent";
import React, { useEffect,useState} from "react";

interface Metrics{
  active_users: {
    current: number;
    total: number;
  };
  questions_answered: number;
  average_session_length_seconds: number;
  starting_knowledge_percentage: number;
  current_knowledge_percentage: number;
}
interface Activity{
  month: string,
  value: number;
}
interface Topic{
  name: string;
  image: string;
  correct_percentage: number;
}
interface User {
  name:string;
  image:string;
  points: number;
  accuracy_percentage: number;
  previous_acc_percentage: number;
}
interface Group{
  group_name: string;
  points_per_user: number;
  accuracy_percentage: number;
  previous_acc_percentage: number;
}
interface Data{
  metrics: Metrics;
  activity: {
    monthly: Activity[];
  };
  topics: {
    weakest: Topic[];
    strongest: Topic[];
  };
  user_leaderboard: User[];
  groups_leaderboard: Group[];
  api_secret: string;
}
const ContentArea: React.FC = () => {
  const [data,setData] = useState<Data | null>(null);
  useEffect(() => {
    fetch("/data/task-data.json")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:",error));
  },[]);
  const handleDownload = async() => {
    if(data && data.api_secret){
      try{
        const response = await fetch("https://cors-anywhere.herokuapp.com/https://testd5-img.azurewebsites.net/api/imgdownload",{
          method: "POST",
          headers:{
            "Content-Type":"application/json",
          },
            body: JSON.stringify({api: data.api_secret}),
          
        });
        if(!response.ok){
          throw new Error(`Network response was not ok,${response.statusText}`);
        }

        const result = await response.json();
        console.log("API Response",result);
        const base64Image = result.base64_string;

        const link = document.createElement('a');
        link.href = `data:image/png;base64,${base64Image}`;
        link.download = "report_image.png";
        link.click();
      }catch(error){
        console.error("Error downloading the image: ",error);
        alert("Failed to download the image!")
      }
    }else{
      console.error("API secret is missing");
    }
  };
  if(!data){
    return <div>Loading...</div>;
  }
  const{metrics, activity, topics, user_leaderboard, groups_leaderboard}=data;
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Reports</h1>
        <button onClick={handleDownload} className=" flex items-center bg-red-600 text-black text-l px-6 py-4 rounded-md hover:bg-green-500 hover:text-white">
          <span className="mr-1">Download</span>
          <Image src={download} alt="download" height={15} width={20}></Image>
        </button>
      </div>
      <hr className="h-1 bg-red-600 mb-10"></hr>
      <Filters />

        <div className="flex flex-wrap">
          <div className="w-full lg:w-7/12 p-3">
        <Metrics metrics={metrics}/>
        </div>
        <div className="w-full lg:w-2/5 p-3">
          <ActivityGraph activity={activity.monthly}/>
          </div>
        </div>


        <div className="flex flex-wrap -mx-3">
          <div className="w-full lg:w-1/2 p-3">
        <WeakestTopic topics={topics.weakest} />
        </div>
        <div className="w-full lg:w-1/2 p-3">
        <StrongestTopics topics={topics.strongest} />
        </div>
        </div>

        <div className="flex flex-wrap -mx-3">
          <div className="w-full lg:w-1/2 p-3">
          <UserLeaderboard users={user_leaderboard}/>
          </div>
          <div className="w-full lg:w-1/2 p-3">
            <GroupLeaderboard groups={groups_leaderboard}/>
          </div>
        </div>
        
    </div>
  );
};

const Metrics: React.FC<{metrics: Metrics}> = ({metrics}) => {
  const formatTime = (seconds: number)=>{
  return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;  };
  return (
    <div className="p-4 rounded-lg shadow-md ">
      <h2 className="text-xl font-light mb-4">Metrics</h2>
      <div className="flex flex-wrap -mx-3">
      
      <div className="w-full md:w-1/2 lg:w-full xl:w-1/3 p-3">
        <div className="p-4 bg-white rounded-lg shadow-sm">
        <h3 className="text-lg font-light">Active Users</h3>
        <p className="text-3xl font-bold">{metrics.active_users.current}/{metrics.active_users.total}</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-full xl:w-1/3 p-3">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-light">Questions Answered</h3>
          <p className="text-3xl font-bold">{metrics.questions_answered}</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-full xl:w-1/3 p-3">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-light">Average Session Length</h3>
          <p className="text-3xl font-bold">{formatTime(metrics.average_session_length_seconds)}</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 lg:w-full xl:w-1/3 p-3">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-light">Starting Knowledge</h3>
          <p className="text-3xl font-bold">{metrics.starting_knowledge_percentage}%</p>
        </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-full xl:w-1/3 p-3">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-light">Current Knowledge</h3>
          <p className="text-3xl font-bold">{metrics.current_knowledge_percentage}%</p>
        </div>
        </div>

        <div className="w-full md:w-1/2 lg:w-full xl:w-1/3 p-3">
        <div className="p-4 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-light">Knowledge Gain</h3>
          <p className="text-3xl font-bold">+{metrics.current_knowledge_percentage - metrics.starting_knowledge_percentage}%</p>
        </div>
        </div>
      </div>
    </div>
  )
}

const ActivityGraph: React.FC<{activity: Activity[]}> = ({activity}) => {
  const data = activity.map((item) => ({
    name: item.month,
    value: item.value,
  }));
  return(
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-light mb-4">Activity Graph</h2>
        <div className="bg-white rounded-ms shadow-sm p-3">
          <LineChartComponent data={data} />
        </div>
    </div>
  );
};

const WeakestTopic: React.FC<{topics: Topic[]}> = ({topics}) =>{
  return (
    <div className="p-4 shadow-red-400 rounded-lg shadow-lg w-full">
      <h2 className="text-xl font-light mb-4">Weakest Topics</h2>
      {topics.map((topic, index) => (
        <div key={index} className="flex items-center mb-4">
          <img src={topic.image} alt={topic.name} className="w-12 h-8 mr-4 rounded"/>
            
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{topic.name}</h3>
            <div className="relative w-full bg-gray-300 rounded h-6 overflow-hidden">
              <div className="absolute top-0 left-0 h-full bg-red-600 rounded"
                style={{ width: `${topic.correct_percentage}%` }}></div>
                <div className="absolute top-0 left-0 h-full bg-red-300" style={{ left: `${topic.correct_percentage}%`, width: `${100 - topic.correct_percentage}%` }}/>
              <span className="absolute top-0 left-0 right-0 flex justify-center items-center text-white">
                {topic.correct_percentage}%
              </span>
            </div>
            </div>
        </div>
      ))}
    </div>
  )
}
const StrongestTopics: React.FC<{topics:Topic[]}> = ({topics}) =>{
  return (
    <div className="p-4 shadow-green-400 rounded-lg shadow-lg">
      <h2 className="text-xl font-light mb-4">Strongest Topics</h2>
      {topics.map((topic, index) => (
        <div key={index} className="flex items-center mb-4">
          <img src={topic.image} alt={topic.name} className="w-12 h-8 mr-4 rounded"/>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{topic.name}</h3>
            <div className="relative w-full bg-gray-300 rounded h-6">
              <div className="absolute top-0 left-0 h-full bg-green-600 rounded" style={{width: `${topic.correct_percentage}%`}}/>
              <div className="absolute top-0 left-0 h-full bg-green-300"
                style={{left: `${topic.correct_percentage}%`,width: `${100-topic.correct_percentage}%`}}/>
              <span className="absolute top-0 left-0 right-0 flex justify-center items-center text-white">
                {topic.correct_percentage}%
              </span>
            </div>
          </div>
        </div>
      ))}

    </div>
  )
};

const UserLeaderboard: React.FC<{users: User[]}> = ({users})=> {
  const sortedUsers = [...users].sort((a, b) => b.accuracy_percentage - a.accuracy_percentage);
  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-light mb-4">User Leaderboard</h2>
      {sortedUsers.map((user, index) => (
        <div key={index} className="flex items-center mb-4">
          <img src={user.image} alt={user.name} className="w-12 h-12 mr-4 rounded-lg"/>
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-sm text-gray-600">{user.points} Points.</p>
            <div className="flex items-center">
              <p className="text-sm text-gray-600">{user.accuracy_percentage}% Correct</p>
              <div className={`flex items-center ml-2 ${index === 0 ? 'text-green-600':'text-red-600'}`}>
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`M${index === 0 ? '5 15l7-7 7 7' : '19 9l-7 7-7-7'}`}/>
                </svg>
                <p className="text-sm">{index + 1}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

const GroupLeaderboard: React.FC<{groups: Group[]}> = ({groups}) => {
const sortedGroups = groups.sort((a,b) => b.accuracy_percentage - a.accuracy_percentage);
  return(
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-light mb-4">Group Leaderboard</h2>
      {sortedGroups.map((group, index) => (
        <div key={index} className="flex items-center mb-4">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold">{group.group_name}</h3>
            <p className="text-sm text-gray-600">{group.points_per_user}Points/User.</p>
            <div className="flex items-center">
              <p className="text-sm text-gray-600">{group.accuracy_percentage}% Correct</p>
              <div className={`flex items-center ml-2 ${index === 0 ? 'text-green-600':'text-red-600'}`}>
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={`M${index === 0 ? '5 15l7-7 7 7' : '19 9l-7 7-7-7'}`}/>
                </svg>
                <p className="text-sm">{index + 1}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
};

export default ContentArea;
