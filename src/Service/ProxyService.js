import axios from "axios";

export const getWsdlActions = async (url) => {

    
    try {
        const res = await axios.post("http://localhost:5000/api/wsdl-actions", {
            wsdlUrl: url
        });
        console.log("Available Services & Actions:", res.data);
        return res.data;
    } catch (e) {
        console.error(e);
        throw e;
    }
}


export const callAction = async (url, action, body) => {

    try {
        const res = await axios.post("http://localhost:5000/api/call", {
            wsdlUrl: CheckURL(url),
            action: action,
            params: body
        });

        console.log("SOAP Request:", res.data.request);
        console.log("SOAP Response:", res.data.response);
        console.log("Parsed Result:", res.data.parsed);
        return res.data.parsed;
    } catch (err) {
        console.log({ err })
        throw err;
    }

}

export const GetServices = async () => {

    try {
        const res = await axios.get("http://localhost:5000/api/list");

        return res.data;
    } catch (err) {
        console.log({ err })
        throw err;
    }

}

export const AddNewService = async (body) => {

    try {
        const res = await axios.post("http://localhost:5000/api/add",body);
    } catch (err) {
        console.log({ err })
        throw err;
    }

}


export const CheckURL = (url) => {

    if (url.includes('WSDL'))
        return url;

    else if (url.includes('?')) {

        var newUrl = url.split('?');
        return newUrl + "?WSDL"
    }
    else return url + "?WSDL"

}