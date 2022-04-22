import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-002", {
    prompt: generatePrompt(req.body.recipients, req.body.senders, req.body.questions,req.body.tags),
    temperature: 0.6,
    max_tokens:250
  });
  res.status(200).json({ result: completion.data.choices[0].text.replace(/^(\n)+/,"") });
}

function generatePrompt(recipients, senders, questions, tags) {
  return `Write a ${tags} email.

  Recipients: ${recipients}
  Senders: ${senders}
  Questions to ask: ${questions}
  Body:`;
}