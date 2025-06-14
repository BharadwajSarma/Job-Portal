import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  console.log("📩 Webhook endpoint hit");
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    const payload = req.body // raw body
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"]
    }

    const evt = whook.verify(payload, headers) // ✅ already parsed!
    const { data, type } = evt; // ✅ fixed!

    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
          resume: ''
        }
        console.log("Creating user:", userData)
        await User.create(userData)
        res.json({})
        break;
      }
      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          image: data.image_url,
        }
        console.log("Updating user:", data.id)
        await User.findByIdAndUpdate(data.id, userData)
        res.json({})
        break;
      }
      case 'user.deleted': {
        console.log("Deleting user:", data.id)
        await User.findByIdAndDelete(data.id)
        res.json({})
        break;
      }
      default:
        console.log("Unhandled event type:", type)
        res.status(200).end()
        break;
    }

  } catch (error) {
    console.error("❌ Webhook error:", error)
    res.status(400).json({ success: false, message: "Webhook Error", error: error.message })
  }
}
