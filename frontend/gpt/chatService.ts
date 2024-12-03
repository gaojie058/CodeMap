import OpenAI from 'openai';
import { API_KEY } from './api';
import { assistantId } from './api'

const openai = new OpenAI({
  apiKey: API_KEY,
  dangerouslyAllowBrowser: true // For development/testing purposes only
});

// const assistantId = "asst_1rm5Iq7odQeJcMwC8sCbAzx3";//task1

// const assistantId= "asst_eZnQNP4eRvWUY3QPk1dlB2eK"//task2

class ChatService {
  private threadId: string | null = null;

  async initializeThread() {
    const thread = await openai.beta.threads.create();
    this.threadId = thread.id;
    return this.threadId;
  }

  async sendMessage(message: string, onUpdate: (content: string) => void) {
    if (!this.threadId) {
      throw new Error('Thread not initialized');
    }

    await openai.beta.threads.messages.create(this.threadId, {
      role: 'user',
      content: message
    });

    const run = await openai.beta.threads.runs.createAndStream(
      this.threadId,
      { assistant_id: assistantId }
    );

    let assistantResponse = '';

    return new Promise<string>((resolve, reject) => {
      run
        .on('textCreated', () => {
          onUpdate('');
        })
        .on('textDelta', (delta) => {
          assistantResponse += delta.value;
          onUpdate(assistantResponse);
        })
        .on('completed', () => {
          resolve(assistantResponse);
        })
        .on('error', (error) => {
          console.error('Error:', error);
          reject(error);
        })
        .on('end', () => {
          // Ensure the Promise is resolved at the end of the stream
          resolve(assistantResponse);
        });
    });
  }
}

export default new ChatService();