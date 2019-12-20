// from observable
let customUIDCounter = 0;

export class CustomUID {
  id: string;
  href: string;
  constructor(name: any) {
    customUIDCounter++;
    if (name === null) {
      this.id = 'O-' + customUIDCounter.toString();
    } else {
      this.id = 'O-' + name + '-' + customUIDCounter.toString();
    }
    this.href = window.location.href + '#' + this.id;
  }
  getId() {
    return this.id;
  }
  toString() {
    return 'url(' + this.href + ')';
  }
}
