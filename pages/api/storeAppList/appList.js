import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
    if (req.method === 'POST') {

    const data = req.body;
    const { id, name, des, quali, jobtype, status } = data;

    //const client = await connectToDatabase();
    //const db = client.db();

    const { db } = await connectToDatabase();

    const result = await db.collection('applists').insertOne({
        id: id,
        appName: name,
        appDescription: des,
        qualifications: quali,
        jobType: jobtype,
        appstatus: status,
    });
    console.log('appid',id);
    res.status(201).json({ message:'App created' });
   
}

if (req.method === 'GET') {


        //       // Connect to the MongoDB cluster
                // const client = await connectToDatabase();
        //         // Make the appropriate DB calls
                // const db = client.db();
                const { db } = await connectToDatabase();
                 const appNames = await db.collection('applists').find().toArray();
                 res.status(200).json(appNames);
                 console.log("all the names",appNames);
           
                 
              
}

if (req.method === 'PATCH') {
    
    const appid = req.body.id;
    const appstatus = req.body.status; 
   
   // const client = await connectToDatabase();
    const { db } = await connectToDatabase();

    const applistsCollection = db.collection('applists');

    const result = await applistsCollection.updateOne(
        { id: appid },
        { $set: { appstatus: appstatus } }
    );

   
    res.status(200).json({ message: 'Status updated!' });
   
    
}

}

export default handler;