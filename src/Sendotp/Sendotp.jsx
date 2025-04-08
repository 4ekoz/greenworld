import { useState } from "react";

function SendOTP() {
  const [email, setEmail] = useState("");  // حفظ الإيميل
  const [message, setMessage] = useState("");  // عرض رسائل النجاح أو الخطأ

  const sendOTP = async () => {
    try {
      const response = await fetch("https://green-world-vert.vercel.app/auth/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("✅ تم إرسال OTP إلى بريدك الإلكتروني");
      } else {
        setMessage("❌ فشل في إرسال OTP");
      }
    } catch (error) {
      setMessage("❌ حدث خطأ أثناء الإرسال");
    }
  };

  return (
    <div>
      <h2>إرسال OTP</h2>
      <input
        type="email"
        placeholder="أدخل بريدك الإلكتروني"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={sendOTP}>إرسال OTP</button>
      <p>{message}</p>
    </div>
  );
}

export default SendOTP;
