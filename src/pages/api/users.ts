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

type ResponseErrorData = {
  message: string | boolean;
};

async function users(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData | ResponseErrorData>,
): Promise<void> {
  if (request.method === 'POST') {
    try {
      const {
        username,
        avatar,
        email,
        thumbnailUrl,
        level,
        currentExperience,
        totalExperience,
        challengesCompleted,
      }: ResponseData = request.body;

      const { database } = await connectToDatabase();

      const collection = database.collection('users');

      const userExist: ResponseData = await collection.findOne({ email });

      if (userExist) {
        await collection.updateOne(
          { _id: userExist._id },
          {
            $set: {
              username,
              avatar,
              email,
            },
          },
        );
        const userUpdated = userExist;
        return response.status(201).json(userUpdated);
      }

      await collection.insertOne({
        username,
        avatar,
        email,
        thumbnailUrl,
        level,
        currentExperience,
        totalExperience,
        challengesCompleted,
      });

      const user: ResponseData = await collection.findOne({ email });

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({ message: 'Something wrong' });
    }
  }

  if (request.method === 'GET') {
    const { email, hasUser } = request.query;

    const { database } = await connectToDatabase();

    const collection = database.collection('users');

    const user: ResponseData | ResponseErrorData = await collection.findOne({
      email,
    });

    if (!user) {
      if (hasUser) {
        return null;
      }
      return response.status(500).json({ message: 'User not found' });
    }

    return response.status(200).json(user);
  }

  if (request.method === 'PATCH') {
    try {
      const {
        email,
        level,
        thumbnailUrl,
        currentExperience,
        totalExperience,
        challengesCompleted,
      }: ResponseData = request.body;

      const { database } = await connectToDatabase();

      const collection = database.collection('users');

      const userExist: ResponseData = await collection.findOne({ email });

      if (userExist) {
        if (level != null && currentExperience != null) {
          await collection.updateOne(
            { _id: userExist._id },
            {
              $set: {
                level,
                thumbnailUrl,
                currentExperience,
                totalExperience,
                challengesCompleted,
              },
            },
          );
          const userUpdated = userExist;
          return response.status(201).json(userUpdated);
        }
        if (level != null) {
          await collection.updateOne(
            { _id: userExist._id },
            {
              $set: {
                level,
                thumbnailUrl,
              },
            },
          );
          const userUpdated = userExist;
          return response.status(201).json(userUpdated);
        }

        await collection.updateOne(
          { _id: userExist._id },
          {
            $set: {
              currentExperience,
              totalExperience,
              challengesCompleted,
            },
          },
        );
        const userUpdated = userExist;
        return response.status(201).json(userUpdated);
      }
    } catch (err) {
      return response.status(400).json({ message: 'Something wrong' });
    }
  }
  return null;
}

export default users;
