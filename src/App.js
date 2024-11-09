
import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import { FaBars, FaTimes } from 'react-icons/fa';
import { IoChevronBackSharp } from "react-icons/io5";
import { IoRemove } from "react-icons/io5";

function App() {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [schemaOptions, setSchemaOptions] = useState([
    { label: 'First Name', value: 'first_name', hasSelected: false },
    { label: 'Last Name', value: 'last_name', hasSelected: false },
    { label: 'Gender', value: 'gender', hasSelected: false },
    { label: 'Age', value: 'age', hasSelected: false },
    { label: 'Account Name', value: 'account_name', hasSelected: false },
    { label: 'City', value: 'city', hasSelected: false },
    { label: 'State', value: 'state', hasSelected: false },
  ]);
  const [segmentName, setSegmentName] = useState('');

  const [selectedSchemas, setSelectedSchemas] = useState([]);

  const handleAddSchema = () => {
    setSelectedSchemas([...selectedSchemas, ""]);
  };

  const handleSchemaChange = (index, value) => {
    const newSelectedSchemas = [...selectedSchemas];
    newSelectedSchemas[index] = value;
    setSelectedSchemas(newSelectedSchemas);

    setSchemaOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.value === value
          ? { ...option, hasSelected: true }
          : option
      )
    );
  };

  const getAvailableOptions = () => {
    return schemaOptions.filter((option) => !selectedSchemas.includes(option.value));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const uploadData = async () => {
    const formattedSchemas = selectedSchemas
      .filter(schema => schema)
      .map(schema => {
        const option = schemaOptions.find(option => option.value === schema);
        return { [schema]: option.label };
      });
    const data = {
      segment_name: segmentName,
      schema: formattedSchemas
    };
    try {
      const response = await fetch('https://webhook.site/1a390c06-77f1-4b7f-8ad5-1bee5e6fbcf4', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'api-key': 'a5f528fc-4dac-4bff-863f-aa268296a4be'
        },
        body: JSON.stringify(data),
      });
      console.log("response: ", response)
      if (response.ok) {
        alert('Data uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading data:', error);
      alert('An error occurred while uploading data');
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="relative ">
        {/* Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 right-4 p-2 text-white z-20"
        >
          {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-0 right-0 h-full w-[500px] text-[#000] transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
            } transition-transform duration-300 ease-in-out shadow-lg z-10`}
        >
          <div className="p-4">
            <h2 className="text-xl flex justify-start items-center gap-[10px] text-[#fff]"><IoChevronBackSharp size={20} color={"#fff"} />Saving Segment</h2>
            <div className='flex flex-col mt-[50px]'>
              <span>Enter the Name of the Segment</span>
              <input type="text" id="textfield" className='w-full border mt-[20px] h-[40px] px-[10px]' placeholder='Name of the Segment'
                value={segmentName}
                onChange={(e) => setSegmentName(e.target.value)}
              />

              <span className='mt-[20px]'>To save your segment, you need to add the schemas to the build query</span>

              <div className='w-full flex justify-end items-center gap-[20px] mt-[20px]'>
                <div className='flex justify-center items-center'>
                  <div className='w-[10px] h-[10px] bg-green-500 rounded-full'></div>
                  <span>&nbsp;-User Traits</span>
                </div>
                <div className='flex justify-center items-center'>
                  <div className='w-[10px] h-[10px] bg-red-500 rounded-full'></div>
                  <span>&nbsp;-Group Traits</span>
                </div>
              </div>

              {/* main functionality begins here  */}
              <div className='mt-[20px]'>
                {selectedSchemas.map((selected, index) => (
                  <div key={index} className="flex items-center gap-2 mb-2">
                    <select
                      value={selected}
                      onChange={(e) => handleSchemaChange(index, e.target.value)}
                      className="border border-gray-300 rounded p-2 w-full"
                    >
                      <option value="">{selected}</option>
                      {getAvailableOptions().map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() =>
                        setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index))
                      }
                      className="text-red-500 p-2 bg-cyan-100"
                    >
                      <IoRemove color={"#083344"} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={handleAddSchema}
                  className="text-blue-500 underline"
                >
                  + Add new schema
                </button>
              </div>
            </div>
          </div>
          <div className='bg-gray-100 w-full absolute bottom-0 p-[20px] flex gap-[20px]'>
            <button className='p-2 bg-green-500 text-white px-4 rounded-[4px]'
              onClick={uploadData}
            >Save the Segment</button>
            <button className='p-2 bg-white text-red-600 px-4 rounded-[4px]'>Cancel</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8">
          <h1>Hello world</h1>
        </div>
      </div>
    </div>
  );
}

export default App;
