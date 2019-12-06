const {Event} = require('../../../handler');
const {activeGiveaways} = require('../../Giveaway');

module.exports = class extends Event {
  constructor() {
    super('messageReactionAdd');
  }

  run(client, reaction, user) {
    if (user.bot) return;

    const message = reaction.message;
    if (activeGiveaways.has(message.id)) {
      const emoji = reaction.emoji;
      if (emoji.name !== "🎉") return;

      const giveaway = activeGiveaways.get(message.id);
      giveaway.enter(user.id);
    }
  }
};
