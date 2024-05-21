const express = require('express');
require('dotenv').config();
const OpenAI = require('openai');

const app = express();

app.use(express.json());

const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.post('/chat-it-up', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant designed to output JSON.',
        },
        { role: 'user', content: 'Who won the world series in 2020?' },
      ],
      model: 'gpt-3.5-turbo-0125',
      response_format: { type: 'json_object' },
    });
    return res.status(200).json({
      success: true,
      data: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      error: error.response ? error.response.data : error,
    });
  }
});

const port = process.env.PORT || 5010;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
