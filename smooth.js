var smoothMove = function(pos, target) {
  this.pos      = pos;
  this.target   = target;
  this.velocity = 0;
};

smoothMove.prototype.update = function() {
  if (this.velocity < 0) {
    if (this.target > this.pos - this.velocity * (this.velocity - 1) / 2) {
      this.velocity += 1;
    } else if (this.target <= this.pos - (this.velocity - 1) * (this.velocity - 2) / 2) {
      this.velocity -= 1;
    }
  } else {
    if (this.target < this.pos + this.velocity * (this.velocity + 1) / 2) {
      this.velocity -= 1;
    } else if (this.target >= this.pos + (this.velocity + 1) * (this.velocity + 2) / 2) {
      this.velocity += 1;
    }
  }

  this.pos += this.velocity;
  return this.pos;
};