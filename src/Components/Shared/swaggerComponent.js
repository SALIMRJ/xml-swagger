import React, { useState } from 'react';
import ApiEndpointComponent from './ApiEndpointComponent';
import { getWsdlActions, CheckURL } from '../../Service/ProxyService';
import Loader from './Loader';
import Alert from './Alert';
import ServicesDialog from './ServicesDialog'

export default function SwaggerComponent() {
    const [Url, setUrl] = useState("");
    const [data, setData] = useState(null);
    const [loader, setLoader] = useState(false);


    const callSoapApi = async () => {
        setLoader(true);
        setData(null);
        try {
            // window.showAlert("Info message", "info")
            var res = await getWsdlActions(CheckURL(Url));
            console.log({ res })
            setData(res);
        } catch (error) {
            console.error("Error fetching WSDL:", error);
            window.showAlert("Error : " + error, 'danger')
        }
        setLoader(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            callSoapApi();
        }
    };



    return (
        <div className="max-w-7xl mx-auto p-8 bg-gray-50 min-h-screen">
            <Alert />
            {loader && <Loader />}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">XML-Swagger</h1>
            </div>
            <div class="mb-6">
                <label for="URL" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL</label>
                <div class="flex gap-2">
                    <input
                        type="url"
                        id="URL"
                        class="flex-grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="URL"
                        required
                        value={Url}
                        onChange={(e) => (setUrl(e.target.value))}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <button
                        type="submit"
                        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={() => callSoapApi()}
                    >
                        GET
                    </button>

                    <ServicesDialog selectService={setUrl} />
                </div>
            </div>

            <hr className=" my-6 border-gray-200" />

            {data && data?.actions && data?.actions?.map((item) => {

                return <ApiEndpointComponent action={item?.actionName} url={item?.endpoint} request={item?.requestTemplate} soapAction={item?.soapAction} response={item?.responseTemplate} />
            })}

        </div>
    );
}
