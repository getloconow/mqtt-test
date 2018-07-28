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
  states = {
    0: 'disconnected',
    1: "connecting",
    2: "connected"
  }
  state = null
  constructor(private mqtt: MqttService) {
    this.mqtt.observe('messages').subscribe(e => {
      document.title = e.payload.toString()
      this.message = e.payload.toString()
      // this.messages.push(this.message)
      this.messages.unshift(this.message)

    })
    this.mqtt.publish("messages", `hello from ${parseInt((Math.random() * 100000).toString())}`, { qos: 2, retain: true, }).subscribe(e => {
      console.log(e)
    })

    this.mqtt.state.subscribe(e => {
      this.state = e
    })

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
