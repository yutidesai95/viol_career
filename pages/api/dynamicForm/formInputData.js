import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
    if (req.method === 'POST') {

    const data = req.body;
    //const { id, name } = data;

   // const client = await connectToDatabase();
    //const db = client.db();

    const { db } = await connectToDatabase();

    const result = await db.collection('dynamicFormInput').insertOne({
        dynamicData: data,
    });
    res.status(201).json({ message:'Dynamic data submitted' });
  
}
}

export default handler;