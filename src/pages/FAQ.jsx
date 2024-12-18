import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import '../styles/FAQ.css';

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState(null);

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: t('faq.appointment.question'),
      answer: t('faq.appointment.answer')
    },
    {
      question: t('faq.bring.question'),
      answer: t('faq.bring.answer')
    },
    {
      question: t('faq.cost.question'),
      answer: t('faq.cost.answer')
    },
    {
      question: t('faq.payment.question'),
      answer: t('faq.payment.answer')
    }
  ];

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <h2 className="section-title">{t('faq.title')}</h2>
        <p className="section-description">{t('faq.subtitle')}</p>
        
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
            >
              <div 
                className="faq-question"
                onClick={() => toggleQuestion(index)}
              >
                <h3>{item.question}</h3>
                <span className="faq-arrow">▼</span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 