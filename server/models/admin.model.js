const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AdminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "First name is required"],
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: [8, "Password must be at least 8 characters or longer"]
    },
    
}, {timestamps: true});
AdminSchema.virtual('confirmPassword')
  .get( () => this._confirmPassword )
  .set( (value) => this._confirmPassword = value );

  AdminSchema.pre('validate', function(next) {
if (this.password !== this.confirmPassword) {
    this.invalidate('confirmPassword', 'Password must match confirm password');
}
next();
});
AdminSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10)
      .then(hash => {
        this.password = hash;
        next();
      });
  });

  
  

module.exports = mongoose.model('Admin', AdminSchema);