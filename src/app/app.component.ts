import { Component, OnInit } from '@angular/core';
import { MqttService } from 'ngx-mqtt';
// import { connect } from 'mqtt'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  message = ""
  messages = []
  constructor(private mqtt: MqttService) {
    this.mqtt.observe('messages').subscribe(e => {
      document.title = e.payload.toString()
      this.message = e.payload.toString()
      // this.messages.push(this.message)
      this.messages.unshift(this.message)
      parse
    })
    this.mqtt.unsafePublish("messages", `hello from ${parseInt((Math.random() * 100000).toString()}`, { qos: 2, retain: true })

  }
  title = 'app';
  ngOnInit() {

  }
  value = ""
  checkAndsendIfEnterPressed(e) {
    if (e.key == 'Enter' && this.value.length > 0) {
      this.mqtt.unsafePublish('messages', this.value, { qos: 2, retain: true })
      this.value = ""
    }
  }
}
