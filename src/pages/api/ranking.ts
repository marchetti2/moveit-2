import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from './_mongodbConnection';

interface ResponseData {
  _id: number;
  username: string;
  avatar: string;
  email: string;
  thumbnailUrl: string;
  level: number;
  currentExperience: number;
  totalExperience: number;
  challengesCompleted: number;
}

type Data = ResponseData[];

async function ranking(
  request: NextApiRequest,
  response: NextApiResponse,
): Promise<void> {
  if (request.method === 'GET') {
    try {
      const { database } = await connectToDatabase();

      const collection = database.collection('users');

      const userData: Data = await collection
        .find()
        .sort({ totalExperience: -1 })
        .toArray()
        .then((data: Data) => {
          return data;
        });

      return response.status(200).json(userData);
    } catch (error) {
      return response.status(400).json({ message: 'Something wrong' });
    }
  }
  return null;
}

export default ranking;
