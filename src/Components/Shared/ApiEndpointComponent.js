import React, { useState } from 'react';
import { callAction } from '../../Service/ProxyService';
import Loader from './Loader';
import Alert from './Alert';

const ApiEndpointComponent = ({ action, url, request = "", soapAction, response = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTry, setIsTry] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cancelBtn, setCancelBtn] = useState(false);
  const [requestState, setRequestState] = useState(JSON.stringify(request, null, 3));
  const [responseState, setResponseState] = useState(JSON.stringify(response, null, 3));

  const callApihandler = async () => {
    try {
      setLoader(true);
      setCancelBtn(true);
      const response = await callAction(url, action, requestState)
      setResponseState(JSON.stringify(response, null, 3))
      setLoader(false);
    } catch (err) {
      window.showAlert("Error : " + err, 'danger')
    } finally {
      setLoader(false);
    }
  }

  const Resethandler = async () => {
    setRequestState(JSON.stringify(request, null, 3));
    setResponseState(JSON.stringify(response, null, 3));
    setCancelBtn(false);
  }


  const tryoutHandler = async () => {
    setRequestState(JSON.stringify(request, null, 3));
    setResponseState(JSON.stringify(response, null, 3));
    setCancelBtn(false);
  }
  const cancelHandler = async () => {
    setRequestState(JSON.stringify(request, null, 3));
    setResponseState(JSON.stringify(response, null, 3));
    setCancelBtn(false);
  }


  return (

    <div className="max-w-7xl mx-auto my-4 border border-gray-200 rounded-lg overflow-hidden">
      <Alert />
      {loader && <Loader />}
      {/* Header - clickable to toggle */}
      <div
        className="flex items-center justify-between bg-gray-800 text-white p-4 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <span className="bg-green-500 text-xs font-bold px-2 py-1 rounded mr-3">POST</span>
          <span className="font-mono">{action && action}</span>
        </div>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="bg-white p-4">
          {/* Parameters Section */}
          <div className="mb-6">
            <div className="bg-gray-50 p-3 rounded">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-2">
                <span className="text-gray-700"></span>
                {!isTry && <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={() => setIsTry(true)}
                >
                  Try it out
                </button>}

                {isTry && <button
                  type="submit"
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-800"
                  onClick={() => setIsTry(false)}
                >
                  Cancel
                </button>}

              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500"></span>
              </div>
            </div>
          </div>

          {/* Request Body */}
          <div className="mb-6">
            <h3 className="font-medium text-gray-800 mb-2">Request body</h3>

            <div className="mb-4">
              <textarea
                className="w-full h-40 bg-gray-900 text-green-400 font-mono text-sm p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                //defaultValue={JSON.stringify(request, null, 3)}
                value={requestState}
                onChange={(e) => setRequestState(e.target.value)}
                disabled={!isTry}
              />
            </div>
          </div>




          {isTry && <div className="flex space-x-2 mb-4">
            <button
              className="flex-1 rounded-md bg-green-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:bg-green-700 focus:bg-green-700 active:bg-green-800 disabled:pointer-events-none disabled:opacity-50"
              type="button"
              onClick={() => { callApihandler() }}
            >
              Execute
            </button>

            {cancelBtn && ( // غيّر الشرط هون لإظهار/إخفاء Reset
              <button
                className="flex-1 rounded-md bg-red-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:bg-red-700 focus:bg-red-700 active:bg-red-800 disabled:pointer-events-none disabled:opacity-50"
                type="button"
                onClick={() => Resethandler()}
              >
                Reset
              </button>
            )}
          </div>}


          {/* Responses */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Responses</h3>


            <div className="mt-4">
              <div className="mb-4">
                <textarea
                  className="w-full h-40 bg-gray-900 text-green-400 font-mono text-sm p-3 rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={JSON.stringify(response, null, 3)}
                  value={responseState}
                  // onChange={(e)=>setResponseState(e.target.value)}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApiEndpointComponent;