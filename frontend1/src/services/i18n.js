// export const LANGS = [
//   { code: "en", label: "English" },
//   { code: "hi", label: "हिन्दी" },
//   { code: "mr", label: "मराठी" }
// ];

// const dict = {
//   en: {
//     title: "Hyperlocal Government Scheme Navigator",
//     subtitle: "Find schemes you qualify for — faster, simpler, in your language.",
//     profile: "Your Profile",
//     chat: "Chat Assistant",
//     language: "Language",
//     income: "Annual Income (₹)",
//     age: "Age",
//     state: "State",
//     district: "District",
//     occupation: "Occupation",
//     category: "Category",
//     ask: "Ask about schemes, eligibility, documents, and how to apply…",
//     send: "Send",
//     clear: "Clear",
//     voiceIn: "Voice Input",
//     voiceOut: "Voice Output",
//     start: "Start",
//     stop: "Stop",
//     speak: "Speak",
//     matchedSchemes: "Suggested Schemes",
//     none: "No schemes to show yet."
//   },
//   hi: {
//     title: "सरकारी योजना नेविगेटर",
//     subtitle: "आपके लिए योग्य योजनाएँ — आसान भाषा में, जल्दी।",
//     profile: "आपकी प्रोफ़ाइल",
//     chat: "चैट सहायक",
//     language: "भाषा",
//     income: "वार्षिक आय (₹)",
//     age: "उम्र",
//     state: "राज्य",
//     district: "ज़िला",
//     occupation: "पेशा",
//     category: "श्रेणी",
//     ask: "योजना, पात्रता, दस्तावेज़ और आवेदन प्रक्रिया पूछें…",
//     send: "भेजें",
//     clear: "हटाएँ",
//     voiceIn: "वॉइस इनपुट",
//     voiceOut: "वॉइस आउटपुट",
//     start: "शुरू",
//     stop: "रोकें",
//     speak: "बोलें",
//     matchedSchemes: "सुझाई गई योजनाएँ",
//     none: "अभी कोई योजना नहीं।"
//   },
//   mr: {
//     title: "शासकीय योजना नेव्हिगेटर",
//     subtitle: "तुम्हाला पात्र असलेल्या योजना — सोप्या भाषेत, पटकन.",
//     profile: "तुमची प्रोफाईल",
//     chat: "चॅट सहाय्यक",
//     language: "भाषा",
//     income: "वार्षिक उत्पन्न (₹)",
//     age: "वय",
//     state: "राज्य",
//     district: "जिल्हा",
//     occupation: "व्यवसाय",
//     category: "वर्ग",
//     ask: "योजना, पात्रता, कागदपत्रे, अर्ज प्रक्रिया विचारा…",
//     send: "पाठवा",
//     clear: "क्लिअर",
//     voiceIn: "व्हॉइस इनपुट",
//     voiceOut: "व्हॉइस आउटपुट",
//     start: "सुरू",
//     stop: "थांबा",
//     speak: "बोला",
//     matchedSchemes: "सुचवलेल्या योजना",
//     none: "सध्या योजना नाहीत."
//   }
// };

// export function t(lang, key) {
//   return dict[lang]?.[key] ?? dict.en[key] ?? key;
// }





export const LANGS = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" }
];

const translations = {
  en: {
    title: "Sarkari Saathi",
    subtitle: "Your Government Scheme Navigator",
    language: "Language",
    
    // Profile Form
    profileTitle: "Your Profile",
    age: "Age",
    income: "Annual Income (₹)",
    state: "State",
    district: "District",
    occupation: "Occupation",
    category: "Category",
    saveProfile: "Save Profile",
    resetProfile: "Reset",
    
    // Occupations
    farmer: "Farmer",
    student: "Student",
    business: "Business Owner",
    employee: "Employee",
    unemployed: "Unemployed",
    
    // Categories
    general: "General",
    obc: "OBC",
    sc: "SC",
    st: "ST",
    
    // Chat
    chatTitle: "Chat Assistant",
    typeMessage: "Type your message...",
    send: "Send",
    listening: "Listening...",
    
    // Schemes
    matchedSchemes: "Matched Schemes",
    noSchemes: "No schemes matched yet. Tell me about yourself!",
    benefits: "Benefits",
    eligibility: "Eligibility",
    howToApply: "How to Apply",
    
    // Messages
    welcomeMessage: "Hello! I'm Sarkari Saathi. I'll help you discover government schemes you're eligible for. Tell me about yourself or ask about any scheme!",
    profileSaved: "Profile saved successfully!",
    error: "Something went wrong. Please try again."
  },
  
  hi: {
    title: "सरकारी साथी",
    subtitle: "आपका सरकारी योजना सहायक",
    language: "भाषा",
    
    // Profile Form
    profileTitle: "आपकी प्रोफाइल",
    age: "उम्र",
    income: "वार्षिक आय (₹)",
    state: "राज्य",
    district: "जिला",
    occupation: "पेशा",
    category: "श्रेणी",
    saveProfile: "प्रोफाइल सहेजें",
    resetProfile: "रीसेट करें",
    
    // Occupations
    farmer: "किसान",
    student: "छात्र",
    business: "व्यवसायी",
    employee: "कर्मचारी",
    unemployed: "बेरोजगार",
    
    // Categories
    general: "सामान्य",
    obc: "अन्य पिछड़ा वर्ग",
    sc: "अनुसूचित जाति",
    st: "अनुसूचित जनजाति",
    
    // Chat
    chatTitle: "चैट सहायक",
    typeMessage: "अपना संदेश लिखें...",
    send: "भेजें",
    listening: "सुन रहा हूँ...",
    
    // Schemes
    matchedSchemes: "मिलान योजनाएं",
    noSchemes: "अभी तक कोई योजना नहीं मिली। मुझे अपने बारे में बताएं!",
    benefits: "लाभ",
    eligibility: "पात्रता",
    howToApply: "आवेदन कैसे करें",
    
    // Messages
    welcomeMessage: "नमस्ते! मैं सरकारी साथी हूँ। मैं आपको सरकारी योजनाओं के बारे में जानकारी देने में मदद करूँगा। मुझे अपने बारे में बताएं या किसी योजना के बारे में पूछें!",
    profileSaved: "प्रोफाइल सफलतापूर्वक सहेजी गई!",
    error: "कुछ गलत हो गया। कृपया पुनः प्रयास करें।"
  }
};

export function t(lang, key) {
  return translations[lang]?.[key] || translations.en[key] || key;
}