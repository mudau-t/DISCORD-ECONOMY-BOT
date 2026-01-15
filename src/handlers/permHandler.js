function isOwner(userId) {
  return userId === process.env.OWNER_ID;
}

function isGuard(member) {
  if (!member || !member.roles) return false;

  return member.roles.cache.some(
    role => role.name === process.env.GUARD_ROLE
  );
}

function isTestart(member) {
  if (!member || !member.roles) return false;

  return member.roles.cache.some(
    role => role.name === process.env.TESTART_ROLE
  );
}

// Owner + Guard
function hasPower(member) {
  return isOwner(member.id) || isGuard(member);
}

// Owner + Testart
function canTest(member) {
  return isOwner(member.id) || isTestart(member);
}

// Display role priority
function getDisplayRole(member) {
  if (isOwner(member.id)) return "OWNER";
  if (isGuard(member)) return "GUARD";
  if (isTestart(member)) return "TESTART";
  return "USER";
}

module.exports = {
  isOwner,
  isGuard,
  isTestart,
  hasPower,
  canTest,
  getDisplayRole
};
