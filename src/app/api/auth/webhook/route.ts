// pages/api/clerk-webhook.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { ClerkWebhookEvent } from '../../../../types'; // A custom type for Clerk's webhook events
import crypto from 'crypto';
import { connectDB } from '@/lib/connectDB';
import User from '@/models/User';

// Helper to verify Clerk webhook signature
const verifyWebhook = (req: NextApiRequest) => {
  const signature = req.headers['clerk-signature'];
  const body = JSON.stringify(req.body);
  const secret = process.env.CLERK_WEBHOOK_SECRET;

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(body);
  const expectedSignature = hmac.digest('hex');

  return signature === expectedSignature;
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const isVerified = verifyWebhook(req);

    if (!isVerified) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event: ClerkWebhookEvent = req.body;

    // Sync Clerk data to MongoDB
    if (event.type === 'user.created' || event.type === 'user.updated') {
      const db = await connectDB();
      const { id, firstName, emailAddresses, profileImageUrl } = event.data;

      let user = await User.findOne({ clerkId: id });

      if (!user) {
        // If user does not exist, create it
        user = new User({
          clerkId: id,
          name: firstName,
          email: emailAddresses[0].emailAddress,
          avatar: profileImageUrl,
        });
        await user.save();
      } else {
        // If user exists, update it
        user.name = firstName;
        user.email = emailAddresses[0].emailAddress;
        user.avatar = profileImageUrl;
        await user.save();
      }
    }

    res.status(200).json({ success: true });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};
