const fs = require("fs");
const path = require("path");

const DATA_FILE = path.join(__dirname, "../../data/users.json");

/* -------------------- INTERNAL HELPERS -------------------- */

function loadUsers() {
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({}, null, 2));
  }

  return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveUsers(users) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(users, null, 2));
}

/* -------------------- PUBLIC FUNCTIONS -------------------- */

function getUser(userId) {
  const users = loadUsers();

  if (!users[userId]) {
    users[userId] = {
      balance: 5000,   // wallet
      bank: 0,         // bank
      lastDaily: 0     // daily cooldown
    };

    saveUsers(users);
  }

  return users[userId];
}

function updateUser(userId, newData) {
  const users = loadUsers();

  if (!users[userId]) {
    getUser(userId);
  }

  users[userId] = {
    ...users[userId],
    ...newData
  };

  saveUsers(users);
}

/* -------------------- EXTRA UTILITIES -------------------- */

// Add money safely
function addBalance(userId, amount) {
  const user = getUser(userId);
  updateUser(userId, { balance: user.balance + amount });
}

// Remove money safely
function removeBalance(userId, amount) {
  const user = getUser(userId);
  updateUser(userId, { balance: Math.max(0, user.balance - amount) });
}

// Move wallet → bank
function deposit(userId, amount) {
  const user = getUser(userId);
  if (amount > user.balance) return false;

  updateUser(userId, {
    balance: user.balance - amount,
    bank: user.bank + amount
  });

  return true;
}

// Move bank → wallet
function withdraw(userId, amount) {
  const user = getUser(userId);
  if (amount > user.bank) return false;

  updateUser(userId, {
    bank: user.bank - amount,
    balance: user.balance + amount
  });

  return true;
}

module.exports = {
  getUser,
  updateUser,
  addBalance,
  removeBalance,
  deposit,
  withdraw
};
