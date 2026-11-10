import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";


const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("shobaimile");


export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },
  
  // emailVerification:{
  //   sendVerificationEmail: async({user, url}) => {
  //     void resend.emails.send({
  //       from: 'Acme <onboarding@resend.dev>',
  //       to: `redwanhosen4@gmail.com`,
  //       subject: 'Verify your email address',
  //       html: `Click <a href="${url}">here</a> to verify your email.`,
  //     })
  //   },
  //   sendOnSignUp: true,
	// 	autoSignInAfterVerification: true,
	// 	expiresIn: 7*24*3600 // 7 days
  // },
  
  socialProviders: {
    google: {
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
    },
    github:{
      clientId: process.env.BETTER_AUTH_GITHUB_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GITHUB_CLIENT_SECRET
    }
  },
  database: mongodbAdapter(db, {
    // Optional: if you don't provide a client, database transactions won't be enabled.
    client,
  }),
});





// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.MONGODB_URI as string);
// const db = client.db("shobaimile");

// export const auth = betterAuth({

//     emailAndPassword: { 
//     enabled: true, 
//   }, 
//   database: mongodbAdapter(db, {
//     client,
//   }),
// });