import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import clsx from "clsx";
import { sendEmails } from "@/services/emails"; 


interface FormData {
  name: string;
  email: string;
  message: string;
}

type FormStatus = "idle" | "loading" | "success" | "error";

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
  subText?: string;
}


const STYLES = {
  pageWrapper: "min-h-screen flex flex-col items-center py-12 px-4 transition-colors duration-300 bg-gray-50 dark:bg-[#030305]",
  textTitle: "text-gray-900 dark:text-white font-montserrat",
  textDesc: "text-gray-600 dark:text-gray-400 font-montserrat",
  cardBg: "bg-white dark:bg-[#0B0C10] border border-gray-200 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-black/50",
  accentText: "text-teal-600 dark:text-[#D3122E]",
  iconBg: "bg-teal-50 text-teal-600 dark:bg-[#1F2026] dark:text-[#D3122E]",
  
  button: (isLoading: boolean) => clsx(
    "w-full font-bold py-4 rounded-lg transition-all transform shadow-lg uppercase tracking-wide",
    isLoading 
      ? "bg-gray-400 cursor-not-allowed opacity-70" 
      : "bg-teal-600 hover:bg-teal-700 dark:bg-[#D3122E] dark:hover:bg-[#b00e25] text-white shadow-teal-500/30 dark:shadow-red-900/20 active:scale-95"
  ),

  input: "bg-white dark:bg-[#15161C] border border-gray-300 dark:border-white/10 focus:border-teal-500 dark:focus:border-red-600 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 w-full rounded-lg p-4 outline-none transition-all",
  label: "block text-xs font-bold mb-2 uppercase tracking-wider text-gray-500 dark:text-gray-500"
};

const ContactPage = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: ""
  });

  const [status, setStatus] = useState<FormStatus>("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await sendEmails(formData);
      
      setStatus("success");
      setFormData({ name: "", email: "", message: "" }); 
      
      setTimeout(() => setStatus("idle"), 3000);
      
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <div className={STYLES.pageWrapper}>
      
      {/* Заголовок */}
      <div className="text-center mb-16 mt-8">
        <h1 className={clsx("text-4xl md:text-5xl font-bold tracking-wider mb-4 font-bebasNeue", STYLES.textTitle)}>
          ЗВ'ЯЖІТЬСЯ З <span className={STYLES.accentText}>НАМИ</span>
        </h1>
        <p className={STYLES.textDesc}>
          Маєте запитання? Ми з радістю вам допоможемо.
        </p>
      </div>

      {/* Основний контейнер */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* ЛІВА ЧАСТИНА - Картки з контактами */}
        <div className="space-y-5">
          <ContactCard 
             icon={<FaMapMarkerAlt />}
             title="Завітайте до нас"
             text="123 Cinema Boulevard, Hollywood, CA"
          />

          <ContactCard 
             icon={<FaPhoneAlt />}
             title="Зателефонуйте нам"
             text="+1 (555) 123-4567"
             subText="Відчинено щодня 10:00 - 23:00"
          />

          <ContactCard 
             icon={<FaEnvelope />}
             title="Напишіть нам"
             text="support@cineverse.com"
             subText="info@cineverse.com"
          />
        </div>

        {/* ПРАВА ЧАСТИНА - Форма */}
        <form onSubmit={handleSubmit} className={clsx("p-8 rounded-xl flex flex-col gap-6 h-full transition-colors", STYLES.cardBg)}>
          
          <div>
            <label className={STYLES.label}>Ім'я</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={STYLES.input}
              placeholder="Введіть ваше ім'я"
              required
              disabled={status === "loading"}
            />
          </div>

          <div>
            <label className={STYLES.label}>Електронна пошта</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={STYLES.input}
              placeholder="email@example.com"
              required
              disabled={status === "loading"}
            />
          </div>

          <div>
            <label className={STYLES.label}>Повідомлення</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={clsx(STYLES.input, "resize-none")}
              placeholder="Ваше повідомлення..."
              required
              disabled={status === "loading"}
            ></textarea>
          </div>

          {/* Повідомлення про помилку */}
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">Сталася помилка. Спробуйте ще раз.</p>
          )}

          {/* Повідомлення про успіх */}
          {status === "success" && (
            <p className="text-green-500 text-sm text-center">Повідомлення успішно надіслано!</p>
          )}

          <div className="mt-auto pt-2">
            <button 
                type="submit" 
                disabled={status === "loading" || status === "success"}
                className={STYLES.button(status === "loading")}
            >
                {status === "loading" ? "Надсилання..." : status === "success" ? "Надіслано!" : "Надіслати повідомлення"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};


const ContactCard: React.FC<ContactCardProps> = ({ icon, title, text, subText }) => (
    <div className={clsx("p-6 rounded-xl flex items-center gap-6 transition-colors", STYLES.cardBg)}>
        <div className={clsx("w-14 h-14 rounded-full flex items-center justify-center text-xl shrink-0 border border-transparent dark:border-white/5", 
             STYLES.iconBg
        )}>
            {icon}
        </div>
        <div>
            <h3 className={clsx("font-bold text-lg font-bebasNeue tracking-wide mb-1", STYLES.textTitle)}>{title}</h3>
            <p className={clsx("text-sm", STYLES.textDesc)}>{text}</p>
            {subText && <p className={clsx("text-xs mt-1 opacity-80", STYLES.textDesc)}>{subText}</p>}
        </div>
    </div>
);

export default ContactPage;