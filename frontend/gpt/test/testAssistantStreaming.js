import OpenAI from 'openai';
import { API_KEY } from '../api';

const openai = new OpenAI({
  apiKey: API_KEY
});

const assistantId = 'asst_afppI9S4O6Jbwz513XYAyEmH';

async function testAssistantStreaming() {
  try {
    // Create a thread
    const thread = await openai.beta.threads.create();
    console.log('Thread created:', thread.id);

    // Add a message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: 'Hello, can you help me with a math problem?'
    });
    console.log('Message added to thread');

    // Create and stream a run
    const run = await openai.beta.threads.runs.createAndStream(
      thread.id,
      { assistant_id: assistantId }
    );

    run
      .on('created', (event) => console.log('Run created:', event.id))
      .on('textCreated', (text) => console.log('\nAssistant: '))
      .on('textDelta', (delta, snapshot) => process.stdout.write(delta.value))
      .on('toolCallCreated', (toolCall) => console.log(`\nTool Call Created: ${toolCall.type}`))
      .on('toolCallDelta', (delta, snapshot) => {
        if (delta.type === 'code_interpreter') {
          if (delta.code_interpreter.input) {
            console.log('\nCode Input:', delta.code_interpreter.input);
          }
          if (delta.code_interpreter.outputs) {
            console.log('\nCode Output:');
            delta.code_interpreter.outputs.forEach(output => {
              if (output.type === 'logs') {
                console.log(output.logs);
              }
            });
          }
        }
      })
      .on('completed', (event) => console.log('\nRun completed'))
      .on('error', (error) => console.error('Error:', error))
      .on('end', () => console.log('Stream ended'));

    // Wait for the stream to end
    await run.finalizer;

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

testAssistantStreaming();