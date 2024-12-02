export default function Filters() {
    return (
      <div className="flex items-center mb-6">
        <div className="flex items-center mr-20">
          <span className="mr-2">Timeframe: </span>
          <select id="timeframe" className="custom-select border px-20 py-2 rounded-md shadow-md">
            <option>Last 7 Days</option>
            <option>This Month</option>
            <option>This Year</option>
            <option>Custom</option>
          </select>
        </div>
        <div className="flex items-center mr-20">
        <span className="mr-2">People: </span>
          <select id="people" className="border px-20 py-2 rounded-md shadow-md">
            <option>All</option>
            <option>Jesse Thomas</option>
            <option>Helen Chuang</option>
          </select>
        </div>
        <div>
        <span className="mr-2">Topic: </span>
          <select id="topic" className="border px-20 py-2 rounded-md shadow-md">
            <option>All</option>
          </select>
        </div>
      </div>
    );
  }
  