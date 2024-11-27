package plankton.backend.service;

import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import plankton.backend.client.OpenAiClient;

@Service
@Slf4j
public class GptService {

    private OpenAiClient openAiClient;

    @Autowired
    public GptService(OpenAiClient openAiClient) {
        this.openAiClient = openAiClient;
    }

    public String getAssistantId(String model, String name) {
        JsonObject assistant = JsonParser.parseString(openAiClient.createAssistant(model, name)).getAsJsonObject();
        log.info("assistant: {}", assistant);
        return assistant.get("id").getAsString();
    }

    public JsonArray listAssistants(){
        JsonObject assistant = JsonParser.parseString(openAiClient.listAssistant()).getAsJsonObject();
        return assistant.get("data").getAsJsonArray();
    }

    public String createThreadAndGetId(){
        JsonObject thread = JsonParser.parseString(openAiClient.createThread()).getAsJsonObject();
        log.info("thread: {}", thread);
        return thread.get("id").getAsString();
    }

    public String createMessageAndGetId(String threadId, String content){
        JsonObject message = JsonParser.parseString(openAiClient.createMessage(threadId, content)).getAsJsonObject();
        log.info("message: {}", message);
        return message.get("id").getAsString();
    }

    public String createRun(String threadId, String assistantId){
        JsonObject run = JsonParser.parseString(openAiClient.createRun(threadId, assistantId)).getAsJsonObject();
        return run.get("id").getAsString();
    }

    public String getResponse(String threadId, String runId) throws InterruptedException {
        JsonObject object = null;
        String status = JsonParser.parseString(openAiClient.checkRun(threadId, runId)).getAsJsonObject().get("status").getAsString();
        while(!status.equals("completed")) {
            Thread.sleep(1000);
            object = JsonParser.parseString(openAiClient.checkRun(threadId, runId)).getAsJsonObject();
            status = object.get("status").getAsString();
        }

        JsonObject jsonObject = JsonParser.parseString(openAiClient.listMessages(threadId)).getAsJsonObject();
        log.info("jsonObject: {}", jsonObject);
        JsonArray data = jsonObject.getAsJsonArray("data");

        String result = data.get(0).getAsJsonObject()
                .get("content").getAsJsonArray()
                .get(0).getAsJsonObject()
                .get("text").getAsJsonObject()
                .get("value").getAsString();

        if(result == null){
            log.error("에러 발생");
            return null; // Return null if the messageId is not found or doesn't have text content
        }
        return result;
    }

    public boolean checkAssistant(String name){
        JsonObject object = JsonParser.parseString(openAiClient.listAssistant()).getAsJsonObject();
        JsonArray data = object.getAsJsonArray("data");

        for(JsonElement element : data){
            String objectName = element.getAsJsonObject().get("name").getAsString();
            if(name.equals(objectName)){
                return true;
            }
        }
        return false;
    }
}
