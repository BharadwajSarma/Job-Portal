import { Webhook } from "svix"
import User from "../models/User.js"

export const clerkWebhooks = async (req, res) => {
  try {
    console.log("📩 Clerk Webhook Triggered")

    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    const evt = wh.verify(req.body, {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    })

    const { data, type } = evt
    console.log(`📦 Webhook Type: ${type}`)
    console.log("🧾 Data:", data)

    if (type === "user.created") {
      const userData = {
        _id: data.id, // Clerk user ID (used in req.auth.userId)
        email: data.email_addresses[0].email_address,
        name: `${data.first_name ?? ''} ${data.last_name ?? ''}`,
        image: data.image_url,
        resume: "",
      }

      await User.create(userData)
      console.log("✅ User created in MongoDB:", userData)
    }

    res.status(200).json({ success: true })
  } catch (error) {
    console.error("❌ Webhook Error:", error)
    res.status(400).json({ success: false, message: "Webhooks Error", error: error.message })
  }
}
