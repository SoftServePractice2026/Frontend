import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import clsx from 'clsx';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
    alert(`Дякую, ${formData.name}! Повідомлення відправлено.`);
    setFormData({ name: '', email: '', message: '' });
  };

  // --- НАЛАШТУВАННЯ СТИЛІВ (Розділені кольори) ---
  
  // Фон сторінки
  const pageWrapperClass = "min-h-screen flex flex-col items-center py-12 px-4 transition-colors duration-300 bg-gray-50 dark:bg-[#030305]";
  
  // Тексти
  const textTitleClass = "text-gray-900 dark:text-white font-montserrat";
  const textDescClass = "text-gray-600 dark:text-gray-400 font-montserrat";
  
  // Картки
  const cardBgClass = "bg-white dark:bg-[#0B0C10] border border-gray-200 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-black/50";
  
  // --- АКЦЕНТНІ КОЛЬОРИ (Різні для тем) ---
  
  // Акцентний текст (Light: Teal, Dark: Red)
  const accentTextClass = "text-teal-600 dark:text-[#D3122E]";
  
  // Фон іконки (Light: Teal прозорий, Dark: Темна підкладка + Червоний)
  const iconBgClass = "bg-teal-50 text-teal-600 dark:bg-[#1F2026] dark:text-[#D3122E]";

  // Кнопка (Light: Teal, Dark: Red)
  const accentButtonBgClass = "bg-teal-600 hover:bg-teal-700 dark:bg-[#D3122E] dark:hover:bg-[#b00e25] text-white shadow-teal-500/30 dark:shadow-red-900/20";

  // Бордер інпута при фокусі (Light: Teal, Dark: Red)
  const inputFocusClass = "focus:border-teal-500 dark:focus:border-red-600";


  // --- ІНПУТИ ---
  const inputBgClass = clsx(
      "bg-white dark:bg-[#15161C]", // Фон: Білий vs Темний
      "border border-gray-300 dark:border-white/10", // Рамка
      inputFocusClass, // Колір фокусу (Teal vs Red)
      "text-gray-900 dark:text-gray-200", // Колір тексту
      "placeholder-gray-400 dark:placeholder-gray-500" // Колір плейсхолдера
  );
  
  const labelClass = "block text-xs font-bold mb-2 uppercase tracking-wider text-gray-500 dark:text-gray-500";

  return (
    <div className={pageWrapperClass}>
      
      {/* Заголовок */}
      <div className="text-center mb-16 mt-8">
        <h1 className={clsx("text-4xl md:text-5xl font-bold tracking-wider mb-4 font-bebasNeue", textTitleClass)}>
          ЗВ'ЯЖІТЬСЯ З <span className={accentTextClass}>НАМИ</span>
        </h1>
        <p className={textDescClass}>
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
             cardClass={cardBgClass}
             textTitleClass={textTitleClass}
             textDescClass={textDescClass}
             iconBgClass={iconBgClass}
          />

          <ContactCard 
             icon={<FaPhoneAlt />}
             title="Зателефонуйте нам"
             text="+1 (555) 123-4567"
             subText="Відчинено щодня 10:00 - 23:00"
             cardClass={cardBgClass}
             textTitleClass={textTitleClass}
             textDescClass={textDescClass}
             iconBgClass={iconBgClass}
          />

          <ContactCard 
             icon={<FaEnvelope />}
             title="Напишіть нам"
             text="support@cineverse.com"
             subText="info@cineverse.com"
             cardClass={cardBgClass}
             textTitleClass={textTitleClass}
             textDescClass={textDescClass}
             iconBgClass={iconBgClass}
          />

        </div>

        {/* ПРАВА ЧАСТИНА - Форма */}
        <form onSubmit={handleSubmit} className={clsx("p-8 rounded-xl flex flex-col gap-6 h-full transition-colors", cardBgClass)}>
          
          <div>
            <label className={labelClass}>Ім'я</label>
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={clsx("w-full rounded-lg p-4 outline-none transition-all", inputBgClass)}
              placeholder="Введіть ваше ім'я"
            />
          </div>

          <div>
            <label className={labelClass}>Електронна пошта</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={clsx("w-full rounded-lg p-4 outline-none transition-all", inputBgClass)}
              placeholder="email@example.com"
            />
          </div>

          <div>
            <label className={labelClass}>Повідомлення</label>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className={clsx("w-full rounded-lg p-4 outline-none transition-all resize-none", inputBgClass)}
              placeholder="Ваше повідомлення..."
            ></textarea>
          </div>

          <div className="mt-auto pt-2">
            <button 
                type="submit" 
                className={clsx(
                    "w-full font-bold py-4 rounded-lg transition-all transform active:scale-95 shadow-lg uppercase tracking-wide",
                    accentButtonBgClass
                )}
            >
                Надіслати повідомлення
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

// Компонент картки
const ContactCard = ({ icon, title, text, subText, cardClass, textTitleClass, textDescClass, iconBgClass }: any) => (
    <div className={clsx("p-6 rounded-xl flex items-center gap-6 transition-colors", cardClass)}>
        <div className={clsx("w-14 h-14 rounded-full flex items-center justify-center text-xl shrink-0 border border-transparent dark:border-white/5", 
             iconBgClass
        )}>
            {icon}
        </div>
        <div>
            <h3 className={clsx("font-bold text-lg font-bebasNeue tracking-wide mb-1", textTitleClass)}>{title}</h3>
            <p className={clsx("text-sm", textDescClass)}>{text}</p>
            {subText && <p className={clsx("text-xs mt-1 opacity-80", textDescClass)}>{subText}</p>}
        </div>
    </div>
);

export default ContactPage;