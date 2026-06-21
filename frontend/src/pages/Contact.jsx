import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaCommentDots, FaPhoneAlt, FaMapMarkerAlt, FaClock, FaPaperPlane, FaHeadset, FaCheckCircle, FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaLinkedinIn, FaArrowRight } from "react-icons/fa";
import { Sparkles, Send, MessageCircle, HelpCircle } from "lucide-react";

const contactInfo = [
  { icon: <FaMapMarkerAlt className="w-5 h-5" />, label: "Our Address", value: "123, FoodExpress Tower, Connaught Place, New Delhi - 110001", color: "from-indigo-500 to-blue-500", bg: "bg-indigo-50" },
  { icon: <FaPhoneAlt className="w-5 h-5" />, label: "Phone Number", value: "+91 1800-123-4567", sub: "Mon-Sat, 9AM - 9PM", color: "from-purple-500 to-pink-500", bg: "bg-purple-50" },
  { icon: <FaEnvelope className="w-5 h-5" />, label: "Email Address", value: "support@foodexpress.in", sub: "We reply within 24 hrs", color: "from-orange-500 to-red-500", bg: "bg-orange-50" },
  { icon: <FaClock className="w-5 h-5" />, label: "Working Hours", value: "Mon - Sun: 7:00 AM - 11:00 PM", sub: "24/7 support available", color: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
];

const faqs = [
  { q: "How can I track my order?", a: "You can track your order in real-time from the Orders page. A tracking link will also be sent via SMS and email once your order is confirmed." },
  { q: "What payment methods do you accept?", a: "We accept Credit/Debit Cards, UPI (Google Pay, PhonePe, Paytm), Net Banking, and Cash on Delivery." },
  { q: "How long does delivery take?", a: "Most orders are delivered within 30-40 minutes. During peak hours, it may take up to 50 minutes." },
  { q: "Can I modify or cancel my order?", a: "Orders can be modified or cancelled within 5 minutes of placing. After that, please contact our support team for assistance." },
  { q: "Do you offer contactless delivery?", a: "Yes, all deliveries are contactless by default. You can specify additional instructions in the order notes." },
  { q: "Is there a minimum order value?", a: "Minimum order value is ₹199 for free delivery. Orders below ₹199 have a small delivery fee of ₹20." },
  { q: "How do I apply a coupon code?", a: "Enter the coupon code on the cart or checkout page and click 'Apply'. The discount will be reflected instantly." },
  { q: "Do you serve in my area?", a: "We currently serve across 350+ cities in India. Enter your pincode on the homepage to check availability." },
];

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", subject: "", type: "Feedback", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handler = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", phone: "", subject: "", type: "Feedback", message: "" });
    }, 3000);
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-50 via-indigo-50/20 to-white overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-400/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-400/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero */}
      <section className="relative bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 text-white overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-yellow-400/20 blur-[120px] rounded-full" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-pink-500/20 blur-[120px] rounded-full" />
        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg px-5 py-2 rounded-full mb-6 border border-white/10 shadow-lg">
              <MessageCircle className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-semibold text-white/90">We'd Love to Hear From You</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight mb-5">
              Get in{" "}
              <span className="bg-gradient-to-r from-yellow-300 via-orange-400 to-pink-400 bg-clip-text text-transparent">Touch</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto">
              Have a question, feedback, or just want to say hi? We're here for you 24/7.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-10">
        {/* Contact Info Cards */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div key={index} whileHover={{ y: -8, scale: 1.02 }}
              className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl p-6 transition-all duration-500 border border-gray-100 overflow-hidden group">
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${info.color}`} />
              <div className={`w-14 h-14 rounded-2xl ${info.bg} flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300`}>
                {info.icon}
              </div>
              <h3 className="text-sm font-semibold text-gray-400 mb-1">{info.label}</h3>
              <p className="text-gray-800 font-bold">{info.value}</p>
              {info.sub && <p className="text-gray-400 text-sm mt-1">{info.sub}</p>}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* Form + FAQ Grid */}
        <div className="grid lg:grid-cols-2 gap-10 mb-20">
          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="bg-white rounded-4xl shadow-xl border border-gray-100 p-8 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
                <FaPaperPlane className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">Send a Message</h2>
                <p className="text-gray-500 text-sm">We'll get back to you within 24 hours</p>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center justify-center py-16">
                  <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <FaCheckCircle className="text-4xl text-green-500" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-gray-800 mb-2">Message Sent! 🎉</h3>
                  <p className="text-gray-500 text-center">Thank you for reaching out. We'll respond shortly.</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 text-sm" />
                    </div>
                    <div className="relative">
                      <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 text-sm" />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div className="relative">
                      <FaPhoneAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 text-sm" />
                    </div>
                    <div className="relative">
                      <FaCommentDots className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject"
                        className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all duration-300 text-sm" />
                    </div>
                  </div>
                  <select name="type" value={formData.type} onChange={handleChange}
                    className="w-full py-3.5 px-4 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm">
                    <option value="Feedback">Feedback</option>
                    <option value="Complaint">Complaint</option>
                    <option value="Inquiry">Inquiry</option>
                    <option value="Partnership">Partnership</option>
                    <option value="Careers">Careers</option>
                    <option value="Other">Other</option>
                  </select>
                  <div className="relative">
                    <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message..." rows="5" required
                      className="w-full pl-4 pr-4 py-3.5 rounded-2xl bg-gray-50 border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none resize-none text-sm" />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3.5 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
                    Send Message <Send className="w-4 h-4" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* FAQ Section */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 shadow-lg">
                <HelpCircle className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-gray-800">Frequently Asked Questions</h2>
                <p className="text-gray-500 text-sm">Quick answers to common questions</p>
              </div>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <button onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left">
                    <span className="font-semibold text-gray-800 text-sm pr-4">{faq.q}</span>
                    <motion.span animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500">
                      <FaArrowRight className="w-3 h-3" />
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                        <div className="px-5 pb-4 text-gray-500 text-sm leading-relaxed border-t border-gray-100 pt-3">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Map & Social Section */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Map */}
            <div className="lg:col-span-3 bg-white rounded-4xl shadow-xl border border-gray-100 overflow-hidden p-2">
              <div className="rounded-3xl overflow-hidden h-80 sm:h-96 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl mb-4">📍</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Find Us Here</h3>
                  <p className="text-gray-500 text-sm">123, FoodExpress Tower, Connaught Place</p>
                  <p className="text-gray-500 text-sm">New Delhi - 110001, India</p>
                  <a href="https://maps.google.com/?q=Connaught+Place+New+Delhi" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-4 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-semibold text-sm hover:bg-indigo-700 transition-all duration-300 shadow-lg">
                    <FaMapMarkerAlt /> Open in Google Maps
                  </a>
                </div>
              </div>
            </div>
            {/* Social & Live Chat */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-4xl shadow-xl border border-gray-100 p-8">
                <h3 className="text-xl font-extrabold text-gray-800 mb-2">Connect With Us</h3>
                <p className="text-gray-500 text-sm mb-6">Follow us on social media for updates & offers</p>
                <div className="grid grid-cols-5 gap-3">
                  {[
                    { icon: <FaFacebookF />, color: "bg-blue-600", hover: "hover:bg-blue-700" },
                    { icon: <FaInstagram />, color: "bg-pink-600", hover: "hover:bg-pink-700" },
                    { icon: <FaTwitter />, color: "bg-sky-500", hover: "hover:bg-sky-600" },
                    { icon: <FaYoutube />, color: "bg-red-600", hover: "hover:bg-red-700" },
                    { icon: <FaLinkedinIn />, color: "bg-blue-700", hover: "hover:bg-blue-800" },
                  ].map((social, i) => (
                    <motion.a key={i} whileHover={{ scale: 1.1, y: -3 }} href="#" className={`w-12 h-12 rounded-2xl ${social.color} ${social.hover} text-white flex items-center justify-center shadow-lg transition-all duration-300`}>
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
              <div className="relative bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-4xl p-8 text-white shadow-xl overflow-hidden">
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-400/20 blur-[80px] rounded-full" />
                <div className="relative">
                  <FaHeadset className="text-4xl mb-4" />
                  <h3 className="text-xl font-extrabold mb-2">24/7 Live Support</h3>
                  <p className="text-white/80 text-sm mb-6">Our team is always ready to help you</p>
                  <button className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold text-sm hover:scale-105 transition-all duration-300 shadow-lg">
                    <MessageCircle className="w-4 h-4" /> Start Live Chat
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Newsletter */}
        <motion.section initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-slate-900 rounded-4xl p-10 md:p-14 text-center shadow-2xl overflow-hidden">
            <div className="absolute -top-40 -left-40 w-80 h-80 bg-indigo-500/20 blur-[100px] rounded-full" />
            <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-purple-500/20 blur-[100px] rounded-full" />
            <div className="relative">
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }} className="text-5xl mb-5">📬</motion.div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Stay in the Loop</h2>
              <p className="text-gray-400 max-w-lg mx-auto mb-8">Subscribe to get exclusive offers, new restaurant alerts, and foodie news delivered to your inbox.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto">
                <input type="email" placeholder="Enter your email"
                  className="flex-1 w-full px-5 py-3.5 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm" />
                <button className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold hover:scale-105 transition-all duration-300 shadow-xl whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
          <FaArrowRight className="-rotate-90" />
        </button>
      )}
    </div>
  );
};

export default Contact;
