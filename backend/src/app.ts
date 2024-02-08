import * as grpc from '@grpc/grpc-js';
import { connect, Contract, Identity, Signer, signers } from '@hyperledger/fabric-gateway';
import * as crypto from 'crypto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { TextDecoder } from 'util';
import * as uuid from 'uuid'
import { processTransaction } from './stripe';
const channelName = envOrDefault('CHANNEL_NAME', 'mychannel');
const chaincodeName = envOrDefault('CHAINCODE_NAME', 'invoice');
const mspId = envOrDefault('MSP_ID', 'Org1MSP');

const keyDirectoryPath = './keystore'
const certPath = './cert.pem'
const tlsCertPath = './ca.crt'
const peerEndpoint = envOrDefault('PEER_ENDPOINT', 'localhost:7051');
const peerHostAlias = envOrDefault('PEER_HOST_ALIAS', 'peer0.org1.example.com');

const utf8Decoder = new TextDecoder();

export default async function main() {

    const client = await newGrpcConnection();

    const gateway = connect({
        client,
        identity: await newIdentity(),
        signer: await newSigner(),
        evaluateOptions: () => {
            return { deadline: Date.now() + 5000 }; 
        },
        endorseOptions: () => {
            return { deadline: Date.now() + 15000 }; 
        },
        submitOptions: () => {
            return { deadline: Date.now() + 5000 }; 
        },
        commitStatusOptions: () => {
            return { deadline: Date.now() + 60000 }; 
        },
    });


    try {
        const network = gateway.getNetwork(channelName);
        const contract = network.getContract(chaincodeName);


        
        return {
            createInvoice:  (data: any) => _createInvoice(contract, data),
            getUnhandledInvoices: (owner: string) => _getUnhandledInvoices(contract, owner),
            getMyInvoices: (owner: string) => _getMyInvoices(contract, owner),
            signInvoice: (id: string) => _signInvoice(contract, id),
        }
    } catch (e: any) {
        console.log(e);
        return {}
    }
}




async function newGrpcConnection(): Promise<grpc.Client> {
    const tlsRootCert = await fs.readFile(tlsCertPath);
    const tlsCredentials = grpc.credentials.createSsl(tlsRootCert);
    return new grpc.Client(peerEndpoint, tlsCredentials, {
        'grpc.ssl_target_name_override': peerHostAlias,
    });
}

async function newIdentity(): Promise<Identity> {
    const credentials = await fs.readFile(certPath);
    return { mspId, credentials };
}

async function newSigner(): Promise<Signer> {
    const files = await fs.readdir(keyDirectoryPath);
    const keyPath = path.resolve(keyDirectoryPath, files[0]);
    const privateKeyPem = await fs.readFile(keyPath);
    const privateKey = crypto.createPrivateKey(privateKeyPem);
    return signers.newPrivateKeySigner(privateKey);
}

async function _createInvoice(contract: Contract, data: any): Promise<void> {
    const v = await processTransaction(uuid.v4(), data.productName, data.description, Number(data.unitPrice)*100)

    console.log("v", v);
    
    await contract.submitTransaction(
        'CreateInvoice',
        v.id.toString(),
        data.productName,
        data.unitPrice.toString(),
        data.description,
        data.customer,
        v.url,
        new Date().toISOString(),
        data.owner
    );
}


async function _signInvoice(contract: Contract, id: string): Promise<void> {
    await contract.submitTransaction(
        'SignInvoice',
        id
    );
    
}

async function _getUnhandledInvoices(contract: Contract, owner: string) {
    const resultBytes = await contract.evaluateTransaction('GetUnhandledInvoices', owner);
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return result
}

async function _getMyInvoices(contract: Contract, owner: string) {
    const resultBytes = await contract.evaluateTransaction('GetMyInvoices', owner);
    const resultJson = utf8Decoder.decode(resultBytes);
    const result = JSON.parse(resultJson);
    return result
}


function envOrDefault(key: string, defaultValue: string): string {
    return process.env[key] || defaultValue;
}
