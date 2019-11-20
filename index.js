const Discord = require("discord.js");
const client = new Discord.Client();
const config = "./config.json";
const ownerID = "551836602150813698";

const prefix = "/";

const RC = require("reaction-core");
const RM = require("./src/index.js");
const handler = new RC.Handler();
// add timestamps in front of log messages
require("log-timestamp");

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setStatus('idle')
  client.user.setPresence({
        game: {
            name: 'Gacha Life With Unicoruwu!',
            type: "PLAYING",
        }
    });
});
client.on("message", message => {
  if (!message.member.permissions.has("ADD_REACTIONS")) {
    if (message.content === "/agree") return;
    message.delete();
    message.member.kick();
  }
});

client.on("message", message => {
  if (message.content === "/welcomemsg") {
    if (message.author.id !== ownerID) return;
    message.channel.send({
      embed: {
        title: "Welcome to Bubble's Community",
        description:
          "In order to join the server you must first read the rules.",

        color: 5301186,

        footer: {
          text: "Attempting to chat here will result in you being kicked!"
        },
        thumbnail: {
          url:
            "https://cdn.discordapp.com/icons/598687099616755752/a_4598f41681775c7c98b81fd28045aa5f.gif"
        },

        fields: [
          {
            name: "After you read the rules",
            value:
              "Wait for the remaining time to be up (It should already be up if you accually read the rules)."
          },
          {
            name: "After the time is up",
            value: "Simply Type /agree and you will get the Fans role."
          },
          {
            name: "When you get the Fans role",
            value:
              "This welcome channel will disappear and you will have access to all the main channels"
          }
        ]
      }
    });
  }
});

client.on("message", message => {
  if (message.content === "/rulesmsg") {
    if (message.author.id !== ownerID) return;
    message.channel.send({
      embed: {
        title: "Rules of Bubble Community",
        description:
          "If any rules are broken the punishment will very shortly follow!",

        color: 5301186,

        footer: {
          text: "End of Rules. Congrats if you accually read them :D"
        },
        thumbnail: {
          url:
            "https://cdn.discordapp.com/icons/598687099616755752/a_4598f41681775c7c98b81fd28045aa5f.gif"
        },

        fields: [
          {
            name: "Rule 1",
            value:
              "Rule 1. Absolutely NO NSFW CONTENT This is not a porn channel any nsfw content will result in an instant ban!"
          },
          {
            name: "Rule 2",
            value: "Rule 2. No roleplaying were not furries (Warn x2 then Ban)"
          },
          {
            name: "Rule 3",
            value: "No Spamming Emojis (Warn x2, Kick Then Ban)"
          },
          {
            name: "Rule 4",
            value: "No Racist content or you be instatly banned"
          },
          {
            name: "Rule 5",
            value:
              "If your banned accept it don't make an alt account to join back"
          },
          {
            name: "Rule 6",
            value:
              "Please do not disrespect the staff. Be Nice. (Warn x2, Kick x2 Then Ban)"
          },
          {
            name: "Rule 7",
            value: "No Invites (Instant Ban) (Unless you have permission)"
          },
          {
            name: "Please Note",
            value:
              "Staff reserve the right to ban anyone without giving a reason if they think it is what's best for the server"
          }
        ]
      }
    });
  }
});
client.on("message", message => {
  if (message.content === "/xtrainfomsg") {
    if (message.author.id !== ownerID) return;
    message.channel.send({
      embed: {
        title: "Extra Info",
        description: "Information About Roles",

        color: 5301186,

        footer: {
          text:
            "End of Extra Info wow your a crazy good reader if you read this too :D"
        },
        thumbnail: {
          url:
            "https://cdn.discordapp.com/icons/598687099616755752/a_4598f41681775c7c98b81fd28045aa5f.gif"
        },

        fields: [
          {
            name: "Fans",
            value: "Obtained when you join the server"
          },
          {
            name: "Friends",
            value:
              "Obtained if your my friend (Don't you dare beg for it or im banning no complaining allowed after your banned either!)"
          },
          {
            name: "Developers",
            value:
              "Obtained if you develop bots (and you can prove you develop)"
          },
          {
            name: "Bots",
            value: "Obtained if your a bot"
          },
          {
            name: "Moderators and Staff",
            value:
              "Obtained if you have my trust and your willing to help out(tbh your very unlikely to ever get it SO DON'T BEG FOR THIS EITHER OR I'LL BAN)"
          },
          {
            name: "Owner",
            value: "Owners is Obtained if you own the server"
          },
          {
            name: "Bubble",
            value: "The role for me and my bot you will never obtain it"
          }
        ]
      }
    });
  }
});
const clean = text => {
  if (typeof text === "string")
    return text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203));
  else return text;
};

