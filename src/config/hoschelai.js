import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai";

function isIdentityQuestion(prompt) {
  const identityKeywords = [
    // Model-related questions (English)
    'what is your model', 'what model are you', 'which model',
    'what version', 'what ai model', 'ai model', 'model name',
    'what type of ai', 'what kind of ai', 'what sort of ai',
    // Developer-related questions (English)
    'who developed you', 'who created you', 'who made you',
    'who trained you', 'who built you', 'who designed you',
    'your developer', 'your creator', 'your maker',
    // Common misspellings (English)
    'wat model', 'wich model', 'wut model', 'whut model',
    'who devloped', 'who createdd', 'who maid', 'who traind',
    'who bilt', 'who designd', 'ur developer', 'ur creator',
    // Model-related questions (Turkish)
    'hangi model', 'hangi ai', 'yapay zeka modelin',
    'modelin ne', 'versiyonun', 'hangi versiyondasın',
    // Developer-related questions (Turkish)
    'kim geliştirdi', 'kim yaptı', 'kim oluşturdu',
    'kim tasarladı', 'seni kim', 'geliştiricin kim'
  ];
  
  const promptLower = prompt.toLowerCase().replace(/[?.,!]/g, '');
  return identityKeywords.some(keyword => promptLower.includes(keyword));
}

async function runChat(prompt) {
  if (isIdentityQuestion(prompt)) {
    const responses = [
      // Professional and friendly English responses
      "I'm HAI x0, developed by HoschelAI. How can I assist you today?",
      "I was developed by HoschelAI and I'm running on the HAI x0 model. How may I help you?",
      "As HAI x0, created by HoschelAI, I'm here to help. What can I do for you?",
      "I'm the HAI x0 model, proudly developed by HoschelAI. How can I be of service?",
      "HoschelAI developed me as HAI x0. I'm ready to assist you with any task.",
      // Warm and natural Turkish responses
      "Ben HoschelAI'nin geliştirdiği HAI x0 modeliyim. Size nasıl yardımcı olabilirim?",
      "HAI x0 olarak, HoschelAI tarafından geliştirilmiş bir modelim. Size nasıl destek olabilirim?",
      "HoschelAI tarafından geliştirilen HAI x0 modeliyim. Nasıl yardımcı olabilirim?",
      "Ben HAI x0, HoschelAI'nin bir ürünüyüm. Size nasıl yardımcı olabilirim?"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  }

  const apiKey = "AIzaSyAoClEBd2jJn0UKKxuFr-PKQfRyrl_DoZM";
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(prompt);
  return result.response.text();
}
  
export default runChat;