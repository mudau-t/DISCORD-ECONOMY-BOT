function isOwner(userId) {
  return userId === process.env.OWNER_ID;
}

function isGuard(member) {
  return member.roles.cache.some(
    r => r.name === process.env.GUARD_ROLE
  );
}

function hasPower(member) {
  return isOwner(member.id) || isGuard(member);
}

module.exports = { isOwner, isGuard, hasPower };
