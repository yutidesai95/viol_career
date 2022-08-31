import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
    if (req.method === 'POST') {
    const data = req.body;
    const { id, applicationId, labelFor, labelName, inputType, inputId, inputValue } = data;

   // const client = await connectToDatabase();
    //const db = client.db();

    const { db } = await connectToDatabase();

    const result = await db.collection('appFieldInfo').insertOne({
        id: id, 
        appId: applicationId, 
        labelFor: labelFor, 
        labelName: labelName, 
        inputType: inputType, 
        inputId: inputId,
        inputValue: inputValue,
    });
    console.log('appid',applicationId);
    res.status(201).json({ message:'AppFieldInfos created' });

}

//console.log(req.query.page, req.query.limit);
if (req.method === 'GET') {
        const pid = req.query;
        // Connect to the MongoDB cluster
        //const client = await connectToDatabase();
        // Make the appropriate DB calls
        //const db = client.db();

        const { db } = await connectToDatabase();
        const fieldInfos = 
        await db.collection('appFieldInfo').find({ appId: pid.addFieldInfo }).toArray();
        res.status(200).json(fieldInfos);
        console.log('id coming from get req',pid);
        console.log("all the field infos",fieldInfos);        
                   
}
}

export default handler;