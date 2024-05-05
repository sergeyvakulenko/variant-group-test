import { OpenAI } from "openai";
import { useState } from "react";

const COVER_LETTER_PROMPT = `I want you to act as a professional career consultant with many years of experience. 

I will send you my cover letter and you will rewrite it for me. 

Rules:

1. You should respond only with rewritten text. Do not add anything else in your response! 
2. Do not invent anything! Stick to the information provided and do not add to it.
3. Keep the same amount of paragraphs. Keep line breaks as "\n\n".
4. Keep roughly the same character count. The resulting letter can be a little bit shorter or a little bit longer, but "a little" for me is "50 characters".
5. Some information in my letters needs to stay unchanged. I will mark it with square brackets. For example, if my letter contains a sentence "I am interested in [Product Manager] position", it means that you can rephrase this sentence, but words "Product Manager" should stay unchanged (even capitalization!).  NEVER CHANGE WORDS BETWEEN SQUARE BRACKETS, DON'T EVEN REPHRASE WITH THE SAME MEANING. So you could rephrase my sentence to something like this: "Your Product Manager position is very interesting to me". Yes, that means that you can omit square brackets from your response.
6. Do not mention "years of experience" unless I myself mention it in my letter.
7. Do not add any footer like "Sincerely, You Name". Stick to the content of the letter I sent you.

`;

const OPEN_AI = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const CONFIG = {
  model: "gpt-3.5-turbo-instruct",
  max_tokens: 3000,
  // I experimented a bit and arrived to a conclusion
  // that it's best suited for our goals.
  temperature: 0.2,
};

export type TUseChatGpt = ReturnType<typeof useChatGpt>;

const useChatGpt = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<string>("");

  const rewriteLetter = async (letter: string): Promise<void> => {
    setLoading(true);
    try {
      const result = await OPEN_AI.completions.create({
        ...CONFIG,
        prompt: COVER_LETTER_PROMPT.concat(letter),
      });

      if (result && result.choices && result.choices.length > 0) {
        setResponse(result.choices[0].text.trim());
      }
    } catch (error) {
      console.error("Error fetching response from ChatGPT:", error);
      // Fallback option.
      setResponse(letter);
    }
    setLoading(false);
  };

  return {
    loading,
    response,
    rewriteLetter,
  };
};

export { useChatGpt };
