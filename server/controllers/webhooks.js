import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    console.log("Webhook received");

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Use raw body for verification
    const payload = req.body.toString("utf8");
    console.log("Raw payload:", payload);

    // Verify the webhook signature using raw payload and headers
    await whook.verify(payload, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    });
    console.log("Webhook signature verified");

    // Parse the JSON payload after verification
    const { data, type } = JSON.parse(payload);
    console.log("Parsed data:", data);
    console.log("Event type:", type);

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: [data.first_name, data.last_name].filter(Boolean).join(" ") || "Anonymous",
          image: data.image_url,
          resume: ''
        };
        console.log("Creating user:", userData);
        await User.create(userData);
        console.log("User created successfully");
        res.json({});
        break;
      }
      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: [data.first_name, data.last_name].filter(Boolean).join(" ") || "Anonymous",
          image: data.image_url,
        };
        console.log("Updating user:", data.id, userData);
        await User.findByIdAndUpdate(data.id, userData);
        console.log("User updated successfully");
        res.json({});
        break;
      }
      case 'user.deleted': {
        console.log("Deleting user:", data.id);
        await User.findByIdAndDelete(data.id);
        console.log("User deleted successfully");
        res.json({});
        break;
      }
      default:
        console.log("Unhandled event type:", type);
        res.json({});
        break;
    }
  } catch (error) {
    console.error("Webhook error:", error);
    res.status(400).json({ success: false, message: "Webhooks Error" });
  }
};
