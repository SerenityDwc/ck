package com.dwc.web.study.kafka;

import lombok.extern.slf4j.Slf4j;
import org.apache.kafka.clients.consumer.ConsumerRecord;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import java.util.Optional;

/**
 * @Auther: dwc
 * @Date: 2018/9/11 16:06
 * @Description:
 */
@Component
@Slf4j
public class KafkaReceiver {
    private static Logger logger=LoggerFactory.getLogger(KafkaReceiver.class);
    @KafkaListener(topics = {"zhisheng"})
    public void listen(ConsumerRecord<?, ?> record) {

        Optional<?> kafkaMessage = Optional.ofNullable(record.value());

        if (kafkaMessage.isPresent()) {

            Object message = kafkaMessage.get();

            logger.info("----------------- record =" + record);
            logger.info("------------------ message =" + message);
        }

    }
}