client.on("message", message => {
  const args = message.content.split(" ").slice(1);
  const { inspect } = require("util");
  if (message.content.startsWith(prefix + "eval")) {
    if (message.author.id !== ownerID)
      return message.reply("Only the bot owner can do that");

    let toEval = args.join(" ");
    let evaluated = inspect(eval(toEval, { depth: 0 }));
    try {
      if (toEval) {
        let hrStart = process.hrtime();
        let hrDiff;
        hrDiff = process.hrtime(hrStart);
        return message.channel.send(
          `*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s` : ""}${hrDiff[1] /
            1000000}ms.*\`\`\`javascript\n${evaluated}\n\`\`\``,
          { maxLength: 1900 }
        );
      } else {
        message.channel.send("Error whilst evaluating: `cannot evaluated air`");
      }
    } catch (e) {
      message.channel.send(`Error whilst evaluating: \`${e.message}\``);
    }
  }
});

client.on("message", message => {
  const args = message.content.split(" ").slice(1);
  const { inspect } = require("util");
  if (message.content.startsWith(prefix + "emsg")) {
    if (message.author.id !== ownerID)
      return message.reply("Only the bot owner can do that");
    message.delete(5);

    let toEval = args.join(" ");
    let evaluated = inspect(eval(toEval, { depth: 0 }));
    try {
      if (toEval) {
        let hrStart = process.hrtime();
        let hrDiff;
        hrDiff = process.hrtime(hrStart);
        return message.channel.send({ maxLength: 1900 });
      } else {
        message.channel.send("Error whilst evaluating: `cannot evaluated air`");
      }
    } catch (e) {
      message.channel.send(`Error whilst evaluating: \`${e.message}\``);
    }
  }
});

const exampleEmbed = new Discord.RichEmbed();

client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  if (message.content.startsWith(prefix + "ping")) {
    message.channel.send({
      embed: {
        color: 0x2ed32e,
        fields: [
          {
            name: ":ping_pong: Pong!",
            value: "Bot Lantency is: " + Math.round(client.ping) + " ms"
          }
        ]
      }
    });
  }
});

let censor = "Language"; /* Replace this with what you want */
client.on("message", message => {
  if (message.author.bot) return;
  if (!message.content.toLowerCase().includes("cyka blyat")) return;

  let edit = message.content.replace(/asshole/gi, censor);
  message.delete();
  message.channel.send("<@" + message.author.id + "> Watch Your Language");
});

client.on("message", message => {
  if (message.author.bot) return;

  if (!message.content.toLowerCase().includes("bitch")) return;
  let edit = message.content.replace(/asshole/gi, censor);
  message.delete();
  message.channel.send("<@" + message.author.id + "> Watch Your Language");
});

client.on("message", message => {
  if (message.content === "/embed")
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        description: "A very simple Embed!"
      }
    });
});

client.on("message", msg => {
  if (msg.content === "@" + `${client.user.tag}`) {
    msg.channel.send("?");
  }
});

client.on("message", msg => {
  if (msg.content === "/heiworld") {
    msg.reply("Hello @МировойГенератор#4271 ");
  }
});

client.on("message", message => {
  if (message.content === "/fruits") {
    message
      .react("🍎")
      .then(() => message.react("🍊"))
      .then(() => message.react("🍇"))
      .catch(() => console.error("One of the emojis failed to react."));
  }
});

client.on("message", message => {
  if (message.content === `${prefix}serverinfo`) {
    message.channel.send(`This server's name is: ${message.guild.name}`);
  }
});

