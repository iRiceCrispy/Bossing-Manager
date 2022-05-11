const { User, Party, Drop } = require('../models');

const seed = async () => {
  const users = await User.insertMany([{
    username: 'demo1',
    email: 'demo1@user.gg',
    password: 'password',
  }, {
    username: 'demo2',
    email: 'demo2@user.gg',
    password: 'password2',
  }, {
    username: 'demo3',
    email: 'demo3@user.gg',
    password: 'password3',
  }, {
    username: 'demo4',
    email: 'demo4@user.gg',
    password: 'password4',
  }, {
    username: 'demo5',
    email: 'demo5@user.gg',
    password: 'password5',
  }, {
    username: 'demo6',
    email: 'demo6@user.gg',
    password: 'password6',
  }, {
    username: 'demo7',
    email: 'demo7@user.gg',
    password: 'password7',
  }, {
    username: 'demo8',
    email: 'demo8@user.gg',
    password: 'password8',
  }]);

  const parties = await Party.insertMany([{
    name: 'Black Mage party',
    leaderId: users[0].id,
    memberIds: [
      users[0].id, users[1].id, users[2].id, users[3].id, users[4].id, users[5].id,
    ],
  }, {
    name: 'Vhilla party',
    leaderId: users[0].id,
    memberIds: [
      users[0].id, users[3].id, users[4].id, users[5].id, users[6].id, users[7].id,
    ],
  }, {
    name: 'Gloom/Darknell',
    leaderId: users[2].id,
    memberIds: [
      users[2].id, users[0].id, users[1].id, users[3].id, users[4].id,
    ],
  }, {
    name: 'Lucid/Will party',
    leaderId: users[5].id,
    memberIds: [
      users[5].id, users[0].id, users[6].id, users[7].id,
    ],
  }, {
    name: 'Lomien party',
    leaderId: users[1].id,
    memberIds: [
      users[1].id, users[0].id,
    ],
  }]);

  await Drop.insertMany([{
    partyId: parties[0].id,
    bossName: 'Black Mage',
    itemName: 'Arcane Umbra Fan',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[0].memberIds.map(memberId => ({ userId: memberId })),
  }, {
    partyId: parties[0].id,
    bossName: 'Black Mage',
    itemName: 'Genesis Badge',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[0].memberIds.map(memberId => ({ userId: memberId })),
  }, {
    partyId: parties[1].id,
    bossName: 'Verus Hilla',
    itemName: 'Arcane Umbra Axe',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[1].memberIds.map(memberId => ({ userId: memberId })),
  }, {
    partyId: parties[1].id,
    bossName: 'Verus Hilla',
    itemName: 'Source of Suffering',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[1].memberIds.map(memberId => ({ userId: memberId })),
  }, {
    partyId: parties[2].id,
    bossName: 'Chaos Gloom',
    itemName: 'Endless Terror',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[2].memberIds.map(memberId => ({ userId: memberId })),
  }, {
    partyId: parties[2].id,
    bossName: 'Hard Darknell',
    itemName: 'Commanding Force Earring',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[2].memberIds.map(memberId => ({ userId: memberId })),
  }, {
    partyId: parties[3].id,
    bossName: 'Hard Will',
    itemName: 'Cursed Red Spellbook',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[3].memberIds.map(memberId => ({ userId: memberId })),
  }, {
    partyId: parties[3].id,
    bossName: 'Hard Lucid',
    itemName: 'Dreamy Belt',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[3].memberIds.map(memberId => ({ userId: memberId })),
  }, {
    partyId: parties[4].id,
    bossName: 'Hard Damien',
    itemName: 'Magic Eyepatch',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[4].memberIds.map(memberId => ({ userId: memberId })),
  }, {
    partyId: parties[4].id,
    bossName: 'Hard Lotus',
    itemName: 'Berserked',
    image: 'https://orangemushroom.files.wordpress.com/2018/08/badge-of-genesis.png',
    members: parties[4].memberIds.map(memberId => ({ userId: memberId })),
  }]);
};

const unseed = async () => {
  await Drop.collection.drop();
  await Party.collection.drop();
  await User.collection.drop();
};

module.exports = { seed, unseed };
