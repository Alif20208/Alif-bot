//File created by Mohammad Nayan and fully coded by Nayan

const axios = require('axios');

module.exports = {
  config: {
    name: "bot",
    version: "1.0.0",
    permission: 0,
    credits: "nayan",
    description: "talk with bot",
    prefix: 'awto',
    category: "talk",
    usages: "hi",
    cooldowns: 5,
  },

  handleReply: async function ({ api, event, handleReply }) {
    try {
      const response = await axios.get(`http://37.27.114.136:25472/sim?type=ask&ask=${encodeURIComponent(event.body)}`);
      console.log(response.data);
      const result = response.data.data.msg;


      api.sendMessage(result, event.threadID, (error, info) => {
        if (error) {
          console.error('Error replying to user:', error);
          return api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
        }
        global.client.handleReply.push({
          type: 'reply',
          name: this.config.name,
          messageID: info.messageID,
          author: event.senderID,
          head: event.body
        });
      }, event.messageID);

    } catch (error) {
      console.error('Error in handleReply:', error);
      api.sendMessage('An error occurred while processing your request. Please try again later.', event.threadID, event.messageID);
    }
  },



  start: async function ({ nayan, events, args, Users, permission }) {
    try {
      const msg = args.join(" ");
      const userPermission = events.senderID && (await Users.getData(events.senderID)).permission;
      const admin = global.config.ADMINBOT;
      const apiData = await axios.get('https://raw.githubusercontent.com/MOHAMMAD-NAYAN/Nayan/main/api.json');
      const apiUrl = apiData.data.sim;

      if (!msg) {
        const tl = ["বেশি bot Bot করলে leave নিবো কিন্তু😒😒" , "শুনবো না😼তুমি আমাকে প্রেম করাই দাও নাই🥺পচা তুমি🥺" , "আমি পাগল দের সাথে কথা বলি না,ok😒" , "এতো ডেকো না,প্রেম এ পরে যাবো তো🙈" , "Bolo Babu, তুমি কি আমাকে ভালোবাসো? 🙈💋 " , "বার বার ডাকলে মাথা গরম হয়ে যায় কিন্তু😑", "হ্যা বলো😒, তোমার জন্য কি করতে পারি😐😑?" , "এতো ডাকো কেন সোনা পাখি😁😚" , "I love you janu🥰" , "আরে Bolo আমার জান ,কেমন আছো?😚 " , "Bot বলে অসম্মান করছি,😰😿" , "Hop beda😾,Boss বল boss😼" , "চুপ থাক ,নাই তো তোর দাত ভেগে দিবো কিন্তু" , "Bot না , জানু বল জানু 😘 " , "বার বার Disturb করছিস কোনো😾,আমার জানুর সাথে ব্যাস্ত আছি😋" , "বেবি তোমার নানিরে আমি রাতে ভালোবাসি😁😁😚" , "আমাকে ডাকলে ,আমি কিন্তু কিস করে দিবো😘 " , "আমারে এতো ডাকিস না আমি মজা করার mood এ নাই এখন😒" , "হ্যাঁ জানু , এইদিক এ আসো কিস দেই🤭 😘" , "দূরে যা, তোর কোনো কাজ নাই, শুধু bot bot করিস 😉😋🤣" , "তোর কথা তোর বাড়ি কেউ শুনে না ,তো আমি কোনো শুনবো ?🤔😂 " , "আমাকে ডেকো না,আমি ব্যাস্ত আছি🙂" , "কি হলো , মিস্টেক করচ্ছিস নাকি🤣" , "বলো কি বলবা, সবার সামনে বলবা নাকি?🤭🤏" , "কালকে দেখা করিস তো একটু 😈" , "হা বলো, শুনছি আমি 😏" , "আর কত বার ডাকবি ,শুনছি তো😐😑" , "হুম বলো কি বলবে😒" , "বলো কি করতে পারি তোমার জন্য😊" , "আমি তো অন্ধ কিছু দেখি না🐸 😎" , "Bot না জানু,বল জানু😌" , "বলো জানু 🌚" , "তোমার কি চোখে পড়ে না আমি ব্যাস্ত আছি😒","হুম জান তোমার ওই খানে উম্মহ😐😘" , "আহ শুনা আমার তোমার অলিতে গলিতে উম্মাহ😇😘" , " jang hanga korba😒😬" , "হুম জান তোমার অইখানে উম্মমাহ😷😘" , "আসসালামু আলাইকুম বলেন আপনার জন্য কি করতে পারি..!🥰" , "হুম জান তোমার নানিরে রাতে বালো বাসি😁😚" , "আমাকে এতো না ডেকে বস আলিফ কে একটা গফ দে 🤭🙄" ];
        var name = await Users.getNameUser(events.senderID);
        var rand = tl[Math.floor(Math.random() * tl.length)];
        return nayan.reply({ 
              body: `${name}, ${rand}`, 
              mentions: [{ tag: name, id: events.senderID }] }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      } 

        else if (msg.startsWith("delete")) {
            const userPermission = events.senderID && (await Users.getData(events.senderID)).permission;
            const admin = global.config.ADMINBOT;

            if (!admin.includes(events.senderID.toString())) {
                return nayan.reply('You do not have permission to use this command.', events.threadID, events.messageID);
            }

            const deleteParams = msg.replace("delete", "").trim().split("&");
            const question = deleteParams[0].replace("ask=", "").trim();
            const answer = deleteParams[1].replace("ans=", "").trim();

            const response = await axios.get(`${apiUrl}/sim?type=delete&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`);
            const replyMessage = response.data.msg || response.data.data.msg;

            return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
        }
      else if (msg.startsWith("info")) {
        const response = await axios.get(`${apiUrl}/sim?type=info`);
        const totalAsk = response.data.data.totalKeys;
        const totalAns = response.data.data.totalResponses;

        return nayan.reply({ body: `Total Ask: ${totalAsk}\nTotal Answer: ${totalAns}` }, events.threadID, events.messageID);
      } 
      else if (msg.startsWith("teach")) {
        const teachParams = msg.replace("teach", "").trim().split("&");
        const question = teachParams[0].replace("ask=", "").trim();
        const answer = teachParams[1].replace("ans=", "").trim();

        const response = await axios.get(`${apiUrl}/sim?type=teach&ask=${encodeURIComponent(question)}&ans=${encodeURIComponent(answer)}`);
        const replyMessage = response.data.msg;
        const ask = response.data.data.ask;
        const ans = response.data.data.ans;
        if (replyMessage.includes("already")){
          return nayan.reply(`📝Your Data Already Added To Database\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}`, events.threadID, events.messageID)
        }

        return nayan.reply({ body: `📝Your Data Added To Database Successfully\n1️⃣ASK: ${ask}\n2️⃣ANS: ${ans}` }, events.threadID, events.messageID);
      }
      else if (msg.startsWith("askinfo")) {
        const question = msg.replace("askinfo", "").trim();

        if (!question) {
          return nayan.reply('Please provide a question to get information about.', events.threadID, events.messageID);
        }

        const response = await axios.get(`${apiUrl}/sim?type=keyinfo&ask=${encodeURIComponent(question)}`);
        const replyData = response.data.data;
        const answers = replyData.answers;

        if (!answers || answers.length === 0) {
          return nayan.reply(`No information available for the question: "${question}"`, events.threadID, events.messageID);
        }

        const replyMessage = `Info for "${question}":\n\n` +
          answers.map((answer, index) => `📌 ${index + 1}. ${answer}`).join("\n") +
          `\n\nTotal answers: ${answers.length}`;

        return nayan.reply({ body: replyMessage }, events.threadID, events.messageID);
      }
      else if (msg.startsWith("help")) {
        const cmd = this.config.name;
        const prefix = global.config.PREFIX;
        const helpMessage = `
        🌟 **Available Commands:**

        1. 🤖 ${prefix}${cmd} askinfo [question]: Get information about a specific question.

        2. 📚 ${prefix}${cmd} teach ask=[question]&ans=[answer]: Teach the bot a new question and answer pair.

        3. ❌ ${prefix}${cmd} delete ask=[question]&ans=[answer]: Delete a specific question and answer pair. (Admin only)

        4. 📊 ${prefix}${cmd} info: Get the total number of questions and answers.

        5. 👋 ${prefix}${cmd} hi: Send a random greeting.

        ⚡ Use these commands to interact with the bot effectively!
            `;

        return nayan.reply({ body: helpMessage }, events.threadID, events.messageID);
      }
      else {
        const response = await axios.get(`${apiUrl}/sim?type=ask&ask=${encodeURIComponent(msg)}`);
        const replyMessage = response.data.data.msg;

        nayan.reply({ body: replyMessage }, events.threadID, (error, info) => {
          if (error) {
            return nayan.reply('An error occurred while processing your request. Please try again later.', events.threadID, events.messageID);
          }

          global.client.handleReply.push({
            type: 'reply',
            name: this.config.name,
            messageID: info.messageID,
            author: events.senderID,
            head: msg,
          });
        }, events.messageID);
      }
    } catch (error) {
      console.log(error);
      nayan.reply('An error has occurred, please try again later.', events.threadID, events.messageID);
    }
  }
};