client.on("message", message => {
  if (message.content === "/agree") {
    message.delete();
    if (!message.guild)
      return message.author.send({
        embed: {
          title: "There Seems to be a Problem!",
          description: "This command won't work in DMs.",
          color: 57907,
          footer: { text: "Thanks For Understanding ;)" },
          thumbnail: {
            url:
              "https://1001freedownloads.s3.amazonaws.com/vector/thumb/110332/1281575685.png"
          },
          author: { name: "BubbleBot Error 1" },
          fields: [
            {
              name: "Why Won't it Work?",
              value:
                "This Command adds a role to a user but DMs don't have roles so the command won't work."
            },
            {
              name: "How Can I Fix it?",
              value: "Try Using this command in the Server's Welcome Chat."
            },
            {
              name: "Sorry for The Issues!",
              value:
                "SafeGuards are in place to ensure that the bot is High Quality and won't crash."
            }
          ]
        }
      });

    message.author.send(
      "Welcome to Bubble's Community Follow the Rules and we'll get along just fine ;)"
    );

    message.member.addRole("598959273501917215");
  }
});

client.on("message", message => {
  const user = message.mentions.users.first();
  if (message.author.bot) return;
  // Ignore messages that aren't from a guild

  if (message.content.startsWith("/kick")) {
    if (!message.guild)
      return message.author.send({
        embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "There Seems to be a Problem",
          description: "You can't use this command inside of a DM."
        }
      });

    if (message.member.roles.has("598959273501917215"))
      return message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "There Seems to be a Problem",
          description:
            "It doesn't look like you have permission to use that command.",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "Bubble is King but he wont just give away power!"
          }
        }
      });
    // Easy way to get member object though mentions.
    var member = message.mentions.members.first();
    // Kick
    member
      .kick()
      .then(member => {
        // Successmessage
        message.channel.send({
          embed: {
            author: {
              name: "BubbleBot",
              url: "https://discordapp.com/jobs",
              icon_url:
                "https://cdn.discordapp.com/avatars/612337145147031553/625824a8924a5b6ee0a467c9a8e0e999.png?size=256"
            },
            fields: [
              {
                name:
                  ":wave: " +
                  member.displayName +
                  " has been successfully kicked :point_right: ",
                value: "Follow The Rules"
              }
            ]
          }
        });
      })
      .catch(() => {
        // Failmessage
        message.channel.send("Access Denied");
      });
  }

  // if the message content starts with "/ban"
  if (message.content.startsWith("/ban")) {
    if (!message.guild)
      return message.author.send({
        embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "There Seems to be a Problem",
          description: "You can't use this command inside of a DM."
        }
      });

    if (message.member.roles.has("598959273501917215"))
      return message.channel.send({
        embed: {
          color: 3447003,
          author: {
            name: client.user.username,
            icon_url: client.user.avatarURL
          },
          title: "There Seems to be a Problem",
          description:
            "It doesn't look like you have permission to use that command.",
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "Bubble is King but he wont just give away power!"
          }
        }
      });

    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions

    // If we have a user mentioned
    if (user) {
      user
        .send(
          "YOU JUST GOT BANNED! And you deserved it Acorrding to my master."
        )
        .then(message => console.log(`Sent message: ${message.content}`))
        .catch(console.error);

      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        // Send a message

        user
          .send(
            "YOU JUST GOT BANNED! And you deserved it Acorrding to my master."
          )
          .then(message => console.log(`Sent message: ${message.content}`))
          .catch(console.error);
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */

        member
          .ban({
            reason: "Banned By BubbleBot"
          })
          .then(() => {
            // We let the message author know we were able to ban the person
            message.channel.send({
              embed: {
                author: {
                  name: "BubbleBot",
                  url: "https://discordapp.com/jobs",
                  icon_url:
                    "https://cdn.discordapp.com/avatars/612337145147031553/625824a8924a5b6ee0a467c9a8e0e999.png?size=256"
                },
                fields: [
                  {
                    name: ":white_check_mark: Sucessfuly Banned the user",
                    value: "Follow The Rules"
                  }
                ]
              }
            });
          })
          .catch(err => {
            // An error happened
            // This is generally due to the bot not being able to ban the member,
            // either due to missing permissions or role hierarchy
            message.reply("I was unable to ban the member");
            // Log the error
            console.error(err);
          });
      } else {
        // The mentioned user isn't in this guild
        message.reply("That user isn't in this guild!");
      }
    } else {
      // Otherwise, if no user was mentioned
      console.log(`/ban command error cause of error: Syntax Error`);
      message.channel.send({
        embed: {
          author: {
            name: "Erorr!",
            url: "https://www.youtube.com/channel/UC7TCcMfWdWtWb1uYFj2NTaA",
            icon_url:
              "http://www.clker.com/cliparts/H/Z/0/R/f/S/warning-icon-hi.png"
          },
          title: "There Seems to be a Problem",
          description: "You didn't mention the user to ban",
          color: 1886516,
          timestamp: new Date(),
          footer: {
            icon_url:
              "https://cdn.discordapp.com/avatars/612337145147031553/625824a8924a5b6ee0a467c9a8e0e999.png?size=256",
            text: "BubbleBot Error logged at"
          },
          thumbnail: { url: "https://blog.hubspot.com/hubfs/Shrug-Emoji.jpg" }
        }
      });
    }
  }
});

