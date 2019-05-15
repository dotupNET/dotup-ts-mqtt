var typedoc = typedoc || {};
            typedoc.search = typedoc.search || {};
            typedoc.search.data = {"kinds":{"2":"Module","4":"Enumeration","16":"Enumeration member","32":"Variable","64":"Function","128":"Class","256":"Interface","512":"Constructor","1024":"Property","2048":"Method","65536":"Type literal","4194304":"Type alias"},"rows":[{"id":0,"kind":4,"name":"QosType","url":"enums/qostype.html","classes":"tsd-kind-enum"},{"id":1,"kind":16,"name":"AtMostOnce","url":"enums/qostype.html#atmostonce","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"QosType"},{"id":2,"kind":16,"name":"AtLeastOnce","url":"enums/qostype.html#atleastonce","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"QosType"},{"id":3,"kind":16,"name":"ExactlyOnce","url":"enums/qostype.html#exactlyonce","classes":"tsd-kind-enum-member tsd-parent-kind-enum","parent":"QosType"},{"id":4,"kind":256,"name":"IMessage","url":"interfaces/imessage.html","classes":"tsd-kind-interface"},{"id":5,"kind":1024,"name":"messageId","url":"interfaces/imessage.html#messageid","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IMessage"},{"id":6,"kind":1024,"name":"timestamp","url":"interfaces/imessage.html#timestamp","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IMessage"},{"id":7,"kind":4194304,"name":"MessageCallback","url":"globals.html#messagecallback","classes":"tsd-kind-type-alias"},{"id":8,"kind":65536,"name":"__type","url":"globals.html#messagecallback.__type","classes":"tsd-kind-type-literal tsd-parent-kind-type-alias tsd-is-not-exported","parent":"MessageCallback"},{"id":9,"kind":256,"name":"IMqttMessage","url":"interfaces/imqttmessage.html","classes":"tsd-kind-interface tsd-has-type-parameter"},{"id":10,"kind":1024,"name":"QoS","url":"interfaces/imqttmessage.html#qos","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IMqttMessage"},{"id":11,"kind":1024,"name":"retain","url":"interfaces/imqttmessage.html#retain","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IMqttMessage"},{"id":12,"kind":1024,"name":"topic","url":"interfaces/imqttmessage.html#topic","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IMqttMessage"},{"id":13,"kind":1024,"name":"message","url":"interfaces/imqttmessage.html#message","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IMqttMessage"},{"id":14,"kind":256,"name":"IMqttConnection","url":"interfaces/imqttconnection.html","classes":"tsd-kind-interface"},{"id":15,"kind":1024,"name":"clientId","url":"interfaces/imqttconnection.html#clientid","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IMqttConnection"},{"id":16,"kind":1024,"name":"subscriber","url":"interfaces/imqttconnection.html#subscriber","classes":"tsd-kind-property tsd-parent-kind-interface","parent":"IMqttConnection"},{"id":17,"kind":2048,"name":"isConnected","url":"interfaces/imqttconnection.html#isconnected","classes":"tsd-kind-method tsd-parent-kind-interface","parent":"IMqttConnection"},{"id":18,"kind":2048,"name":"connect","url":"interfaces/imqttconnection.html#connect","classes":"tsd-kind-method tsd-parent-kind-interface","parent":"IMqttConnection"},{"id":19,"kind":2048,"name":"publish","url":"interfaces/imqttconnection.html#publish","classes":"tsd-kind-method tsd-parent-kind-interface tsd-has-type-parameter","parent":"IMqttConnection"},{"id":20,"kind":2048,"name":"subscribe","url":"interfaces/imqttconnection.html#subscribe","classes":"tsd-kind-method tsd-parent-kind-interface","parent":"IMqttConnection"},{"id":21,"kind":2048,"name":"dispose","url":"interfaces/imqttconnection.html#dispose","classes":"tsd-kind-method tsd-parent-kind-interface tsd-is-inherited","parent":"IMqttConnection"},{"id":22,"kind":256,"name":"IPublisher","url":"interfaces/ipublisher.html","classes":"tsd-kind-interface"},{"id":23,"kind":2048,"name":"isConnected","url":"interfaces/ipublisher.html#isconnected","classes":"tsd-kind-method tsd-parent-kind-interface","parent":"IPublisher"},{"id":24,"kind":2048,"name":"publish","url":"interfaces/ipublisher.html#publish","classes":"tsd-kind-method tsd-parent-kind-interface tsd-has-type-parameter","parent":"IPublisher"},{"id":25,"kind":128,"name":"Message","url":"classes/message.html","classes":"tsd-kind-class tsd-has-type-parameter"},{"id":26,"kind":1024,"name":"messageId","url":"classes/message.html#messageid","classes":"tsd-kind-property tsd-parent-kind-class","parent":"Message"},{"id":27,"kind":1024,"name":"timestamp","url":"classes/message.html#timestamp","classes":"tsd-kind-property tsd-parent-kind-class","parent":"Message"},{"id":28,"kind":512,"name":"constructor","url":"classes/message.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class","parent":"Message"},{"id":29,"kind":2,"name":"MqttTopicMatch","url":"modules/mqtttopicmatch.html","classes":"tsd-kind-module"},{"id":30,"kind":64,"name":"matches","url":"modules/mqtttopicmatch.html#matches","classes":"tsd-kind-function tsd-parent-kind-module","parent":"MqttTopicMatch"},{"id":31,"kind":128,"name":"MqttConnectionOptions","url":"classes/mqttconnectionoptions.html","classes":"tsd-kind-class"},{"id":32,"kind":1024,"name":"hostname","url":"classes/mqttconnectionoptions.html#hostname","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":33,"kind":1024,"name":"clientId","url":"classes/mqttconnectionoptions.html#clientid","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":34,"kind":1024,"name":"port","url":"classes/mqttconnectionoptions.html#port","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":35,"kind":1024,"name":"protocol","url":"classes/mqttconnectionoptions.html#protocol","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":36,"kind":1024,"name":"connectTimeoutMs","url":"classes/mqttconnectionoptions.html#connecttimeoutms","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":37,"kind":1024,"name":"keepaliveSec","url":"classes/mqttconnectionoptions.html#keepalivesec","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":38,"kind":1024,"name":"reconnectPeriodMs","url":"classes/mqttconnectionoptions.html#reconnectperiodms","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":39,"kind":1024,"name":"clean","url":"classes/mqttconnectionoptions.html#clean","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":40,"kind":1024,"name":"resubscribe","url":"classes/mqttconnectionoptions.html#resubscribe","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":41,"kind":1024,"name":"username","url":"classes/mqttconnectionoptions.html#username","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":42,"kind":1024,"name":"password","url":"classes/mqttconnectionoptions.html#password","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnectionOptions"},{"id":43,"kind":128,"name":"MqttConnection","url":"classes/mqttconnection.html","classes":"tsd-kind-class"},{"id":44,"kind":1024,"name":"client","url":"classes/mqttconnection.html#client","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"MqttConnection"},{"id":45,"kind":1024,"name":"subscriber","url":"classes/mqttconnection.html#subscriber","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttConnection"},{"id":46,"kind":512,"name":"constructor","url":"classes/mqttconnection.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class","parent":"MqttConnection"},{"id":47,"kind":2048,"name":"isConnected","url":"classes/mqttconnection.html#isconnected","classes":"tsd-kind-method tsd-parent-kind-class","parent":"MqttConnection"},{"id":48,"kind":2048,"name":"connect","url":"classes/mqttconnection.html#connect","classes":"tsd-kind-method tsd-parent-kind-class","parent":"MqttConnection"},{"id":49,"kind":2048,"name":"publish","url":"classes/mqttconnection.html#publish","classes":"tsd-kind-method tsd-parent-kind-class tsd-has-type-parameter","parent":"MqttConnection"},{"id":50,"kind":2048,"name":"subscribe","url":"classes/mqttconnection.html#subscribe","classes":"tsd-kind-method tsd-parent-kind-class","parent":"MqttConnection"},{"id":51,"kind":2048,"name":"unsubscribe","url":"classes/mqttconnection.html#unsubscribe","classes":"tsd-kind-method tsd-parent-kind-class","parent":"MqttConnection"},{"id":52,"kind":2048,"name":"dispose","url":"classes/mqttconnection.html#dispose","classes":"tsd-kind-method tsd-parent-kind-class","parent":"MqttConnection"},{"id":53,"kind":32,"name":"logger","url":"globals.html#logger","classes":"tsd-kind-variable tsd-is-not-exported"},{"id":54,"kind":128,"name":"MqttMessage","url":"classes/mqttmessage.html","classes":"tsd-kind-class tsd-has-type-parameter"},{"id":55,"kind":1024,"name":"QoS","url":"classes/mqttmessage.html#qos","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttMessage"},{"id":56,"kind":1024,"name":"retain","url":"classes/mqttmessage.html#retain","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttMessage"},{"id":57,"kind":1024,"name":"topic","url":"classes/mqttmessage.html#topic","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttMessage"},{"id":58,"kind":1024,"name":"message","url":"classes/mqttmessage.html#message","classes":"tsd-kind-property tsd-parent-kind-class","parent":"MqttMessage"},{"id":59,"kind":512,"name":"constructor","url":"classes/mqttmessage.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class","parent":"MqttMessage"},{"id":60,"kind":128,"name":"MqttSendQueue","url":"classes/mqttsendqueue.html","classes":"tsd-kind-class"},{"id":61,"kind":1024,"name":"mqtt","url":"classes/mqttsendqueue.html#mqtt","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"MqttSendQueue"},{"id":62,"kind":1024,"name":"queue","url":"classes/mqttsendqueue.html#queue","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"MqttSendQueue"},{"id":63,"kind":1024,"name":"timer","url":"classes/mqttsendqueue.html#timer","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"MqttSendQueue"},{"id":64,"kind":1024,"name":"interval","url":"classes/mqttsendqueue.html#interval","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"MqttSendQueue"},{"id":65,"kind":512,"name":"constructor","url":"classes/mqttsendqueue.html#constructor","classes":"tsd-kind-constructor tsd-parent-kind-class","parent":"MqttSendQueue"},{"id":66,"kind":2048,"name":"getSendQueueSize","url":"classes/mqttsendqueue.html#getsendqueuesize","classes":"tsd-kind-method tsd-parent-kind-class","parent":"MqttSendQueue"},{"id":67,"kind":2048,"name":"start","url":"classes/mqttsendqueue.html#start","classes":"tsd-kind-method tsd-parent-kind-class","parent":"MqttSendQueue"},{"id":68,"kind":2048,"name":"stop","url":"classes/mqttsendqueue.html#stop","classes":"tsd-kind-method tsd-parent-kind-class","parent":"MqttSendQueue"},{"id":69,"kind":2048,"name":"add","url":"classes/mqttsendqueue.html#add","classes":"tsd-kind-method tsd-parent-kind-class tsd-has-type-parameter","parent":"MqttSendQueue"},{"id":70,"kind":64,"name":"getHostname","url":"globals.html#gethostname","classes":"tsd-kind-function"},{"id":71,"kind":128,"name":"Sample","url":"classes/sample.html","classes":"tsd-kind-class"},{"id":72,"kind":1024,"name":"mqtt","url":"classes/sample.html#mqtt","classes":"tsd-kind-property tsd-parent-kind-class tsd-is-private","parent":"Sample"},{"id":73,"kind":2048,"name":"run","url":"classes/sample.html#run","classes":"tsd-kind-method tsd-parent-kind-class","parent":"Sample"},{"id":74,"kind":32,"name":"sample","url":"globals.html#sample","classes":"tsd-kind-variable tsd-is-not-exported"}]};