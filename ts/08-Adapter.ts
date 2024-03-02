/*
# Suppose you are working on a project that integrates data from multiple sources
# One of the sources provides data in XML format, while another provides data in JSON format
# You need to create an adapter to convert the JSON data into a format that your existing XML parser can handle
*/

interface XMLParser {
    parseXML(xmlData: string): void;
}

class SimpleXMLParser implements XMLParser {
    parseXML(xmlData: string): void {
        console.log("Parsing XML data:", xmlData);
    }
}

interface JSONDataSource {
    getJSON(): string;
}

class SimpleJSONDataSource implements JSONDataSource {
    getJSON(): string {
        const jsonData: string = '{"key": "value"}';
        console.log("Retrieving JSON data:", jsonData);
        return jsonData;
    }
}

class JSONToXMLAdapter implements XMLParser {
    private jsonDataSource: JSONDataSource;

    constructor(jsonDataSource: JSONDataSource) {
        this.jsonDataSource = jsonDataSource;
    }

    parseXML(xmlData: string): void {
        const jsonData: string = this.jsonDataSource.getJSON();
        const xmlDataFormatted: string = `<xml><data>${jsonData}</data></xml>`;
        console.log("Converted JSON to XML:", xmlDataFormatted);
        new SimpleXMLParser().parseXML(xmlDataFormatted);
    }
}

function main() {
    const jsonDataSource: JSONDataSource = new SimpleJSONDataSource();
    const jsonToXMLAdapter: XMLParser = new JSONToXMLAdapter(jsonDataSource);
    jsonToXMLAdapter.parseXML("");
}

main();
