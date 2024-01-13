class CoffeeMachine {
  _on = false;
  usedWater = 0;

  constructor(brand, coffeeTypes, waterVolume) {
    this.brand = brand;
    this.coffeeTypes = coffeeTypes;
    this.waterVolume = waterVolume;
  }

  turnOn() {
    this._on = true;
    console.log('-= ON =-');
    this.updateInfo('-= ON =-');
  }

  turnOff() {
    this._on = false;
    console.log('-= OFF =-');
    this.updateInfo('-= OFF =-');
  }

  checkOn() {
    if (!this._on) {
      console.log('Coffee Machine is OFF !!!');
    }
    return this._on;
  }

  showInfo() {
    console.log(`-- INFO --`);
    console.log(`Brand: ${this.brand}`);
    console.log(`Types: ${this.coffeeTypes.join(';')}`);
    console.log(`Water Volume: ${this.waterVolume}L`);
  }

  checkWater(amount) {
    if (this.waterVolume - this.usedWater < amount) {
      console.log('ERROR: Not enough water!');
      this.updateInfo('ERROR: Not enough water!');
      return false;
    }
    return true;
  }

  showCoffeeImage(imagePath) {
    const coffeeImage = document.getElementById('coffeeImage');
    coffeeImage.src = imagePath;
    coffeeImage.style.display = 'block'; 
  }

  makeCoffee(coffeeType) {
    if (!this.checkOn()) {
      return;
    }

    const coffeeInfo = {
      'espresso': { water: 100, time: 3 },
      'americano': { water: 200, time: 4 },
      'latte': { water: 300, time: 6 },
      'cappuccino': { water: 300, time: 6 }
    };

    if (!this.coffeeTypes.includes(coffeeType)) {
      console.log('ERROR: Invalid coffee type!');
      return;
    }

    if (!this.checkWater(coffeeInfo[coffeeType].water)) {
      return;
    }

    const brewingTime = coffeeInfo[coffeeType].time;
    const coffeeImagePaths = {
      'espresso': 'img/images1.jfif',
      'americano': 'img/images2.jfif',
      'latte': 'img/images3.jfif',
      'cappuccino': 'img/images4.jfif'
    };

    let timeRemaining = brewingTime;
    const timer = setInterval(() => {
      timeRemaining--;
      this.showTimer(timeRemaining);

      if (timeRemaining === 0) {
        clearInterval(timer);
        this.usedWater += coffeeInfo[coffeeType].water;
        console.log('Starting...');
        console.log('Your coffee is ready!');
        console.log(`Remaining water: ${this.waterVolume - this.usedWater}ml`);
        this.showCoffeeImage(coffeeImagePaths[coffeeType]);
        this.updateInfo(`Your ${coffeeType} is ready!`);
      }
    }, 1000);

  }

  showTimer(time) {
    const infoElement = document.getElementById('info');
    const coffeeImage = document.getElementById('coffeeImage');
    
    // Зміна тексту таймера
    infoElement.innerHTML = `${time} seconds`;

    // Приховання фото під час таймера
    coffeeImage.style.display = 'none';
  }

  addWater(amount) {
    if (!this.checkOn()) {
      return;
    }

    this.waterVolume += amount;
    this.updateInfo(`Added ${amount}L of water.`);
    console.log(`Added ${amount}L of water.`);
    coffeeImage.style.display = 'none'; 
  }

  updateInfo(message) {
    const infoElement = document.getElementById('info');
    infoElement.innerHTML = message;
  }

}

const coffeeMachine = new CoffeeMachine('Siemens', ['espresso', 'americano', 'latte', 'cappuccino'], 1000);

function togglePower() {
  if (coffeeMachine.checkOn()) {
      coffeeMachine.turnOff();
      coffeeImage.style.display = 'none';
  } else {
      coffeeMachine.turnOn();
  }
}

function makeCoffee(coffeeType) {
  if (coffeeMachine.checkOn()) {
    const coffeeInfo = {
      'espresso': { water: 100, time: 3 },
      'americano': { water: 200, time: 4 },
      'latte': { water: 300, time: 6 },
      'cappuccino': { water: 300, time: 6 }
    };                                    

    if (coffeeMachine.checkWater(coffeeInfo[coffeeType].water)) {
      coffeeMachine.makeCoffee(coffeeType);
    } else {
      // Води недостатньо, сховати фото
      coffeeImage.style.display = 'none';
    }
  }
}

function addWater(amount) {
  coffeeMachine.addWater(amount);
}

coffeeMachine.showInfo();