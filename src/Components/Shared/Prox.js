import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Prox() {
  const [wsdlText, setWsdlText] = useState("");
  const [operations, setOperations] = useState([]);

  useEffect(() => {
    const fetchWsdl = async () => {
      try {
        
        const res = await axios.get("http://localhost:5000/wsdl", { responseType: "text" });
        setWsdlText(res.data);

        const parser = new DOMParser();
        const xml = parser.parseFromString(res.data, "text/xml");
        const opNodes = Array.from(xml.getElementsByTagNameNS("*", "operation"));
        const names = Array.from(new Set(opNodes.map((n) => n.getAttribute("name")).filter(Boolean)));
        setOperations(names);
      } catch (e) {
        console.error(e);
      }
    };
    fetchWsdl();
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <h2>Operations</h2>
      <ul>
        {operations.map((op) => (
          <li key={op}>{op}</li>
        ))}
      </ul>

      <h2>Raw WSDL</h2>
      <pre style={{ whiteSpace: "pre-wrap", maxHeight: 300, overflow: "auto" }}>
        {wsdlText || "Loading..."}
      </pre>
    </div>
  );
}
