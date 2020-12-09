const Potion = require('../lib/Potion');
const Player = require('../lib/Player');

jest.mock('../lib/Potion');

test('creates a player object', () => {
    const player = new Player('Dave');
  
    expect(player.name).toBe('Dave');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)])
      );
  });

  test("gets player's stats as an object", () => {
    const player = new Player('Dave');
  
    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');
  });

  test('gets inventory from player or returns false', () => {
    const player = new Player('Dave');
  
    expect(player.getInventory()).toEqual(expect.any(Array));
  
    player.inventory = [];
  
    expect(player.getInventory()).toEqual(false);
  });

  test("gets player's health value", () => {
    const player = new Player('Dave');
  
    expect(player.getHealth()).toEqual(expect.stringContaining(player.health.toString()));
  });

  test('checks if player is alive or not', () => {
    const player = new Player('Dave');
  
    Player.prototype.isAlive = function() {
      if (this.health === 0) {
        return false;
      }
      return true;
    };
  });

  test("subtracts from player's health", () => {
    const player = new Player('Dave');
    const oldHealth = player.health;

    Player.prototype.reduceHealth = function(health) {
      this.health -= health;
    
      if (this.health < 0) {
        this.health = 0;
      }
    };
  });

  test("gets player's attack value", () => {
    const player = new Player('Dave');
    player.strength = 10;
  
    Player.prototype.getAttackValue = function() {
      const min = this.strength - 5;
      const max = this.strength + 5;
    
      return Math.floor(Math.random() * (max - min) + min);
    };
  });

  test('adds a potion to the inventory', () => {
    const player = new Player('Dave');
    const oldCount = player.inventory.length;
  
    Player.prototype.addPotion = function(potion) {
      this.inventory.push(potion);
    };
  });

  test('uses a potion from inventory', () => {
    const player = new Player('Dave');
    player.inventory = [new Potion(), new Potion(), new Potion()];
    const oldCount = player.inventory.length;
  
    Player.prototype.usePotion = function(index) {
      const potion = this.getInventory().splice(index, 1)[0];
    
      switch (potion.name) {
        case 'agility':
          this.agility += potion.value;
          break;
        case 'health':
          this.health += potion.value;
          break;
        case 'strength':
          this.strength += potion.value;
          break;
      }
    };
  });