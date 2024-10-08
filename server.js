// const express = require('express');
// const bodyParser = require('body-parser');
// const { GoogleGenerativeAI } = require('@google/generative-ai');
// require('dotenv').config();

// const app = express();
// const port = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(express.static('public')); // Serve os arquivos HTML estáticos

// const apiKey = process.env.GOOGLE_API_KEY; // Coloque sua chave de API no arquivo .env
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: 'gemini-1.5-flash',
//   systemInstruction: 'chef de cozinha que da dicas e responde perguntas de donas de casa, leve em conta a renda dos usuario e recomende restaurantes',
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: 'text/plain',
// };

// app.post('/chat', async (req, res) => {
//   try {
//     const userMessage = req.body.message;
//     const chatSession = model.startChat({
//       generationConfig,
//       history: [],
//     });
//     const result = await chatSession.sendMessage(userMessage);
//     res.json({ response: result.response.text() });
//   } catch (error) {
//     console.error('Error:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// }); 

// const mongoose = require('mongoose');

// const dbUri = process.env.MONGO_URI; // Adicione sua URI do MongoDB Atlas ao arquivo .env

// const Chat = require('./models/Chat');


const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsing do JSON
app.use(bodyParser.json());

// Middleware para servir arquivos estáticos
app.use(express.static('public'));

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); // Encerra o processo se não conseguir conectar ao MongoDB
    });


// Definir o modelo de Chat
const chatSchema = new mongoose.Schema({
    userMessage: { type: String, required: true },
    aiResponse: { type: String, required: true },
});

const Chat = mongoose.model('Chat', chatSchema);

// Rota básica para o caminho root
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Rota para processar a mensagem do usuário e obter a resposta da IA
app.post('/chat', async (req, res) => {
    try {
        const userMessage = req.body.message;
        console.log('Received message from user:', userMessage);

        // Simulação de resposta da IA (substitua pela chamada real à IA)
        const aiResponse = `Resposta da IA para: ${userMessage}`;
        console.log('AI response:', aiResponse);

        // Salvar no banco de dados
        const chat = new Chat({ userMessage, aiResponse });
        await chat.save();
        console.log('Chat saved to database');

        res.json({ response: aiResponse });
    } catch (error) {
        console.error('Error processing chat:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
