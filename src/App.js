import React from 'react';
import './App.css';
import { useTabStore } from './store/tabStore';
import { useFetchContents } from './store/hooks/getDummyContent';

function App() {
  const { activeTab, setActiveTab } = useTabStore();
  const tabs = [
    { id: 1, label: 'Tab 1', paragraphs: 1 },
    { id: 2, label: 'Tab 2', paragraphs: 2 },
    { id: 3, label: 'Tab 3', paragraphs: 3 },
  ];
  const { 
    data: content, 
    isLoading, 
    isError, 
    invalidateContent 
  } = useFetchContents(activeTab);


  return (
    <div className="App flex justify-center items-center mt-10">
      <div className="w-full max-w-2xl">
        <div className="flex bg-gray-800 rounded-t-lg">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-150 
                ${activeTab === tab.id 
                  ? 'bg-blue-500 text-white shadow-sm top-0 bottom-0 left-0 right-0' 
                  : 'text-white-600 hover:bg-gray-700 text-white'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        <div className="bg-white p-4 rounded-b-lg shadow">
          {isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            <div>Error loading content</div>
          ) : (
            <div>
              <div>{content}</div>
              <button onClick={invalidateContent}>
                Refresh Content
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
