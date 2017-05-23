class Vector{
  constructor(x,y){
    this.x = x||0;
    this.y = y||0;
    this._this = this;
    return this;
  }
  set(a){
    a instanceof Vector ?
      (this.x=a.x, this.y=a.y) :
    typeof a === "object" ?
      (this.x=a.x, this.y=a.y) :
      (this.x=a, this.y=a);

    return this;
  }
  sub(a){
    a instanceof Vector ?
      (this.x-=a.x, this.y-=a.y) :
    typeof a === "object" ?
      (this.x-=a.x, this.y-=a.y) :
      (this.x-=a, this.y-=a);

    return this;
  }
  add(a){
    a instanceof Vector ?
      (this.x+=a.x, this.y+=a.y) :
    typeof a === "object" ?
      (this.x+=a.x, this.y+=a.y) :
      (this.x+=a, this.y+=a);

    return this;
  }
  div(a){
    a!= 0 ?
    a instanceof Vector ?
      (this.x/=a.x, this.y/=a.y) :
    typeof a === "object" ?
      (this.x/=a.x, this.y/=a.y) :
      (this.x/=a, this.y/=a)
    : void 0;
    return this;
  }
  mult(a){
    a instanceof Vector ?
      (this.x*=a.x, this.y*=a.y) :
    typeof a === "object" ?
      (this.x*=a.x, this.y*=a.y) :
      (this.x*=a, this.y*=a);

    return this;
  }
  mag(){
    let b = Math.sqrt(this.x*this.x + this.y*this.y)
    return b;
  }
  norm(){
    this.div(this.mag());
    return this;
  }
  setMag(a){
    this.norm().mult(a);
    return this;
  }
  direction(){
    return Math.atan2(this.y, this.x);
  }
  angleTo(a){
    return Math.atan2(a.x - this.x, a.y - this.y);
  }
  distanceTo(a){
    return Math.sqrt(Math.pow(a.x - this.x, 2) + Math.pow(a.y - this.y, 2));
  }
  copy(){
    return new Vector(this.x, this.y);
  }
  map(a, b, c, d){
    return a < this.x < b && c < this.y < d ? this : (this.x < a ? this.x = a : this,
    this.x > b ? this.x = b : this,
    this.y < c ? this.y = c : this,
    void (this.y > d ? this.y = d : this))
  }
}
