class VanishEverything {
  constructor() {
    this.body = document.body;
    this.els = [];
    this.disappear = this.disappear.bind(this);
  }


  disappear() {
    this.body.style.transition = 'all 1s';
    this.body.style.opacity = '0';
    setTimeout( () => {this.body.style.display = "none";}, 2000);
  }

  run() {
    this.disappear();
  }
}
