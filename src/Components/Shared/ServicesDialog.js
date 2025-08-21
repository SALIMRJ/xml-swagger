import React, { useEffect, useState } from "react";
import { GetServices, AddNewService } from "../../Service/ProxyService";

export default function ServicesDialog({ selectService }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("services");
  const [serviceList, setServiceList] = useState([]);
  const [searchServiceList, setSearchServiceList] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [newServiceName, setNewServiceName] = useState("");
  const [newServiceUrl, setNewServiceUrl] = useState("");
  const [newServiceDescription, setNewServiceDescription] = useState("");
  const [errors, setErrors] = useState({});

  const getServiceList = async () => {
    const list = await GetServices();
    setServiceList(list);
    setSearchServiceList(list);
  };

  useEffect(() => {
    if (isOpen) getServiceList();
  }, [isOpen]);

  // البحث
  useEffect(() => {
    const handler = setTimeout(() => {
      if (!searchText.trim()) setServiceList(searchServiceList);
      else {
        const filtered = searchServiceList.filter(
          (item) =>
            item.Name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.Url.toLowerCase().includes(searchText.toLowerCase()) ||
            item.Description.toLowerCase().includes(searchText.toLowerCase())
        );
        setServiceList(filtered);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchText, searchServiceList]);

  const selectServiceHandler = (url) => {
    selectService(url);
    setIsOpen(false);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newServiceName.trim()) newErrors.name = "Name is required";
    if (!newServiceUrl.trim()) newErrors.url = "URL is required";
    if (!newServiceDescription.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addServiceHandler = async () => {
    if (!validateForm()) return; 

    const newService = {
      Name: newServiceName,
      Url: newServiceUrl,
      Description: newServiceDescription,
    };

    await AddNewService(newService); 
    getServiceList(); 
    setActiveTab("services"); 
    setNewServiceName("");
    setNewServiceUrl("");
    setNewServiceDescription("");
    setErrors({});
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
      >
        Services
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg w-full max-w-5xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center border-b pb-2 mb-4">
              <h2 className="text-lg font-semibold">Services</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "services"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("services")}
              >
                Services
              </button>
              <button
                className={`px-4 py-2 font-medium ${
                  activeTab === "add"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("add")}
              >
                Add Service
              </button>
            </div>

            {activeTab === "services" && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search services..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="max-h-60 overflow-y-auto space-y-3">
                  {serviceList && serviceList.length > 0 ? (
                    serviceList.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => selectServiceHandler(item.Url)}
                        className="cursor-pointer p-2 border rounded-lg hover:bg-gray-100 transition"
                      >
                        <p className="font-semibold text-blue-600">{item.Name}</p>
                        <p className="text-gray-700">{item.Description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No services found</p>
                  )}
                </div>
              </>
            )}

            {activeTab === "add" && (
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={newServiceName}
                  onChange={(e) => setNewServiceName(e.target.value)}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.name ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

                <input
                  type="text"
                  placeholder="Service URL"
                  value={newServiceUrl}
                  onChange={(e) => setNewServiceUrl(e.target.value)}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.url ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
                {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}

                <textarea
                  placeholder="Description"
                  value={newServiceDescription}
                  onChange={(e) => setNewServiceDescription(e.target.value)}
                  className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.description ? "border-red-500 focus:ring-red-500" : "focus:ring-blue-500"
                  }`}
                />
                {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}

                <div className="flex justify-end gap-2">
                  <button
                    onClick={addServiceHandler}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                  >
                    Add Service
                  </button>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded border border-red-500 text-red-500 hover:bg-red-100"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