client.on("message", message => {
  if (message.content.toLowerCase() === "is bubblebot down")
    message.channel.send({
      embed: {
        color: 3447003,
        author: {
          name: client.user.username,
          icon_url: client.user.avatarURL
        },
        title: "I'm Not Sure",
        description: "I think i'm working fine",
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "Bubblebot Works as of:"
        }
      }
    });
});

client.on("message", msg => {
  if (msg.content === "/puppyeyes")
    msg.reply("Woof", {
      files: [
        "https://ichef.bbci.co.uk/news/912/mcs/media/images/82378000/jpg/_82378863_dogthinkstock.jpg"
      ]
    });
});

client.on("message", msg => {
  if (msg.content === "/awesomeringtone")
    msg.reply("here ya go", {
      files: [
        "https://canary.discordapp.com/assets/b9411af07f154a6fef543e7e442e4da9.mp3"
      ]
    });
});

client.on("message", message => {
  if (message.content.startsWith("/avatar")) {
    const user = message.mentions.users.first() || message.author;
    const avatarEmbed = new Discord.RichEmbed()
      .setColor(0x333333)
      .setAuthor(user.username + "'s Avatar")
      .setImage(user.avatarURL);
    message.channel.send(avatarEmbed);
  }
});

client.on("messageReactionAdd", (messageReaction, user) =>
  handler.handle(messageReaction, user)
);

client.on("message", async msg => {
  if (msg.content === "/help") {
    let menu = new RM.Menu(msg.channel, handler, {
      RM: { disable: { left: false }, custom: { left: "◀", right: "▶" } },
      RC: { owner: msg.author.id }
    });
    let btns = makeBtns(menu);
    for (let page of pages) {
      await menu.add(page).catch(console.error);
    }

    menu.send(btns).catch(console.error);
  }
});

const pages = [
  {
    color: 8698926,
    title: "General",
    footer: {
      text: "Page 1 of 3"
    },
    thumbnail: {
      url:
        "http://www.newdesignfile.com/postpic/2016/05/windows-8-help-icon_398421.png"
    },

    fields: [
      {
        name: "/help",
        value: "Gives you info about common commands"
      },
      {
        name: "/avatar",
        value: "Shows you a user's avatar"
      }
    ]
  },

  {
    color: 8698926,
    title: "Fun",
    footer: {
      text: "Page 2 of 3"
    },
    thumbnail: {
      url:
        "http://www.newdesignfile.com/postpic/2016/05/windows-8-help-icon_398421.png"
    },

    fields: [
      {
        name: "/cat",
        value: "Shows a random picture of a cat"
      },
      {
        name: "/puppyeyes",
        value: "Super Adorable Doggo🐕"
      },

      {
        name: "/dog",
        value: "Shows a Random Picture of a Dog"
      }
    ]
  },

  {
    color: 8698926,
    title: "Moderation",
    footer: {
      text: "Page 3 of 3"
    },
    thumbnail: {
      url:
        "http://www.newdesignfile.com/postpic/2016/05/windows-8-help-icon_398421.png"
    },

    fields: [
      {
        name: "/kick",
        value: "Kicks a user!"
      },
      {
        name: "/ban",
        value: "Bans a user"
      },

      {
        name: "There is also a language filter.",
        value: "But There is no way to configure it yet"
      }
    ]
  }
];

