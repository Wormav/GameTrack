import axios, { AxiosResponse } from "axios";

interface ITranslatedText {
  translatedText: string;
}

async function translateText(text: string, language_from = 'auto', language_to: string) {
  try {
    const translatedText: AxiosResponse = await axios.post('http://127.0.0.1:5000/translate', {
      q: text,
      source: language_from,
      target: language_to,
      format: "text",
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
   
    const data: ITranslatedText = translatedText.data as ITranslatedText
    return (data.translatedText)
  } catch (error) {
    console.error(error)
    return (null);
  }
}

export default translateText
