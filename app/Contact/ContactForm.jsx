"use client";

import { useState, useEffect } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { motion } from "framer-motion";

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });

    const [state, handleSubmit] = useForm("xanooejr");
    const [showThankYou, setShowThankYou] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (typeof window !== "undefined" && state.succeeded) {
            setFormData({ name: "", email: "", subject: "", message: "" });
            setShowThankYou(true);
        }
    }, [state.succeeded]);

    return (
        <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="bg-white shadow-xl rounded-xl p-8 border border-[#8b6a55] space-y-6"
        >
            <h2 className="text-3xl font-bold text-[#5f4339]">Send a Message</h2>

            {!showThankYou ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#8b6a55]">
                            Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            className="mt-1 block w-full border border-[#8b6a55] rounded-md shadow-sm focus:border-[#5f4339] focus:ring focus:ring-[#8b6a55]"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-[#8b6a55]">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Your email"
                            className="mt-1 block w-full border border-[#8b6a55] rounded-md shadow-sm focus:border-[#5f4339] focus:ring focus:ring-[#8b6a55]"
                            required
                        />
                        <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                    <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-[#8b6a55]">
                      Subject
                   </label>
                   <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="Subject (optional)"
                        className="mt-1 block w-full border border-[#8b6a55] rounded-md shadow-sm focus:border-[#5f4339] focus:ring focus:ring-[#8b6a55]"
                    />
                </div>

                    <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[#8b6a55]">
                            Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Your message..."
                            rows={4}
                            className="mt-1 block w-full border border-[#8b6a55] rounded-md shadow-sm focus:border-[#5f4339] focus:ring focus:ring-[#8b6a55]"
                            required
                        />
                        <ValidationError prefix="Message" field="message" errors={state.errors} />
                    </div>

                    <button
                        type="submit"
                        disabled={state.submitting}
                        className="w-full bg-[#5f4339] text-white font-medium py-2 px-4 rounded-md hover:bg-[#8b6a55] transition-all"
                    >
                        {state.submitting ? "Sending..." : "Send Message"}
                    </button>
                </form>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ duration: 0.5 }} 
                    className="text-center text-[#8b6a55] font-bold mt-4 space-y-4"
                >
                    <p>Thank you for contacting us! We'll get back to you soon. 🚀</p>
                    <img 
                        src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg" 
                        alt="Thank you illustration" 
                        className="mx-auto rounded-lg w-full sm:w-[400px] sm:h-[300px] object-cover"
                    />
                </motion.div>
            )}
        </motion.div>
    );
};

export default ContactForm;
