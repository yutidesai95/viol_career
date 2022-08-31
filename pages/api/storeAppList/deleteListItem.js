import { connectToDatabase } from '../../../lib/db';

async function handler(req, res) {
    if (req.method === 'POST') {

    const data = req.body;
    const { appNameId } = data;

   // const client = await connectToDatabase();
    //const db = client.db();

    const { db } = await connectToDatabase();

    const result = await db.collection('applists').deleteOne({
        id: appNameId,
    });
    
    const output = await db.collection('appFieldInfo').deleteMany({
        appId: appNameId,
    });
    res.status(201).json({ message:'Item deleted' });
    res.status(201).json({ message:'Fields associated with the given id are deleted' });

   
}
}

export default handler;