let makeBtns = menu => {
  const buttons = [
    {
      emoji: "🔄",

      run: (user, message) => {
        menu.select(1).catch(console.error);
      }
    }
  ];
  console.log("/help_beta executed");
  return buttons;
};

("use strict");
// Libraries required - make sure to run 'npm install' to install them before running
const querystring = require("querystring");
const r2 = require("r2");

const DOG_API_URL = "https://api.thedogapi.com/";
const DOG_API_KEY = "b663bc0e-bfa5-44b2-aeb1-6b25128652c5"; // get a free key from - https://thedogapi.com/signup

// Discord connection code ---

client.on("ready", () => {
  console.log(`Dog API Ready`);
});
client.on("message", message => {
  if (message.content === "/dog") {
    messageRecieved(message);
  }
});

client.on("error", data => {
  console.log("error", data);
  // attempt reconnection x times, after x seconds, exponential backoff
});

/**
 * Called whenever a message is posted into the same channel as the Bot
 */
async function messageRecieved(message) {
  try {
    // pass the name of the user who sent the message for stats later, expect an array of images to be returned.
    var images = await loadImage(message.author.username);

    // get the Image, and first Breed from the returned object.
    var image = images[0];
    var breed = image.breeds[0];

    console.log("message processed", "showing", breed);
    // use the *** to make text bold, and * to make italic
    message.channel.send(
      "***" + breed.name + "*** \r *" + breed.temperament + "*",
      { files: [image.url] }
    );
    // if you didn't want to see the text, just send the file
  } catch (error) {
    console.log(error);
  }
}
/**
 * Makes a request to theDogAPI.com for a random dog image with breed info attached.
 */
async function loadImage(sub_id) {
  // you need an API key to get access to all the iamges, or see the requests you've made in the stats for your account
  var headers = {
    "X-API-KEY": DOG_API_KEY
  };
  var query_params = {
    has_breeds: true, // we only want images with at least one breed data object - name, temperament etc
    mime_types: "jpg,png", // we only want static images as Discord doesn't like gifs
    size: "small", // get the small images as the size is prefect for Discord's 390x256 limit
    sub_id: sub_id, // pass the message senders username so you can see how many images each user has asked for in the stats
    limit: 1 // only need one
  };
  // convert this obejc to query string
  let queryString = querystring.stringify(query_params);

  try {
    // construct the API Get request url
    let _url = DOG_API_URL + `v1/images/search?${queryString}`;
    // make the request passing the url, and headers object which contains the API_KEY
    var response = await r2.get(_url, { headers }).json;
  } catch (e) {
    console.log(e);
  }
  return response;
}
const { get } = require("snekfetch");
client.on("ready", () => {
  console.log("Cat Api READY");
  // For an activity, do:
  // client.user.setActivity('Name of activity');
});

client.on("message", msg => {
  // Embedded
  if (msg.content.startsWith(prefix + "cat")) {
    try {
      get("https://aws.random.cat/meow").then(res => {
        const embed = new Discord.RichEmbed()
          .setTitle("A Random Image of a cat Meow!")
          .setImage(res.body.file);
        return msg.channel.send({ embed });
      });
    } catch (err) {
      return msg.channel.send(err.stack);
    }
  }
});

client.on("message", msg => {
  // Embedded
  if (msg.content.startsWith(prefix + "meme")) {
    try {
      get("api.imgflip.com/get_memes").then(res => {
        const embed = new Discord.RichEmbed()
          .setTitle("MEME!")
          .setImage(res.body.file);
        return msg.channel.send({ embed });
      });
    } catch (err) {
      return msg.channel.send(err.stack);
    }
  }
});

client.login("NjEyMzM3MTQ1MTQ3MDMxNTUz.XZ51PQ.RSupV2StxESeac-XqV8eN6MGhBo");
