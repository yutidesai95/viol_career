import { connectToDatabase } from '../../../../lib/db';

async function handler(req, res) {
    if (req.method === 'POST') {

    const data = req.body;
    const { fieldInfoId } = data;

    //const client = await connectToDatabase();
    //const db = client.db();

    const { db } = await connectToDatabase();

    const result = await db.collection('appFieldInfo').deleteOne({
        id: fieldInfoId,
    });
    res.status(201).json({ message:'Item deleted' });
  
}
}

export default handler;