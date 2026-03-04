const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let messages = [
  {
    id: 1,
    name: '游客',
    email: 'test@example.com',
    content: '欢迎来到留言板！这是第一条留言。',
    created_at: new Date().toISOString()
  }
];

app.get('/api/messages', (req, res) => {
  res.json(messages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
});

app.post('/api/messages', (req, res) => {
  const { name, email, content } = req.body;
  if (!name || !content) {
    res.status(400).json({ error: '姓名和内容不能为空' });
    return;
  }
  
  const newMessage = {
    id: messages.length + 1,
    name,
    email: email || '',
    content,
    created_at: new Date().toISOString()
  };
  
  messages.push(newMessage);
  res.status(201).json({ id: newMessage.id });
});

app.listen(PORT, () => {
  console.log(`留言板后端服务已启动：http://localhost:${PORT}`);
});

module.exports = app;
