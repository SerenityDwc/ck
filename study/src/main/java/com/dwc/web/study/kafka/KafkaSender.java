package com.dwc.web.study.kafka;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.UUID;

/**
 * @Auther: dwc
 * @Date: 2018/9/11 16:03
 * @Description:
 */
@Component
@Slf4j
public class KafkaSender {
    private static Logger logger= LoggerFactory.getLogger(KafkaSender.class);
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    private Gson gson = new GsonBuilder().create();

    //发送消息方法
    public void send() {
        Message message = new Message();
        message.setId(System.currentTimeMillis());
        message.setMsg(UUID.randomUUID().toString());
        message.setSendTime(new Date());
        logger.info("+++++++++++++++++++++  message = {}", gson.toJson(message));
        kafkaTemplate.send("zhisheng", gson.toJson(message));
    }
}
