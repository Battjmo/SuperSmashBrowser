//this code here is used to cause the entire page to disappear. To make the elements
//disappear one at a time, comment out the disappear() method, disappear.bind, and the
//reference in run(). Then, uncomment the other code. -- HC

class VanishEverything {
  constructor() {
    this.body = document.body;
    this.els = [];
    // this.counter = 0;
    // this.counter2 = 0;
    // this.traversal = this.traversal.bind(this);
    // this.applyEffects = this.applyEffects.bind(this);
    // this.removeEls = this.removeEls.bind(this);
    this.disappear = this.disappear.bind(this);
  };


  disappear() {
    this.body.style.transition = 'all 1s';
    this.body.style.opacity = '0';
    setTimeout( () => {this.body.style.display = "none"}, 2000);
  }
  // traversal(parent) {
  //   if (parent.children.length) {
  //     Array.from(parent.children).forEach(child => this.traversal(child));
  //   }
  //   this.els.push(parent);
  // };
  //
  // applyEffects(array, delay) {
  //   setTimeout(() => {
  // 	  array[this.counter].style.transition = 'all 0.3s';
  //     array[this.counter].style.opacity = '0';
  //     this.counter++;
  //     if (this.counter < array.length) this.applyEffects(array, delay);
  //   }, delay);
  // };
  //
  // removeEls(array, delay) {
  //
  //   setTimeout(() => {
  //     console.log(array[this.counter2]);
  // 	  array[this.counter2].style.display = "none";
  //     this.counter2++;
  //     if (this.counter2 < array.length) this.removeEls(array, delay);
  //   }, delay);
  // };

  run() {
  //   this.traversal(this.body);
  //   this.applyEffects(this.els, 0);
  //   setTimeout(() => { this.removeEls(this.els, 0); }, 1000);
  // };
    this.disappear();
  }
};
