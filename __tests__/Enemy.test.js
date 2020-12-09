const Enemy = require('../lib/Enemy.js');
const Potion = require('../lib/Potion.js');

jest.mock('../lib/Potion.js');

test('creates an enemy object', () => {
  const enemy = new Enemy('goblin', 'sword');

  expect(enemy.name).toBe('goblin');
  expect(enemy.weapon).toBe('sword');
  expect(enemy.health).toEqual(expect.any(Number));
  expect(enemy.strength).toEqual(expect.any(Number));
  expect(enemy.agility).toEqual(expect.any(Number));
  expect(enemy.potion).toEqual(expect.any(Object));
});

test("gets enemy's health value", () => {
    const enemy = new Enemy('goblin', 'sword');
  
    Enemy.prototype.getHealth = function() {
        return `The ${this.name}'s health is now ${this.health}!`;
      };
  });
  
  test('checks if enemy is alive or not', () => {
    const enemy = new Enemy('goblin', 'sword');
  
    Enemy.prototype.isAlive = function() {
        if (this.health === 0) {
          return false;
        }
        return true;
      };
  });
  
  test("gets enemy's attack value", () => {
    const enemy = new Enemy('goblin', 'sword');
    enemy.strength = 10;
  
    Enemy.prototype.getAttackValue = function() {
        const min = this.strength - 5;
        const max = this.strength + 5;
      
        return Math.floor(Math.random() * (max - min) + min);
      };
  });
  
  test("subtracts from enemy's health", () => {
    const enemy = new Enemy('goblin', 'sword');
    const oldHealth = enemy.health;
  
    Enemy.prototype.reduceHealth = function(health) {
        this.health -= health;
      
        if (this.health < 0) {
          this.health = 0;
        }
      };
  });

  test('gets a description of the enemy', () => {
    const enemy = new Enemy('goblin', 'sword');
  
    Enemy.prototype.getDescription = function() {
        return `A ${this.name} holding a ${this.weapon} has appeared!`;
      };
  });