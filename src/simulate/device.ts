const URL = "http"

function getRand(min: number, max: number) {
  return Math.random() * (max - min) + min
}

export default class Device {
  private temp: number;
  private humid:number;
  private weather:number;
  public tickCount:number;
  /*
  0 = sunny
  1 = rainy
  2 = cloudy
  3 = night
  */

  public constructor() {
    this.temp = 30   + getRand(-2, 2);
    this.humid = 50 + getRand(-5, 5);
    this.weather = 0;
    this.tickCount = 0;
  }

  private tick() {
    let tempFactor : Array<number>;
    let humidFactor : Array<number>;
    if (this.weather == 0){
      tempFactor = [-1, 1.6]
      humidFactor = [-1.2, 1]
    }
    else if (this.weather == 1) {
      tempFactor = [-1.2, 1];
      humidFactor = [0, 1.5];
    }
    else if (this.weather === 2) {
      tempFactor = [-1.2, 1.2]
      humidFactor = [-1.2, 1.2]
    }
    else {
      tempFactor = [-1.2, 1]
      humidFactor = [- 1.2, 1.2]
    }
    this.temp = Math.min(Math.max(this.temp + getRand(tempFactor[0]!, tempFactor[1]!), 23), 40);
    this.humid = Math.min(Math.max(this.humid + getRand(humidFactor[0]!, humidFactor[1]!), 15), 95);
    if (Math.random() <= 0.2) {
      this.weather = Math.floor(getRand(0,4))
    }
    this.tickCount++;
  }

  private async sendTemp() {
    const data = {
      "value": Math.round(this.temp * 100)/100,
      "unit" : "C"
    }
    fetch(process.env.HOST_URL + "/api/v1/temp", {
      method: "POST",
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${process.env.AUTH_TOKEN}`
      },
      body: JSON.stringify(data)
    })
    // .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  private async sendHumid() {
    const data = {
      "value": Math.round(this.humid * 100)/100,
    }
    fetch(process.env.HOST_URL + "/api/v1/humidity", {
      method: "POST",
      headers: {
        'Accept' : 'application/json',
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${process.env.AUTH_TOKEN}`
      },
      body: JSON.stringify(data)
    })
    // .then(res => console.log(res))
    .catch(err => console.error(err));
  }

  private async sendData(){
    this.sendHumid();
    this.sendTemp();
  }

  public getWeather() {
    const lookup = [
      "sunny",
      "rainy",
      "cloudy",
      "night"
  ]
    return lookup[this.weather];
  }

  public run() {
    setInterval(this.tick.bind(this), 1000);
    setInterval(this.sendData.bind(this), 2000);
  }
}
