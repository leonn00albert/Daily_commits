
import * as IPFS from 'ipfs-core'

import * as fs from 'fs';

import * as events from 'events';
events.EventEmitter.defaultMaxListeners = 15; // You can adjust this number as needed
class IpfsUploader {
    constructor() {
       
    }

    async uploadFile(filePath) {
        const ipfs =  await IPFS.create();
        const fileContent = fs.readFileSync(filePath);
        const fileAdded = await ipfs.add(fileContent);
        const cid = fileAdded.cid.toString();
        
        // Publish the file to the IPFS network
        await ipfs.pin.add(cid); // Make sure the file is pinned to keep it accessible
        await ipfs.name.publish(cid); // Publish the file
        
        return cid;
    }
}

class CLI {
    constructor() {
        this.ipfsUploader = new IpfsUploader();
    }

    async uploadFile(filePath) {
        try {
            const cid = await this.ipfsUploader.uploadFile(filePath);
            this.promptFileUploaded(cid);
        } catch (error) {
            this.promptError(error);
        }
    }

    promptWelcome() {
        console.log('Welcome to IPFS File Uploader!');
        this.promptUploadFile();
    }

    promptUploadFile() {
        console.log('Please enter the file path to upload:');
    }

    promptFileUploaded(cid) {
        console.log('File uploaded successfully. IPFS CID:', cid);
    }

    promptError(error) {
        console.error('An error occurred:', error);
    }
}

const cli = new CLI();
cli.promptWelcome();

// Command line argument handling
if (process.argv.length <= 2) {
    console.log("Usage: node script.js <file path>");
    process.exit(-1);
}

const filePath = process.argv[2];
cli.uploadFile(filePath);
