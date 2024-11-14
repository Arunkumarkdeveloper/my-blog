const getQueryParam = (param, defaultValue = "") => {
  const value = request?.nextUrl?.searchParams?.get(param);
  return value ? value : defaultValue;
};

const averageWordsPerMinute = 250;
const calculateReadingTime = (text) => {
  const wordCount = text?.split(/\s+/)?.length; // Splits the text into words based on spaces
  const readingTime = Math?.ceil(wordCount / averageWordsPerMinute); // Round up to the nearest minute
  return readingTime;
};

const currentDate = () => {
  const monthName = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = new Date().getDate();
  const Month = monthName[new Date().getMonth()];
  const year = new Date().getFullYear();
  return day + " " + Month + ", " + year;
};

const stopWords = [
  "a",
  "about",
  "above",
  "after",
  "again",
  "against",
  "all",
  "am",
  "an",
  "and",
  "any",
  "are",
  "aren't",
  "as",
  "at",
  "be",
  "because",
  "been",
  "before",
  "being",
  "below",
  "between",
  "both",
  "but",
  "by",
  "can't",
  "cannot",
  "could",
  "couldn't",
  "did",
  "didn't",
  "do",
  "does",
  "doesn't",
  "doing",
  "don't",
  "down",
  "during",
  "each",
  "few",
  "for",
  "from",
  "further",
  "had",
  "hadn't",
  "has",
  "hasn't",
  "have",
  "haven't",
  "having",
  "he",
  "he'd",
  "he'll",
  "he's",
  "her",
  "here",
  "here's",
  "hers",
  "herself",
  "him",
  "himself",
  "his",
  "how",
  "how's",
  "i",
  "i'd",
  "i'll",
  "i'm",
  "i've",
  "if",
  "in",
  "into",
  "is",
  "isn't",
  "it",
  "it's",
  "its",
  "itself",
  "let's",
  "me",
  "more",
  "most",
  "mustn't",
  "my",
  "myself",
  "no",
  "nor",
  "not",
  "of",
  "off",
  "on",
  "once",
  "only",
  "or",
  "other",
  "ought",
  "our",
  "ours",
  "ourselves",
  "out",
  "over",
  "own",
  "same",
  "shan't",
  "she",
  "she'd",
  "she'll",
  "she's",
  "should",
  "shouldn't",
  "so",
  "some",
  "such",
  "than",
  "that",
  "that's",
  "the",
  "their",
  "theirs",
  "them",
  "themselves",
  "then",
  "there",
  "there's",
  "these",
  "they",
  "they'd",
  "they'll",
  "they're",
  "they've",
  "this",
  "those",
  "through",
  "to",
  "too",
  "under",
  "until",
  "up",
  "very",
  "was",
  "wasn't",
  "we",
  "we'd",
  "we'll",
  "we're",
  "we've",
  "were",
  "weren't",
  "what",
  "what's",
  "when",
  "when's",
  "where",
  "where's",
  "which",
  "while",
  "who",
  "who's",
  "whom",
  "why",
  "why's",
  "with",
  "won't",
  "would",
  "wouldn't",
  "you",
  "you'd",
  "you'll",
  "you're",
  "you've",
  "your",
  "yours",
  "yourself",
  "yourselves",
];

// const EmailTemplate = async (to, subject, html) => {
//   const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 465,
//     secure: true,
//     auth: {
//       user: "findbestonebusiness@gmail.com",
//       pass: "mqkukeayecsdknzc",
//     },
//     tls: {
//       rejectUnauthorized: false,
//     },
//   });

//   const mail = await transporter.sendMail({
//     from: "findbestonebusiness@gmail.com",
//     to: to,
//     subject: subject,
//     html: html,
//   });
// };

const transporterOptions = {
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "findbestonebusiness@gmail.com",
    pass: "mqkukeayecsdknzc",
  },
  tls: {
    rejectUnauthorized: false,
  },
};

const mailOptions = (to, type, postData) => {
  let subject;
  let html;
  console.log(postData);
  if (type === "subscribe") {
    subject = "Thank You for Subscribing to FindbestOne!";
    html = `<h4>Hi ${to}</h4>
    <p>Thank you for joining our FindbestOne community! As a member of our community, you will now be able to get the latest news, top-rated recommendations, and hand-picked updates on the most refined products, services, and technologies directly to your inbox.</p>
    <h4>Here's what you can expect:</h4>
    <ul>
    <li>Regular updates with top picks and reviews</li>
    <li>Exclusive insights to help you make informed decisions</li>
    <li>Early access to our latest guides and comparisons</li>
    </ul>
    <p>If you ever have any questions or suggestions, feel free to reach out to us. We'd love to hear from you!</p>
    <p>Warm regards,</p>
    <b>The FindbestOne Team</b>
    <a href="https://www.findbestone.com">https://www.findbestone.com</a>
    <p>P.S. Be sure to keep an eye on your inbox so you don't miss any of our updates!</p>`;
  } else if (type === "new-post") {
    subject = "Check Out Our Latest Post on FindbestOne! 🌟";
    html = `<h1><a href=${postData?.pageUrl}>${postData?.blogData?.title}</a></h1>
    <p>${postData?.blogData?.description}</p>
    <p><a href=${postData?.pageUrl}>View More...</a></p>
    <a href=${postData?.pageUrl}><img src=${postData?.blogData?.titleImage}/></a>
    <p>Thank you for being part of our community. We can't wait to hear what you think!</p>
    <p>Warm regards,</p>
    <b>The FindbestOne Team</b>`;
  }

  const options = {
    from: "findbestonebusiness@gmail.com",
    to: to,
    subject: subject,
    html: html,
  };
  return options;
};

export {
  getQueryParam,
  calculateReadingTime,
  currentDate,
  stopWords,
  transporterOptions,
  mailOptions,
};

