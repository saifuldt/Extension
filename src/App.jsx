import { useEffect, useState } from "react";
import allData from "/src/data.json";
import logo from "/src/assets/images/logo.svg";
import light from "/src/assets/images/icon-moon.svg";
import dark from "/src/assets/images/icon-sun.svg";

const App = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("all"); 
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    setData(allData);
  }, []);

  const toggleActive = (index) => {
    setData((prevData) =>
      prevData.map((item, i) =>
        i === index ? { ...item, isActive: !item.isActive } : item
      )
    );
  };

  const filteredData = data.filter((item) => {
    if (filter === "active") return item.isActive;
    if (filter === "inactive") return !item.isActive;
    return true;
  });

  return (
    <div className={`${isDark ? "bg-blue-950" : "bg-slate-300"} pt-4`}>
      <div
        className={`${isDark ? "bg-gray-700 " : "bg-slate-200"} flex justify-between items-center py-2 mx-32 px-4 rounded-xl text-white`}
      >
        <div>
          <img src={logo} alt="logo" />
        </div>
        <div>
          <button onClick={() => setDark(!isDark)}>
            {isDark ? <img src={dark} alt="dark" /> : <img src={light} alt="light" />}
          </button>
        </div>
      </div>

      
      <div
        className={`${isDark ? "text-white " : "text-black"} flex justify-between items-center py-2 mx-32 px-4 rounded-xl`}
      >
        <h3 className="text-xl">Extension List</h3>
        <div className="space-x-2">
          <button
            onClick={() => setFilter("all")}
            className={`border-2 border-white px-4 py-1 rounded-3xl bg-inherit hover:bg-red-500 hover:text-black ${filter === "all" ? "bg-red-500 text-black" : ""
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("active")}
            className={`border-2 border-white px-4 py-1 rounded-3xl bg-inherit hover:bg-red-500 hover:text-black ${filter === "active" ? "bg-red-500 text-black" : ""
              }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter("inactive")}
            className={`border-2 border-white px-4 py-1 rounded-3xl bg-inherit hover:bg-red-500 hover:text-black ${filter === "inactive" ? "bg-red-500 text-black" : ""
              }`}
          >
            Inactive
          </button>
        </div>
      </div>

      
      <div className="flex flex-wrap justify-center items-center gap-6 p-4">
        {filteredData.map((item, index) => (
          <div
            className={`${isDark ? "bg-gray-700 text-white" : "bg-slate-200"} flex flex-col justify-between w-[350px] h-[200px] p-4 rounded-xl`}
            key={index}
          >
            <div className="flex gap-2">
              <img className="w-12 h-12" src={item.logo} alt={item.name} />
              <div>
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className={`${isDark ? "text-gray-300" : "text-gray-700"} text-sm`}>{item.description}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <button className="border-2 border-white px-4 py-1 rounded-3xl bg-inherit hover:bg-red-500 hover:text-black">
                Remove
              </button>
              <button
                onClick={() => toggleActive(index)}
                className={`relative w-12 h-6 flex items-center rounded-full p-1 transition-colors ${item.isActive ? "bg-red-500" : "bg-gray-500"
                  }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${item.isActive ? "translate-x-6" : "translate-x-0"
                    }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
